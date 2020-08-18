//import MainComponent from './view/main/MainComponent.js';

export default function getMenu() {
  return [
    {
      "id": 2,
      "text": "Sencha - Ext JS Grid",
      "iconCls": "x-fa fa-circle",
      "children": [
        {"id": 22, "text": "Initial Load Time Test<br>Time to load first page","iconCls": "x-fa fa-bars","path": "/extjs-loading","component": "z-extjs-loading", "leaf": true},
        {"id": 23, "text": "Filtering Speed Test<br>Time to filter on a field","iconCls": "x-fa fa-filter","path": "/extjs-filtering","component": "z-extjs-filtering", "leaf": true},
        {"id": 24, "text": "Scrolling Test<br>Time to scroll through grid","iconCls": "x-fa fa-ellipsis-v","path": "/extjs-scrolling","component": "z-extjs-scrolling", "leaf": true}
      ]
    }
  ]
}
