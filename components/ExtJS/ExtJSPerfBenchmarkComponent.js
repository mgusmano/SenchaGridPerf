import { initializeAbout, startTimer, endTimer, sendIt, createBufferViewExtJS } from '../util/ComponentHelper.js'
import { baseURL } from '../util/config.js';

class ExtJSPerfBenchmarkComponent extends HTMLElement {

  // constructor() {

  //   super();
  //   this.attachShadow({mode: 'open'});
  //   const wrapper = document.createElement('span');
  //   wrapper.setAttribute('class','wrapper');
  //   wrapper.innerHTML = 'hi'

  //   this.shadowRoot.append(wrapper);



  // }

  connectedCallback() {
    initializeAbout(this);
    //document.getElementById("name").innerHTML = 'this.name';
    //document.getElementById("summary").innerHTML = 'this.summary';
    // document.querySelector('select[tableSize]').addEventListener('change', (event) => {
    //   window.tableName = event.target.value;
    //   window.tableSize = parseInt(event.target.value.split('_')[1], 10);
    // });
    //createBufferViewExtJS(this.parent);
  }

  disconnectedCallback() {

  }
}

customElements.define("z-extjs-perf-benchmark", ExtJSPerfBenchmarkComponent);