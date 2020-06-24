var buttonFilter = document.getElementById("buttonFilter");
buttonFilter.addEventListener("click", getRequest);
function getRequest() {
  var comboboxJudet = document.getElementById("comboboxJudet");
  var currentCounty = comboboxJudet.options[comboboxJudet.selectedIndex].text;
  var countyId = comboboxJudet.options[comboboxJudet.selectedIndex].value;
  console.log(`JUDET SELECTAT : ${currentCounty}; VALUE: ${countyId}`);

  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    console.log(xhr.responseText);
    document.getElementById("ajaxResponse").innerText = xhr.responseText;
  });

  xhr.open("GET", `/api/medii/?judet=${countyId}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}
