const input = document.getElementById('uploadInput');
const reader = new FileReader();
const output = document.getElementById("result");
var text = new String();
var romContents = new String();
input.addEventListener('change', (e) => {
  romContents = "";
  reader.readAsText(e.target.files[0], "latin1");
  reader.onloadend = (evt) => {
    if (evt.target.readyState === FileReader.DONE) {
      const data = evt.target.result;
      romContents = data;
    }
  }
})

function decode() {
  const regex = /([a-f0-9]\0){8}/g;
  let possibleKeys = romContents.match(regex);
  if (!possibleKeys || possibleKeys.length === 0) {
    output.innerText = "\nNo Access Keys found.";
    return;
  }
  possibleKeys = possibleKeys.map(match => match);
  possibleKeys = [...new Set(possibleKeys)];
  const keys = JSON.stringify(possibleKeys).replace(/\\u([0-9]|[a-fA-F])([0-9]|[a-fA-F])([0-9]|[a-fA-F])([0-9]|[a-fA-F])/g, "");
  output.innerText = "\nPossible access keys (the correct key is usually one of the first): " + keys;
  text = "Possible access keys (the correct key is usually one of the first)\n" + keys;
}

function download(file, text) {
              
  var element = document.createElement('a');
  element.setAttribute('href', 
  'data:text/plain;charset=utf-8,'
  + text);
  element.setAttribute('download', file);


  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function downloadkeys() {
  download("keys.txt", text);
}