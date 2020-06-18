let chart = null;

document.addEventListener("DOMContentLoaded", () => {
  canvas = new Canvas("drawing");
  _makeChart();

  document.getElementById("predictBtn").addEventListener("click", () => {
    _updateChart(_makeRandomData());
  });

  document.getElementById("eraseBtn").addEventListener("click", () => {
    canvas.erase();
  });
});

function _makeRandomData() {
  let data = [];
  for (let i = 0; i < 19; i++) {
    let value = Math.random();
    data.push(value);
  }

  return data;
}

function _makeChart() {
  var ctx = document.getElementById("chart").getContext("2d");
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      datasets: [
        {
          label: "confidence",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
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

function _updateChart(scores) {
  chart.data.datasets[0].data = scores;
  chart.update();
}
