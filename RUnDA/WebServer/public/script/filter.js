var buttonFilter = document.getElementById("buttonFilter");
var xhr;
var response = "";
var criteriuApi = "";
document.getElementById("buttonShowPie").addEventListener("click", () => {
  var showType = document.getElementById("showType");
  showType.innerText = "pie";
  handleJSONResponse(criteriuApi);
});
document.getElementById("buttonShowDonut").addEventListener("click", () => {
  var showType = document.getElementById("showType");
  showType.innerText = "doughnut";
  handleJSONResponse(criteriuApi);
});
document.getElementById("buttonShowBar").addEventListener("click", () => {
  var showType = document.getElementById("showType");
  showType.innerText = "bar";
  handleJSONResponse(criteriuApi);
});
document.getElementById("buttonShowRows").addEventListener("click", () => {
  var showType = document.getElementById("showType");
  showType.innerText = "horizontalBar";
  handleJSONResponse(criteriuApi);
});

buttonFilter.addEventListener("click", getRequest);
function getRequest() {
  var comboboxJudet = document.getElementById("comboboxJudet");
  var currentCounty = comboboxJudet.options[comboboxJudet.selectedIndex].text;
  var countyId = comboboxJudet.options[comboboxJudet.selectedIndex].value;
  var filterCriteria = document.getElementById("filterCriteria");
  var currentCriteria =
    filterCriteria.options[filterCriteria.selectedIndex].value;

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
  xhr.addEventListener("load", () => {
    response = xhr.responseText;
    handleJSONResponse(criteriuApi);
  });

  xhr.open("GET", `/api/${criteriuApi}/?judet=${countyId}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}
function handleJSONResponse(criteriuApi) {
  console.log(response);
  var filterCriteria = document.getElementById("filterCriteria");
  var labelName = filterCriteria.options[filterCriteria.selectedIndex].text;
  var chartType = getChartType();
  var ctx = document.getElementById("myChart").getContext("2d");
  ctx.innerHTML = "";
  var myChart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: getLabels(criteriuApi),
      datasets: [
        {
          label: `Somajul : ${labelName}`,
          data: getDataFromJSON(criteriuApi),
          backgroundColor: getColors(criteriuApi),
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
function getColors(criteriuApi) {
  var colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(100, 100, 100, 0.2",
  ];

  var count = 7;
  switch (criteriuApi) {
    case "medii":
      count = 4;
      break;
    case "varsta":
      count = 6;
      break;
    case "edu":
      count = 7;
      break;
  }
  var result = new Array(count);
  for (let i = 0; i < count; i++) result[i] = colors[i];
  return result;
}
function getDataFromJSON(criteriuApi) {
  var data = [];
  console.log("RESPONSE:");
  console.log(response);
  var obj = JSON.parse(response);
  switch (criteriuApi) {
    case "medii":
      data.push(obj["NUMAR SOMERI FEMEI DIN MEDIUL RURAL"]);
      data.push(obj["NUMAR SOMERI BARBATI DIN MEDIUL RURAL"]);
      data.push(obj["NUMAR SOMERI FEMEI DIN MEDIUL URBAN"]);
      data.push(obj["NUMAR SOMERI BARBATI DIN MEDIUL URBAN"]);
      break;
    case "edu":
      data.push(obj["fara studii"]);
      data.push(obj["invatamant primar"]);
      data.push(obj["invatamant gimnazial"]);
      data.push(obj["invatamant liceal"]);
      data.push(obj["invatamant posticeal"]);
      data.push(obj["invatamant profesional/arte si meserii"]);
      data.push(obj["invatamant universitar"]);
      break;
    case "varsta":
      data.push(obj["Sub 25 ani"]);
      data.push(obj["25 - 29 ani"]);
      data.push(obj["30 - 39 ani"]);
      data.push(obj["40 - 49 ani"]);
      data.push(obj["50 - 55 ani"]);
      data.push(obj["peste 55 ani"]);
      break;
  }

  return data;
}
function getChartType() {
  return document.getElementById("showType").innerText;
}
function getLabels(criteriuApi) {
  var labels = [];
  switch (criteriuApi) {
    case "medii":
      labels = [
        "total rural femei",
        "total rural barbati",
        "total urban femei",
        "total urban barbati",
      ];
      break;
    case "edu":
      labels = [
        "fara studii",
        "invatamant primar",
        "invatamant gimnazial",
        "invatamant liceal",
        "invatamant postliceal",
        "invatamant profesional/arte si meserii",
        "invatamant universitar",
      ];
      break;
    case "varsta":
      labels = [
        "sub 25 ani",
        "25-29 ani",
        "30-39 ani",
        "40-49 ani",
        "50-55 ani",
        "peste 55 ani",
      ];
      break;
    default:
      break;
  }
  return labels;
}
