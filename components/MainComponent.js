export default class MainComponent {

  constructor() {
    window.allTests = []
    window.tableName = "mega_1000000";
    window.tableSize = 1000000;
    this.treeStore = Ext.create('Ext.data.TreeStore', {
      rootVisible: true,
      root: {
        hash: 'all',
        iconCls: 'x-fa fa-home',
        leaf: false,
        text: 'All',
        children: window.menu
      }
    });
  }

  viewportReady(event) {

    if (window.location.hash.substr(1).trim() == '') {
      window.location.hash = '#' + 'extjs-loading'
    }

    const urlParams = new URLSearchParams(window.location.search);
    const theFrame = urlParams.get('frame');

    if (theFrame == 'true') {
      console.log(event.detail.cmpObj['leftpanel'])
      event.detail.cmpObj['leftpanel'].setHidden(true)
    }

    window.treepanel = event.detail.cmpObj['treepanel']
    window.grid = event.detail.cmpObj['grid']

    document.querySelector('button[clear]').addEventListener('click', (event) => {
      this.grid.getStore().removeAll();
      this.treepanel.getStore().removeAll();
    });

    document.querySelector('button[export]').addEventListener('click', (event) => {
      var cfg = {
        title: 'Grid Perf Export',
        fileName: 'GridPerfExport.csv',
        type: 'csv'
      }
      window.grid.saveDocumentAs(cfg);
    });

    document.addEventListener('newdata', (event) => {
      var product = event.detail.product
      //var test = event.detail.test
      var testname = event.detail.testname
      var milliseconds = event.detail.milliseconds.toFixed(2).toString()
      var tablesize = window.tableSize
      this.grid.getStore().add({product: product, testname: testname, milliseconds: milliseconds, tablesize: tablesize})
      window.allTests.push(event.detail.testJSON)
    });
    for (var prop in event.detail.cmpObj) {this[prop] = event.detail.cmpObj[prop];}
    this.treelist.setStore(this.treeStore);
    var hash = window.location.hash.substr(1);
    if (hash == '') { hash = 'all'; }
    var node = this.treelist.getStore().findNode('path', '/' + hash);
    this.treelist.setSelection(node);
  }

  navTreelistSelectionChange(event) {
    var node = event.detail.record;
    this.navigate('tree', node);
  };

  navigate(who, node) {
    var leaf = node.data.leaf;
    if (leaf === true) {
      var path = node.data.path.substr(1)
      var myNode = document.getElementById('router')
      while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
      }
      var node = document.createElement('z-' + path);
      myNode.appendChild(node);
      window.location.hash = '#' + path;
    }
  };

  // onExport = (event) => {
  //   var sender = event.detail.sender;
  //   var e = event.detail.e;
  //   // console.log(sender)
  //   // console.log(e)
  //   // console.log('export')
  // }
}
