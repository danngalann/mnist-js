let chart = null;

document.addEventListener("DOMContentLoaded", () => {
  canvas = new Canvas("drawing");
  _makeChart();

  // Init model
  const model = new Model();
  model.loadModel();

  // Control buttons
  document.getElementById("predictBtn").addEventListener("click", async () => {
    let predictions = await model.predict(canvas.getImageData());
    predictions = predictions.map(prediction => prediction*100);
    _updateChart(predictions);
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
      title: {
        display: true,
        text: "Prediction"
      }
    },
  });
}

function _updateChart(scores) {
  chart.data.datasets[0].data = scores;
  chart.update();
}
