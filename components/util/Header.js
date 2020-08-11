class HeaderComponent extends HTMLElement {
  connectedCallback() {
    //var background = this.getAttribute('background')
    var background = "lightgray"
    var buttonstate = this.getAttribute('buttonstate')
    //var formstate = this.getAttribute('formstate')
    var color = this.getAttribute('color')
    this.template = `
    <style>
    .root {
      display: flex;
      width: 100%;
      flex-direction: column;
    }
    .top {
      height: 50px;
      padding: 10px 10px 10px 10px;
      color: white;
      font-size: 24px;
      background: #094158;
      display: flex;
      width: 100%;
    }
    .start {
      margin: 0px 0px 0px 30px;
      position: absolute;
      right: 0;
      margin: 0 1px 0 0;
      xpadding: 0 10px 20px 10px;
      height: 35px;
      display: flex;
      xjustify-content: flex-end;
      xalign-content: flex-end;
    }
    .buttons {
      width: 150px;
      background: ${background};
      color: ${color};
      font-size: 24px;
    }
    .form {
      font-size: 24px;
      font-weight: 500;
      color: ${color};
      margin: 0px 0px 0px 30px;
      display: table;
      width: 300px;
      line-height: 1.5;
    }
    .row {
      display: table-row;
    }
    label {
      display: table-cell;
    }
    input {
      font-size: 24px;
      display: table-cell;
      width: 50px;
    }
    .show {
      display: block;
    }
    .hide {
      display: none;
    }
    .name {
      font-size: 24px;
      line-height: 1.1;
    }
    </style>

    <div class="root" style="border-left:0px solid gray;border-right:0px solid gray;background:${background};color:blue;width:100%;height:100%;">
      <div class="top" style="height:50px;display:flex;justify-content:space-between;">
      <div style="color:white;margin: 10px 10px 1px 1px;" id="name"></div>
        <select tableSize style="color:white;background:#2196f3;font-size:14px;xmargin: 10px 10px 1px 1px;height:33px;xpadding: 5px 5px;">
          <option value="mega_5000">Table size: 5000</option>
          <option value="mega_10000">Table size: 10,000</option>
          <option value="mega_100000">Table size: 100,000</option>
          <option selected value="mega_1000000">Table size: 1,000,000</option>
        </select>
        <!--
        <div style="display:flex;flex-direction:row;">
          <button style="width:100px;height:35px;font-size:14px;background:#2196f3;color:white;" class="x-fa fa-arrow-right ${buttonstate}" starttest>&nbsp;start test</button>
          <button style="width:100px;height:35px;font-size:14px;background:#2196f3;color:white;" class="x-fa fa-arrow-right ${buttonstate}" run10x>&nbsp;run 10X</button>
          <button style="width:100px;height:35px;font-size:14px;background:#2196f3;color:white;" class="x-fa fa-trash-alt ${buttonstate}" cleartest>&nbsp;clear test</button>
        </div>
        -->
      </div>

      <div style="height:100%;background:white;margin:10px 10px 10px 10px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
        <div style="padding:10px 10px 0 10px;color:black;font-size:18px;">
          <div style="color:rgb(13,66,87)" id="summary"></div>
        </div>
        <div parent style="padding:0 10px 10px 10px;width:100%;height:500px;" class="ag-theme-balham"></div>
      </div>
    <div>
    `;
    this.innerHTML = this.template;
  }
}
customElements.define("z-header", HeaderComponent);

        // <div class="form ${formstate}">
        //   <div class="row">
        //     <label for="pageSize">pageSize:</label>
        //     <input name="pageSize" pageSize type="text" value="200">
        //   </div>
        //   <div class="row">
        //   <label for="leadingBufferZone">leadingBufferZone:</label>
        //   <input leadingBufferZone type="text" value="0">
        //   </div>
        //   <div class="row">
        //   <label for="trailingBufferZone">trailingBufferZone:</label>
        //   <input trailingBufferZone type="text" value="0">
        //   </div>
        // </div>


