import './Header.js'

export function initialize(me) {
  me.gridToTest = null
  if (me.formstate == undefined) {
    me.formstate = 'hide'
  }
  var color
  var background
  var buttonstate = 'show'
  background="lightgray";
  color="black";
  //me.innerHTML = `<z-header color="${color}" background="${background}" formstate="${me.formstate}" buttonstate="${buttonstate}"></z-header>`;
  me.innerHTML = `<z-header color="${color}" background="${background}" buttonstate="${buttonstate}"></z-header>`;
  me.parent = me.querySelector("div[parent]")
  me.starttime = null
  me.endtime = null
  me.cleartest=me.querySelector("button[cleartest]")
  me.starttest=me.querySelector("button[starttest]")
  me.run5x=me.querySelector("button[run5x]")
  me.run10x=me.querySelector("button[run10x]")

  me.pageSize=me.querySelector("input[pageSize]")
  me.leadingBufferZone=me.querySelector("input[leadingBufferZone]")
  me.trailingBufferZone=me.querySelector("input[trailingBufferZone]")

  // me.querySelector("div[name]").innerHTML = me.name
  // me.querySelector("div[summary]").innerHTML = me.summary
}


function createLabel(text) {
  var filterRowLabel = document.createElement('label');
  filterRowLabel.innerHTML = text + ':&nbsp;'
  filterRowLabel.setAttribute('style', 'width: 150px;margin: 5px;font-size: 18px;font-weight: bold;padding-top: 5px;color: rgb(74,102,119);');
  return filterRowLabel
}

function createInput(id, type, value, disabled) {
  var filterRowInput = document.createElement('INPUT');
  filterRowInput.disabled = disabled;
  //filterRowInput.setAttribute('disabled', disabled);
  filterRowInput.setAttribute('type', type);
  filterRowInput.setAttribute('id', id);
  filterRowInput.setAttribute('min', 1);
  filterRowInput.setAttribute('max', 1000);
  filterRowInput.setAttribute('value', value);
  filterRowInput.setAttribute('style', 'width: 150px;margin: 5px;color: rgb(74,102,119);text-align: right;');
  return filterRowInput
}

function createIt2(c, id, type, value, disabled) {
  var container2 = document.createElement('div');

  container2.style.color = "rgb(13,66,87)"
  container2.style.flex = "1"
  container2.style.display = "flex"
  container2.style.flexDirection = "column"
  c.append(container2);
  container2.append(createLabel(id));
  container2.append(createInput(id, type, value, disabled));
}


export function createBufferViewExtJS2(parent) {
  var container1 = document.createElement('div');
  container1.style.marginBottom = "20px"
  container1.style.display = "flex"
  container1.style.flexDirection = "row"

  createIt(container1, 'pageSize', 'number', 20, false);
  createIt(container1, 'leadingBufferZone', 'number', 0, false);
  createIt(container1, 'trailingBufferZone', 'number', 0, false);

  parent.append(container1);
}

function createIt(c, id, type, value, disabled) {
  // var container2 = document.createElement('div');

  // container2.style.color = "rgb(13,66,87)"
  // //container2.style.flex = "1"
  // container2.style.display = "flex"
  // container2.style.flexDirection = "row"
  // c.append(container2);
  c.append(createLabel(id));
  c.append(createInput(id, type, value, disabled));
}

export function createBufferViewExtJS(parent) {
  var container1 = document.createElement('div');
  container1.style.border = "1px solid gray"
  container1.style.padding = "10px 10px 10px 10px"
  container1.style.background = "rgb(247,247,247)"
  container1.style.marginBottom = "20px"
  container1.style.display = "flex"
  container1.style.flexDirection = "column"

  var container2 = document.createElement('div');
  container2.style.display = "flex"
  container2.style.justifyContent = 'space-between';
  container2.style.background = "rgb(233,233,233)"
  container2.style.flexDirection = "row"
  container1.append(container2);
  createIt(container2, 'pageSize', 'number', 20, false);

  var container3 = document.createElement('div');
  container3.style.display = "flex"
  container3.style.justifyContent = 'space-between';
  //container3.style.background = "red"
  container3.style.flexDirection = "row"
  container1.append(container3);

  createIt(container3, 'leadingBufferZone', 'number', 0, false);

  var container4 = document.createElement('div');
  container4.style.display = "flex"
  container4.style.justifyContent = 'space-between';
  container4.style.background = "rgb(233,233,233)"
  container4.style.flexDirection = "row"
  container1.append(container4);

  createIt(container4, 'trailingBufferZone', 'number', 0, false);

  parent.append(container1);
}




export function createBufferView(parent) {
  var container1 = document.createElement('div');
  container1.style.marginBottom = "20px"
  container1.style.display = "flex"
  container1.style.flexDirection = "row"

  createIt(container1, 'pageSize', 'number', 20, false);

  parent.append(container1);
}

// export function createFilterView(parent, startFilter, clearFilter) {
//   var container1 = document.createElement('span');
//   var inputFilterVal = document.createElement('INPUT');
//   inputFilterVal.setAttribute('type', 'text');
//   inputFilterVal.setAttribute('id', 'inputFilterVal');
//   inputFilterVal.setAttribute('style', 'width: 150px; display: none ');
//   var filterValueLabel = document.createElement('label');
//   filterValueLabel.innerHTML = 'Filter on First Name:';
//   filterValueLabel.setAttribute('id', 'filterValueLabel');
//   filterValueLabel.setAttribute('style', 'width: 200px; display: none ');
//   container1.append(filterValueLabel);
//   container1.append(inputFilterVal);

