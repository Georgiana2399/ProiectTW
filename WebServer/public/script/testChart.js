var ctx = document.getElementById("myChart").getContext("2d");
var data = {
  datasets: [
    {
      data: [70, 21, 49],
    },
  ],
  labels: ["Total someri", "Total someri barbati", "Total someri femei"],
};
var options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};
var myPieChart = new Chart(ctx, {
  type: "pie",
  data: data,
  options: options,
});
