"use strict";

if (document.getElementById("buttonToggleFilters") === null) {
  console.log("Problem here");
}
document.getElementById("buttonToggleFilters").onclick = () => {
  console.log("TOGGLE FILTERS CLICKED!");
  const TXT_CLOSE = "&times Inchide filtrele";
  const TXT_SHOW = "Arata filtrele";

  var buttonCloseFilters = document.getElementById("buttonToggleFilters");
  var filterColumn = document.getElementById("filterColumn");

  if ("none" === filterColumn.style.display) {
    filterColumn.style.display = "block";
    buttonCloseFilters.innerHTML = TXT_CLOSE;
    return;
  }
  filterColumn.style.display = "none";
  buttonCloseFilters.innerHTML = TXT_SHOW;
};
