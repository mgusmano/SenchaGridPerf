/**
 * Grid Scroll check: In this, the Grid will be performing
 * both client and server-side buffering(already done in an example) will be done,
 * along with that user will be provided with two textboxes extra of down scroll number (x) and
 * up scroll number (y). On click of the start test, the user will be scrolled down to x number of pages
 * and then scrolled up to y number of pages and then the time should be evaluated it took for
 * the complete cycle. Scroll up will only start after scroll down when the complete data is loaded.
 */

import { initialize, startTimer, endTimer, sendIt, createBufferViewExtJS } from '../util/ComponentHelper.js'
import { baseURL } from '../util/config.js';

class ExtJSScrollingComponent extends HTMLElement {
  connectedCallback() {
    window.total = 0
    window.average = 0
    window.children = []
    window.currentComponent = this
    this.formstate = "hide";
    this.product = "ExtJS";
    this.testName = "scroll";
    this.name = "<b>Ext JS Buffered Grid Scrolling Test</b>";
    this.summary = `
<div style="font-size:14px;">
<b>This test measures the time required to scroll through various portions of the grid.</b>
<br/><br/>
By setting the values for “Page Down” and “Page Up” fields, users can mimic a real world grid scrolling scenario.
<br/><br/>
For example: To scroll to mid grid and back up a few entries (one page), the following parameters will be set.
<ul>
<li>Grid size = 1,000,000
<li>pageSize = 100
<li>Page Down = 5000
<li>Page Up = 4999
</ul>
<p>
There 3 buttons below to run tests:
<br/>
<ul>
<li><b>Run Test 1x</b>   - Single test run.
<li><b>Run Test 10x</b> - Run the test consecutively 10 times. Display individual and average test results.
<li><b>Scroll To End</b> - Scroll to the end of the data.
</ul>
</div>
<div style="font-size:14px;">
<b>You can set different values for:</b>
<br/><br/>pageSize: Total rows that form a page.
<br/><br/>leadingBufferZone: Number of rows to fetch before current page.
<br/><br/>trailingBufferZone: Number of rows to fetch after current page.
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
    this.runGridTest()
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

    Ext.define(`${me.testName}-store`, {
      extend: 'Ext.data.BufferedStore',
      alias: `store.${me.testname}-store`,
      fields: ['firstname', 'lastname', 'address', 'company', 'title',{name: 'id',type: 'int'}],
      pageSize: pageSize,
      leadingBufferZone: leadingBufferZone,
      trailingBufferZone: trailingBufferZone,
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

    Ext.define(`${me.testName}-grid`, {
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
        dataIndex: 'address'
      }, {
        text: 'Company',
        dataIndex: 'company'
      }],
      viewConfig: {
        listeners: {
          itemadd: 'onRecordsAdded'
        }
      },
      listeners: {
        afterrender: 'onGridAfterRender'
      },
      dockedItems: [
        {
          xtype: 'toolbar',
          docked: 'top',
          items: [
            '-', {
            xtype: 'numberfield',
            reference: 'pageDownField',
            labelWidth: 80,
            hideTrigger: true,
            xwidth: 140,
            fieldLabel: 'Page Down',
            minValue: 0,
            bind: {
              value: '{pageDown}',
              maxValue: '{totalPages}'
            }
          }, {
            xtype: 'numberfield',
            reference: 'pageUpField',
            labelWidth: 80,
            hideTrigger: true,
            xwidth: 140,
            fieldLabel: 'Page Up',
            minValue: 0,
            bind: {
              value: '{pageUp}',
              maxValue: '{totalPages}'
            }
          }
        ]
        },
        {
          xtype: 'toolbar',
          docked: 'top',
          items: [
            // {
            //   xtype: 'spacer'
            // },
           // '-',


            //'-',
            // {
            //   xtype: 'button',
            //   text: 'Start Test',
            //   handler: 'onStartTestBtnClick'
            // },
            {
              xtype: 'button',
              text: 'Run Test 1x',
              style: "width:175px;height:35px;font-size:14px;background:#2196f3;",
              handler: 'onStartTestBtnClick',
              bind: {
                hidden: '{hiddenFlag}'
              }
            },
            {
              xtype: 'button',
              text: 'Run Test 10x',
              style: "width:175px;height:35px;font-size:14px;background:#2196f3;",
              handler: 'doFilter10X',
              bind: {
                hidden: '{hiddenFlag}'
              }
            },
            {
              xtype: 'button',
              text: 'Scroll to End',
              style: "width:175px;height:35px;font-size:14px;background:#2196f3;",
              handler: 'onScrollToEndBtnClick'
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
          totalPages: '...',
          pageDown: 10,
          pageUp: 5,
        }
      },
      controller: {
        timeStarted: false,
        itemsAdded: false,
        scrollEnded: false,
        iteration: null, // pageDown/pageUp

        init: function() {
          var store = this.getView().getStore(),
            viewModel = this.getViewModel();

          store.load({
            callback: () => {
              viewModel.set('totalPages', Math.ceil(store.getTotalCount() / store.getPageSize()));
            }
          })
        },

        onScrollToEndBtnClick: function() {
          var lastPage = this.getViewModel().get('totalPages'),
            newScrollTop = this.getNewScrollTop(lastPage);

          this.startTimer();
          this.iteration = 'pageUp';
          this.itemsAdded = false;
          this.scrollEnded = false;
          this.scrollToEndFunctionality = true;
          this.getScrollable().scrollTo(0, newScrollTop);
        },

        getScrollable: function () {
          return this.getView().getScrollable();
        },
        getCurrentScrollTop: function () {
          return this.getScrollable().position.y;
        },
        // tentative scroll position
        getNewScrollTop: function (pageNo) {
          var view = this.getView(),
            viewModel = this.getViewModel(),
            pageSize = view.getStore().getPageSize();

          pageNo = pageNo || viewModel.get(this.iteration) || 0;

          // scrollTop should be totalRecords * rowHeight from buffered renderer
          return pageNo * pageSize * view.plugins[0].rowHeight;
        },
        startTimer: function () {
          this.timeStarted = true;

          // start the timer
          startTimer(me);
        },
        endTimer: function () {
          if (this.timeStarted) {
            this.timeStarted = false;

            // end the timer
            let testName = me.testName;

            if (this.scrollToEndFunctionality) {
              testName = 'Scroll End';
              this.scrollToEndFunctionality = false;
            }

            var milliseconds = endTimer(me),
              testJson = {
                product: me.product,
                testName: testName,
                totalCount: this.getView().getStore().getTotalCount(),
                milliseconds: milliseconds,
              };

            sendIt(me.product, testName, testJson, milliseconds);
          }
        },
        onGridAfterRender: function () {
          this.getScrollable().on('scrollend', this.onScrollEnded, this);
        },
        onScrollEnded: function (params) {
          if (this.timeStarted) {
            this.scrollEnded = true;

            this.checkForNextIteration();
          }
        },
        checkForNextIteration: function () {
          if (this.timeStarted && this.scrollEnded == this.itemsAdded) {
            if (this.iteration == 'pageDown') {
              // start second iteration
              this.iteration = 'pageUp';

              // waiting for some time to render the rows, then loading new page
              Ext.defer(this.loadPage, 10, this);
            } else {
              // exit the cycle
              this.endTimer();
            }
          }
        },
        onRecordsAdded: function () {
          if (this.timeStarted) {
            this.itemsAdded = true;

            this.checkForNextIteration();
          }
        },
        loadPage: function () {
          var currentScrollTop = this.getCurrentScrollTop(),
            newScrollTop = this.getNewScrollTop();

          this.itemsAdded = false;
          this.scrollEnded = false;

          // nothing to do
          if (currentScrollTop === newScrollTop) {
            this.checkForNextIteration();
          } else {
            // setting the scroll top
            this.getScrollable().scrollTo(0, newScrollTop).then(() => {
              // calling this function as quickFix of buffered renderer bug
              // sometimes its not rendering the row
              // to fix that problem we are touching the scroll little bit
              // that will complete the cycle of scrolling
              this.iteration == 'pageUp' && this.adjustViewScrolling(newScrollTop);
            });
          }
        },

        doFilter10X: function (me) {
          console.log(me)
          var scrollnum10 = 0
          function callScroll10x() {
            setTimeout(function(){
              me.onStartTestBtnClick()
              scrollnum10++
              if (scrollnum10 < 9 ) {
                callScroll10x()
              }
              else {
                var avg = window.total/scrollnum10
                var d = {
                  "run":"Average<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;test result",
                  "milliseconds":avg.toFixed(2),
                  "product":window.currentComponent.product,"testname":window.currentComponent.testName,
                  "tablename":"",
                  "xiconCls":"x-fa fa-folder",
                  "leaf": "false",
                  "children": window.children
                }
                window.treepanel.getStore().add(d)
              }
            }, 1000);
          }
          var me = this
          me.onStartTestBtnClick()
          callScroll10x()
        },

        onStartTestBtnClick: function () {
          var pageDownField = this.lookupReference('pageDownField'),
            pageUpField = this.lookupReference('pageUpField');

          if (pageDownField.isValid() && pageUpField.isValid()) {
            this.iteration = 'pageDown';

            this.startTimer();
            this.loadPage();
          } else {
            Ext.toast('Please enter the pages numbers in range');
          }
        },
        adjustViewScrolling: function (newScrollTop) {
          var view = this.getView().getView();

          Ext.defer(function (scrolltop) {
              var el = this.getEl();

              scrolltop = scrolltop == 0 ? 5 : (scrolltop - 5);

              el.scrollTo('top', scrolltop);
          }, 100, view, [newScrollTop]);
        }
      }
    });

    me.gridToTest = Ext.create({ xtype: `${me.testName}`, renderTo: me.parent });
  }

  disconnectedCallback() {
    this.clearGridRefs();
    //Ext.undefine(`${this.testName}-store`);
    //Ext.undefine(`${this.testName}-grid`);
  }
}
customElements.define("z-extjs-scrolling", ExtJSScrollingComponent);