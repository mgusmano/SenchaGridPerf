//import MainComponent from './view/main/MainComponent.js';

export default function getMenu() {
  return [
    {
      "id": 2,
      "text": "Sencha - Ext JS Grid",
      "iconCls": "x-fa fa-circle",
      "children": [
        {"id": 22, "text": "About<br><i>About this App</i>","iconCls": "x-fa fa-cog","path": "/extjs-perf-benchmark","component": "z-extjs-perf-benchmark", "leaf": true},
        {"id": 22, "text": "Initial Load Time Test<br><i>Time to load first page</i>","iconCls": "x-fa fa-bars","path": "/extjs-loading","component": "z-extjs-loading", "leaf": true},
        {"id": 23, "text": "Filtering Speed Test<br><i>Time to filter on a field</i>","iconCls": "x-fa fa-filter","path": "/extjs-filtering","component": "z-extjs-filtering", "leaf": true},
        {"id": 24, "text": "Scrolling Test<br><i>Time to scroll through grid</i>","iconCls": "x-fa fa-ellipsis-v","path": "/extjs-scrolling","component": "z-extjs-scrolling", "leaf": true}
      ]
    }
  ]
}