//   var container2 = document.createElement('p');
//   var startFilterBtn = document.createElement('Button');
//   startFilterBtn.innerHTML = 'Start Filtering';
//   startFilterBtn.setAttribute('id', 'startFilterBtn');
//   startFilterBtn.style.display = 'none';
//   startFilterBtn.addEventListener('click', startFilter);

//   var clearFilterBtn = document.createElement('Button');
//   clearFilterBtn.innerHTML = 'Clear Filtering';
//   clearFilterBtn.setAttribute('id', 'clearFilterBtn');
//   clearFilterBtn.style.display = 'none';
//   clearFilterBtn.addEventListener('click', clearFilter);

//   container2.append(startFilterBtn);
//   container2.append(clearFilterBtn);

//   parent.append(container1);
//   parent.append(container2);
// }

export function createServerSideFilterView(parent, startFilter, clearFilter) {

  var container1 = document.createElement('div');
  container1.style.marginBottom = "20px"
  container1.style.display = "flex"
  container1.style.flexDirection = "row"

  createIt(container1, 'pageSize', 'number', 20, false);
  createIt(container1, 'inputFilterVal', 'text', '', true);


  // var container1 = document.createElement('div');
  //   var filterRowInput = document.createElement('INPUT');
  //   filterRowInput.setAttribute('type', 'number');
  //   filterRowInput.setAttribute('id', 'pageSize');
  //   filterRowInput.setAttribute('min', 1);
  //   filterRowInput.setAttribute('max', 1000);
  //   filterRowInput.setAttribute('value', 20);
  //   filterRowInput.setAttribute('style', 'width: 150px');
  //   var filterRowLabel = document.createElement('label');
  //   filterRowLabel.innerHTML = 'Page Size:&nbsp;';

  //   container1.append(filterRowLabel);
  //   container1.append(filterRowInput);

    // var breakLine = document.createElement('br');
    // container1.append(breakLine);

    // var inputFilterVal = document.createElement('INPUT');
    // inputFilterVal.setAttribute('type', 'text');
    // inputFilterVal.setAttribute('id', 'inputFilterVal');
    // inputFilterVal.setAttribute('style', 'width: 150px; display: none ');
    // var filterValueLabel = document.createElement('label');
    // filterValueLabel.innerHTML = 'Filter on First Name:';
    // filterValueLabel.setAttribute('id', 'filterValueLabel');
    // filterValueLabel.setAttribute('style', 'width: 150px; display: none ');
    // container1.append(filterValueLabel);
    // container1.append(inputFilterVal);

    var container2 = document.createElement('p');

    var startFilterBtn = document.createElement('Button');
    startFilterBtn.innerHTML = 'Start Filtering';
    startFilterBtn.setAttribute('id', 'startFilterBtn');
    //startFilterBtn.style.display = 'none';
    startFilterBtn.disabled = true;
    startFilterBtn.addEventListener('click', startFilter);
    container1.append(startFilterBtn);

    var clearFilterBtn = document.createElement('Button');
    clearFilterBtn.innerHTML = 'Clear Filtering';
    clearFilterBtn.setAttribute('id', 'clearFilterBtn');
    //clearFilterBtn.style.display = 'none';
    clearFilterBtn.disabled = true;
    clearFilterBtn.addEventListener('click', clearFilter);
    container1.append(clearFilterBtn);

    parent.append(container1);

}

export function createScrollView(parent, startScroll, scrollToEnd) {
  var container1 = document.createElement('div');
  container1.style.marginBottom = "20px"
  container1.style.display = "flex"
  container1.style.flexDirection = "row"

  createIt(container1, 'pageSize', 'number', 20, false);
  createIt(container1, 'scrollDownVal', 'number', 0, true);
  createIt(container1, 'scrollUpVal', 'number', 0, true);

  var startScrollBtn = document.createElement('Button');
  startScrollBtn.innerHTML = 'Start Scrolling';
  startScrollBtn.setAttribute('id', 'startScrollBtn');
  startScrollBtn.disabled = true;
  startScrollBtn.addEventListener('click', startScroll);
  container1.append(startScrollBtn);

  var scrollToEndBtn = document.createElement('Button');
  scrollToEndBtn.innerHTML = 'Scroll to End';
  scrollToEndBtn.setAttribute('id', 'scrollToEndBtn');
  scrollToEndBtn.disabled = true;
  scrollToEndBtn.addEventListener('click', scrollToEnd);
  container1.append(scrollToEndBtn);

  parent.append(container1);
}


export function startTimer(me) {
  //me.starttime = new Date().getTime()
  me.starttime = performance.now()
}

export function endTimer(me) {
  //me.endtime = new Date().getTime()
  me.endtime = performance.now()
  return me.endtime - me.starttime
  //sendIt(me.product, whichTest, me.endtime - me.starttime)
}

export function sendIt(product, testname, testJSON, milliseconds) {
  //console.log(milliseconds)
  window.total = window.total + milliseconds

  window.children.push(
    {"run":"Run","milliseconds":milliseconds,"product":"ExtJS","testname":testname,"tablename":window.tableName,"leaf":"true"}
  )

  var test = JSON.stringify(testJSON)
  document.dispatchEvent(new CustomEvent('newdata',
  {
    detail: {
      product: product,
      testname: testname,
      test: test,
      testJSON: testJSON,
      milliseconds: milliseconds,
      tablename: window.tableName
    },
    bubbles: true,
    composed: true
  }))
}