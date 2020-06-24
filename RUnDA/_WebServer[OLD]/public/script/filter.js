var buttonFilter = document.getElementById("buttonFilter");
var xhr;
buttonFilter.addEventListener("click", getRequest);
function getRequest() {
  var comboboxJudet = document.getElementById("comboboxJudet");
  var currentCounty = comboboxJudet.options[comboboxJudet.selectedIndex].text;
  var countyId = comboboxJudet.options[comboboxJudet.selectedIndex].value;
  var filterCriteria = document.getElementById("filterCriteria");
  var currentCriteria =
    filterCriteria.options[filterCriteria.selectedIndex].value;
  var criteriuApi = "";
  switch (currentCriteria) {
    case "m":
      criteriuApi = "medii";
      break;
    case "e":
      criteriuApi = "edu";
      break;
    case "v":
      criteriuApi = "varsta";
      break;
    default:
      console.log(`CRITERIA ERROR ${currentCriteria}`);
      break;
  }
  console.log(`JUDET SELECTAT : ${currentCounty}; VALUE: ${countyId}`);

  xhr = new XMLHttpRequest();
  xhr.addEventListener("load", handleJSONResponse(criteriuApi));

  xhr.open("GET", `/api/${criteriuApi}/?judet=${countyId}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}
function handleJSONResponse(criteriuApi) {
  console.log(xhr.responseText);
  document.getElementById("ajaxResponse").innerText = xhr.responseText;
}
