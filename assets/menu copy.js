//import MainComponent from './view/main/MainComponent.js';

export default function getMenu() {
  return [
    {"id": 1, "text": "Home","iconCls": "x-fa fa-home","path": "/","component": "z-home", "leaf": true},
    {
      "id": 2,
      "text": "Sencha - Ext JS Classic Toolkit Grid",
      "iconCls": "x-fa fa-circle",
      "children": [
        {"id": 22, "text": "Initial Loading Time","iconCls": "x-fa fa-bars","path": "/extjs-classic-buffered","component": "z-extjs-classic-buffered", "leaf": true},
        {"id": 23, "text": "Filtering Speed","iconCls": "x-fa fa-filter","path": "/extjs-classic-remotefilter","component": "z-extjs-classic-server-filter", "leaf": true},
        {"id": 24, "text": "Scrolling","iconCls": "x-fa fa-ellipsis-v","path": "/extjs-classic-scroll","component": "z-extjs-classic-scroll", "leaf": true}
      ]
    },
    {"id": 3,"text": "ag-Grid Ltd. - ag-Grid","iconCls": "x-fa fa-circle",
      "children": [
        {"id": 32, "text": "Initial Loading Time","iconCls": "x-fa fa-bars","path": "/ag-grid-buffered","component": "z-aggrid-buffered", "leaf": true},
        {"id": 33, "text": "Filtering Speed","iconCls": "x-fa fa-filter","path": "/ag-grid-server-filter","component": "z-aggrid-server-filter", "leaf": true},
        {"id": 34, "text": "Scrolling","iconCls": "x-fa fa-ellipsis-v","path": "/ag-grid-scroll","component": "z-aggrid-scroll", "leaf": true}
      ]
    },
    {"id": 4,"text": "Telerik - Kendo UI Grid","iconCls": "x-fa fa-circle",
      "children": [
        {"id": 42, "text": "Initial Loading Time","iconCls": "x-fa fa-bars","path": "/kendoui-buffered","component": "z-kendoui-buffered","leaf": true},
        {"id": 43, "text": "Filtering Speed","iconCls": "x-fa fa-filter","path": "/kendoui-server-filter","component": "z-kendoui-server-filter","leaf": true},
        {"id": 44, "text": "Scrolling","iconCls": "x-fa fa-ellipsis-v","path": "/kendoui-scroll","component": "z-kendoui-scroll","leaf": true}
      ]
    },
    {"id": 5,"text": "DevExpress - DevExtreme Data Grid","iconCls": "x-fa fa-circle",
      "children": [
        {"id": 52, "text": "Initial Loading Time","iconCls": "x-fa fa-bars","path": "/devextreme-buffered","component": "z-devextreme-buffered","leaf": true},
        {"id": 53, "text": "Filtering Speed","iconCls": "x-fa fa-filter","path": "/devextreme-server-filter","component": "z-devextreme-server-filter","leaf": true},
        {"id": 54, "text": "Scrolling","iconCls": "x-fa fa-ellipsis-v","path": "/devextreme-scroll","component": "z-devextreme-scroll","leaf": true}
      ]
    },
    {"id": 6,"text": "Grapecity - Wijmo FlexGrid","iconCls": "x-fa fa-circle",
      "children": [
        {"id": 62, "text": "Initial Loading Time","iconCls": "x-fa fa-bars","path": "/wijmo-flex-buffer-filtering","component": "wijmo-flex-buffer","leaf": true},
        {"id": 63, "text": "Filtering Speed","iconCls": "x-fa fa-filter","path": "/wijmo-flex-server-filtering","component": "wijmo-flex-server-filtering","leaf": true},
        {"id": 64, "text": "Scrolling","iconCls": "x-fa fa-ellipsis-v","path": "/wijmo-flex-scroll-filtering","component": "flex-grid-scroll","leaf": true}
      ]
    },
    {"id": 7,"text": "Syncfusion - JavaScript Controls DataGrid","iconCls": "x-fa fa-circle",
      "children": [
        {"id": 72, "text": "Initial Loading Time","iconCls": "x-fa fa-bars","path": "/syncfusion-buffering","component": "sync-fusion-buffer", "leaf": true},
        {"id": 73, "text": "Filtering Speed","iconCls": "x-fa fa-filter","path": "/syncfusion-server-filtering","component": "sync-fusion-server-filtering", "leaf": true},
        {"id": 74, "text": "Scrolling","iconCls": "x-fa fa-ellipsis-v","path": "/syncfusion-scrolling","component": "sync-fusion-scroll", "leaf": true}
      ]
    }
  ]
}
