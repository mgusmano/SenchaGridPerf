import MainComponent from './MainComponent.js';
import { doAjaxThings } from './util.js';
import getMenu from './assets/menu.js';

function init() {
  var url = "./MainComponent.html";
  doAjaxThings(url).then(data => {document.body.innerHTML = data})
  window.menu = getMenu();
  window.main = new MainComponent();
}

Ext.onReady(function() {
  init();
});