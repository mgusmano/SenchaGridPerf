import { initialize, startTimer, endTimer, sendIt, createBufferViewExtJS } from '../util/ComponentHelper.js'
import { baseURL } from '../util/config.js';

class ExtJSLoadingComponent extends HTMLElement {
  connectedCallback() {
    window.total = 0
    window.average = 0
    window.children = []
    this.formstate = "hide";
    this.product = "ExtJS";
    this.testName = "load time";
    //this.name = "<b>Ext JS Initial Loading Time</b>"
    this.name = "<b>Load Time</b>"
    this.summary = `
<div style="font-size:14px;">
<b>This test measures the time required to load the initial set of static data.</b>
<p>
There 2 buttons below to run tests:
<br/>
<ul>
<li><b>Run Test 1x</b> - Single test run.
<li><b>Run Test 10x</b> - Run the test 10 times. Display individual and average results.
</ul>
</div>
<div style="font-size:14px;">
<b>You can set different values for:</b>
<br/><br/>pageSize: Total rows that form a page.
<br/><br/>leadingBufferZone: Number of rows to fetch before current page.
<br/><br/>trailingBufferZone: Number of rows to fetch after current page.
</div>
<p>
`
    initialize(this);
    document.getElementById("name").innerHTML = this.name;
    document.getElementById("summary").innerHTML = this.summary;
    document.querySelector('select[tableSize]').addEventListener('change', (event) => {
      window.tableName = event.target.value;
      window.tableSize = parseInt(event.target.value.split('_')[1], 10);
    });
    createBufferViewExtJS(this.parent);
    this.runGridTest(true)
  }

