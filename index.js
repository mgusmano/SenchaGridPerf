import "./ext-web-components-classic/src/ext-panel.component.js"
import "./ext-web-components-classic/src/ext-container.component.js"
import "./ext-web-components-classic/src/ext-toolbar.component.js"
import "./ext-web-components-classic/src/ext-image.component.js"
import "./ext-web-components-classic/src/ext-button.component.js"
import "./ext-web-components-classic/src/ext-treelist.component.js"
import "./ext-web-components-classic/src/ext-grid.component.js"
import "./ext-web-components-classic/src/ext-treepanel.component.js"
import "./ext-web-components-classic/src/ext-tbspacer.component.js"
import "./ext-web-components-classic/src/ext-combobox.component.js"



import './components/ExtJS/ExtJSLoadingComponent.js';
import './components/ExtJS/ExtJSFilteringComponent.js';
import './components/ExtJS/ExtJSScrollingComponent.js';

import MainComponent from './components/MainComponent.js';
import { doAjaxThings } from './components/util/util.js';
import getMenu from './assets/menu.js';

function init() {
  var url = "./assets/MainComponent.html";
  doAjaxThings(url).then(data => {document.body.innerHTML = data})
  window.menu = getMenu();
  window.main = new MainComponent();
}

Ext.onReady(function() {
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];

  span.onclick = function() {
    modal.style.display = "none";
    init();
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      init();
    }
  }

  modal.style.display = "block";



});