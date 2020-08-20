class HeaderAboutComponent extends HTMLElement {
  connectedCallback() {
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

    <div class="root" style="font-size:14px;border-left:0px solid gray;border-right:0px solid gray;background:${background};color:blue;width:100%;height:100%;">
      <div class="top" style="height:50px;display:flex;justify-content:space-between;">
      <div style="color:white;margin: 10px 10px 1px 1px;" id="name">About</div>
      </div>
      <div style="overflow:auto;height:100%;background:white;margin:10px 10px 10px 10px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
        <div style="padding:10px 10px 0 10px;color:black;font-size:18px;">
          <div style="color:rgb(13,66,87)" id="summary"><b>Welcome to the Ext JS Grid Performance Analyzer!</b></div>
        </div>
        <div parent style="padding:0 10px 10px 10px;width:100%;height:500px;color:rgb(9, 65, 88);font-size:18px;" class="ag-theme-balham">


<p>
<div style="font-size:18px;">
        This User Interface enables you to evaluate the Ext JS Grid performance on various benchmarking metrics.
        <ul>
        <li style="margin-bottom:10px;"><b>Step 1:</b>  Choose the desired test located on the left nav bar.
        <li style="margin-bottom:10px;"><b>Step 2:</b>  Select the Grid Size from the drop down menu to run the benchmark evaluation (options range from 5,000 to 1 million entries)
        <li style="margin-bottom:10px;"><b>Step 3:</b>  You can tune different parameters such as pageSize, leading/trailing Buffers, number of test runs etc.
        <li style="margin-bottom:10px;"><b>Step 4:</b>  Execute the desired test (single run or multiple runs) and observe the results on the top right screen. You can also export the results to a file by clicking on the "export" button or "clear" the results and re-run.
        </ul>
</div>

<div style="display:flex;align-items: center;justify-content: center;">
<img src="assets/ext.png" alt="" width="40%" xheight="600">
</div>

        </div>
      </div>
    <div>
    `;
    this.innerHTML = this.template;
  }
}
customElements.define("z-headerabout", HeaderAboutComponent);

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


