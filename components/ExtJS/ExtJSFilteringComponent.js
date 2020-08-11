import { initialize, startTimer, endTimer, sendIt, createBufferViewExtJS } from '../util/ComponentHelper.js'
import { baseURL } from '../util/config.js';

class ExtJSFilteringComponent extends HTMLElement {
  connectedCallback() {
    window.total = 0
    window.average = 0
    window.children = []
    this.formstate = "hide";
    this.product = "extjsclassic";
    this.testName = "server filter";
    this.name = "<b>Ext JS Filtering Speed Test</b>";
    this.summary = `
This test will display performance of the Filtering store on server side in ExtJS.
<p>
There 2 buttons below to run tests:
<ul>
<li>RUN TEST 1X
<li>RUN REST 10X
</ul>
<p>
<b>You can set different values for:</b>
`
    initialize(this);
    document.getElementById("name").innerHTML = this.name;
    document.getElementById("summary").innerHTML = this.summary;
    document.querySelector('select[tableSize]').addEventListener('change', (event) => {
      window.tableName = event.target.value;
      window.tableSize = parseInt(event.target.value.split('_')[1], 10);
    });
    createBufferViewExtJS(this.parent);
    this.runGridTest();
  }
  clearGridRefs() {
    if (this.gridToTest && this.gridToTest.destroy) {
      this.gridToTest.destroy();
    }
    this.gridToTest = null;
    Ext.undefine(`${this.testName}-store`);
    Ext.undefine(`${this.testName}-grid`);
    try {
      document.getElementById("pageSize").value = 20;
      document.getElementById("leadingBufferZone").value = 0;
      document.getElementById("trailingBufferZone").value = 0;
    }
    catch(err) {
      //console.log(err)
    }
  }
  runGridTest() {
    var me = this;
    let pageSize = parseInt(document.getElementById("pageSize").value, 10);
    let leadingBufferZone = parseInt(document.getElementById("leadingBufferZone").value, 10);
    let trailingBufferZone = parseInt(document.getElementById("trailingBufferZone").value, 10);

    if (!Ext.isEmpty(me.gridToTest)) {
      return;
    }

    Ext.define(`${this.testName}-store`, {
      extend: 'Ext.data.BufferedStore',
      alias: `store.${me.testname}-store`,
      fields: ['firstname', 'lastname', 'address', 'company', 'title',{name: 'id',type: 'int'}],
      pageSize: pageSize,
      leadingBufferZone: leadingBufferZone,
      trailingBufferZone: trailingBufferZone,
      autoLoad: false,
      remoteFilter: true,
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
      xtype: `${me.testName}`,
      height: 400,
      width: '100%',
      scrollable: true,
      emptyText: 'No data available',
      style: 'background: #fff;',
      store: { type: `${me.testname}-store` },
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
              xtype: 'textfield',
               fieldLabel: 'Filter first name',
              labelWidth: 110,
              labelAlign: 'left',
              bind: {
                value: '{filterText}',
                hidden: '{hiddenFlag}'
              },
              keyMap: {
                ENTER: 'onFilterFieldEnterKey'
              }
            }
          ]
        },
        {
          xtype: 'toolbar',
          docked: 'top',
          items: [
            {
              xtype: 'button',
              text: 'Run Test 1X',
              handler: 'doFilter',
              bind: {
                hidden: '{hiddenFlag}'
              }
            },
            {
              xtype: 'button',
              text: 'Run Test 10X',
              handler: 'doFilter10X',
              bind: {
                hidden: '{hiddenFlag}'
              }
            }
            // {
            //   xtype: 'button',
            //   text: 'Clear',
            //   handler: 'clearFilter'
            // }
          ]
        }


      ],
      viewModel: {
        data: {
          filterText: '',
          hiddenFlag: true
        }
      },
      controller: {
        init: function() {
          var store = this.getView().getStore();

          store.load({
            callback: function() {
              this.getViewModel().set('hiddenFlag', false);
            },
            scope: this
          })
        },
        doFilter: function () {
          this.toggleFilter(true);
        },

        doFilter10X: function (me) {

          var filternum10 = 0
          function callFilter10x() {
            setTimeout(function(){

              me.toggleFilter(true);
              //me.runGridTest()
              filternum10++
              if (filternum10 < 9 ) {
                callFilter10x()
              }
              else {
                console.log('done')
                console.log(filternum10)
                console.log(window.total)
                console.log(window.total/filternum10)
                var avg = window.total/filternum10
                var d = {
                  "run":"Set",
                  "milliseconds":avg,
                  "product":"","testname":"",
                  "tablename":"",
                  "iconCls":"x-fa fa-folder",
                  "leaf": "false",
                  "children": window.children
                }
                window.treepanel.getStore().add(d)
              }
            }, 1000);
          }
          //this.clearGridRefs();
          var me = this
          //me.runGridTest()
          callFilter10x(me)
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

    me.gridToTest = Ext.create({ xtype: `${me.testName}`, renderTo: me.parent });
  }
  disconnectedCallback() {
    this.clearGridRefs();
  }
}

customElements.define("z-extjs-filtering", ExtJSFilteringComponent);