    runGridTest(first) {
      var me = this;
      let pageSize = parseInt(document.getElementById("pageSize").value, 10);
      let leadingBufferZone = parseInt(document.getElementById("leadingBufferZone").value, 10);
      let trailingBufferZone = parseInt(document.getElementById("trailingBufferZone").value, 10);

      if (!Ext.isEmpty(me.gridToTest)) {
        return;
      }
      //console.log(`${baseURL}api/rawData/getPageData?tableName=${window.tableName}`)
      //if (this.gridToTest == null) {
        Ext.define(`${this.testName}-store`, {
          extend: 'Ext.data.BufferedStore',
          alias: `store.${this.testName}-store`,
          fields: ['firstname', 'lastname', 'address', 'company', 'title',{name: 'id',type: 'int'}],
          listeners: {
            beforeload: function (store, operation, eOpts) {
              startTimer(me)
            },
            load: function (sender, records, b) {
              var milliseconds = endTimer(me)
              var testJSON = {
                product: me.product,
                testName: me.testName,
                totalCount: me.gridToTest.getStore().totalCount,
                milliseconds: milliseconds,
                pageSize: pageSize,
                leadingBufferZone: leadingBufferZone,
                trailingBufferZone: trailingBufferZone
              }
              if (first != true) {
                sendIt(me.product, me.testName, testJSON, milliseconds)
              }
            }
          },
          pageSize: pageSize,
          leadingBufferZone: leadingBufferZone,
          trailingBufferZone: trailingBufferZone,
          autoLoad: false,
          proxy: {
            type: 'ajax',
            url: `${baseURL}api/rawData/getPageData?tableName=${window.tableName}`,
            reader: {
              rootProperty: 'users',
              totalProperty: 'totalCount'
            }
          }
        });
        Ext.define(`${this.testName}-grid`, {
          extend: 'Ext.grid.Panel',
          xtype: `${this.testName}`,
          store: { type: `${this.testName}-store` },
          height: 400,
          width: '100%',
          scrollable: true,
          columns: [{
            text: 'Id',
            dataIndex: 'id',
            width: 70
          },{
            text: 'First Name',
            dataIndex: 'firstname'
          }, {
            text: 'Last Name',
            dataIndex: 'lastname'
          }, {
            text: 'Title',
            dataIndex: 'title'
          }, {
            text: 'Address',
            dataIndex: 'address',
            width: 210
          }, {
            text: 'Company',
            dataIndex: 'company',
            width: 210
          }],

          dockedItems: [

            {
              xtype: 'toolbar',
              docked: 'top',
              items: [
                {
                  xtype: 'button',
                  text: 'Run Test 1x',
                  style: "text-transform:lowercase;width:175px;height:35px;font-size:14px;background:#2196f3;",
                  handler: 'doLoading',

                },
                {xtype: 'tbspacer'},
                {
                  xtype: 'button',
                  text: 'Run Test 10x',
                  style: "width:175px;height:35px;font-size:14px;background:#2196f3;",
                  handler: 'doFilter10X',
                }
                // {
                //   xtype: 'button',
                //   text: 'Clear',
                //   handler: 'clearFilter'
                // }
              ]
            },
            {
              xtype: 'container',
              style: 'color: rgb(13,66,87);fontSize: 18px;margin: 10px 5px 10px 5px;',
              html: 'Generated Table:'
            },
          ],
          viewModel: {
            data: {
              filterText: '',
              hiddenFlag: true
            }
          },
          controller: {
            init: function() {
              //console.log('here')
              var store = this.getView().getStore();

              store.load({
                callback: function() {
                  this.getViewModel().set('hiddenFlag', false);
                },
                scope: this
              })
            },
            doLoading: function () {
              console.log('here')
              me.clearGridRefs();
              me.runGridTest()
              //this.toggleFilter(true);
            },


            doFilter10X: function () {

              var me2 = me
              var filternum10 = 0
              function callFilter10x() {
                setTimeout(function(){

                  me2.clearGridRefs();
                  //me.toggleFilter(true);
                  me2.runGridTest()
                  filternum10++
                  if (filternum10 <= 9 ) {
                    callFilter10x()
                  }
                  else {
                    //console.log('done')
                    //console.log(filternum10)
                    //console.log(window.total)
                    //console.log(window.total/filternum10)
                    var avg = window.total/filternum10
                    var d = {
                      "run":"Average<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;test result",
                      "milliseconds":avg.toFixed(2),
                      "product":me.product,"testname":me.testName,
                      "tablename":"",
                      "xiconCls":"x-fa fa-cog",
                      "leaf": "false",
                      "children": window.children
                    }
                    window.treepanel.getStore().add(d)
                    setTimeout(function(){
                      //window.grid.getStore().removeAll();
                    }, 1000);
                  }
                }, 1000);
              }
              //this.clearGridRefs();
              //var me = this
              //me.runGridTest()
              window.total = 0
              window.average = 0
              window.children = []
              window.grid.getStore().removeAll();
              callFilter10x()
              //this.toggleFilter(true);
            },

            clearFilter: function () {
              this.toggleFilter(false);
            },
            toggleFilter: function (flag) {
              var viewModel = this.getViewModel(),
                filterText = viewModel.get('filterText'),
                store = this.getView().getStore(),
                milliseconds, testJson;

              // if clear filter is pressed and there is no filter applied to the store
              if (!filterText && store.getFilters().getCount() == 0) {
                return;
              }

              if (flag) {
                startTimer(me);
                store.on('load', () => {
                  milliseconds = endTimer(me);
                  testJson = {
                    product: me.product,
                    testName: me.testName,
                    totalCount: store.totalCount,
                    milliseconds: milliseconds,
                  };

                  sendIt(me.product, me.testName, testJson, milliseconds);
                }, this, { single: true });

                store.filter({
                  property: 'firstname',
                  value: filterText,
                  anyMatch: true
                });
              } else {
                viewModel.set('filterText', '');
                store.clearFilter();
              }
            },
            onFilterFieldEnterKey: function () {
              var filterText = this.getViewModel().get('filterText');

              this.toggleFilter(!!filterText);
            }
          }


        });
      //}
      this.gridToTest = Ext.create({ xtype: `${this.testName}`, renderTo: this.parent })
    }



  clearGridRefs() {
    if (this.gridToTest && this.gridToTest.destroy) {
      this.gridToTest.destroy();
    }
    this.gridToTest = null;
    Ext.undefine(`${this.testName}-store`);
    Ext.undefine(`${this.testName}-grid`);

    try {
      document.getElementById("pageSize").value = 100;
      document.getElementById("leadingBufferZone").value = 0;
      document.getElementById("trailingBufferZone").value = 0;
    }
    catch(err) {
      //console.log(err)
    }
  }

  disconnectedCallback() {
    this.clearGridRefs();
    // if (this.gridToTest && this.gridToTest.destroy) {
    //   this.gridToTest.destroy();
    // }
    // this.gridToTest = null;
    //Ext.undefine(`${this.testName}-store`);
    //Ext.undefine(`${this.testName}-grid`);
  }
}
customElements.define("z-extjs-loading", ExtJSLoadingComponent);
