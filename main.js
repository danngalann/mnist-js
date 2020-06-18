document.addEventListener("DOMContentLoaded", () => {
  canvas = new Canvas("drawing");
  
  document.getElementById("predictBtn").addEventListener("click", () => {
    _makeChart(_makeRandomData());
  })
});

function _makeRandomData(){
  let data = [];
  for (let i = 0; i < 19; i++) {
    let value = Math.random();
    data.push(value);
  }
  
  return data
}

function _makeChart(scores) {
  var ctx = document.getElementById("chart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      datasets: [
        {
          label: "confidence",
          data: scores,
          backgroundColor: "rgba(255, 99, 132, 0.5)"
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
