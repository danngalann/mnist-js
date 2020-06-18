class Canvas {
  // Initialize variables
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.prevX = 0;
    this.prevY = 0;
    this.currX = 0;
    this.currY = 0;
    this.height = this.canvas.height;
    this.width = this.canvas.width;
    this.flag = false;
    this.dotFlag = false;
    this.color = "white";
    this.thickness = 10;

    this.initEventListeners();
  }

  initEventListeners() {
    this.canvas.addEventListener("mousemove", (e) => {
      this.findxy("move", e);
    });
    this.canvas.addEventListener("mousedown", (e) => {
      this.findxy("down", e);
    });
    this.canvas.addEventListener("mouseup", (e) => {
      this.findxy("up", e);
    });
    this.canvas.addEventListener("mouseout", (e) => {
      this.findxy("out", e);
    });
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(this.currX, this.currY);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.thickness;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  erase() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  _updateCoords(e) {
    // Update last coords
    this.prevX = this.currX;
    this.prevY = this.currY;

    // Get current coords
    const rect = this.canvas.getBoundingClientRect();
    this.currX = e.clientX - rect.left;
    this.currY = e.clientY - rect.top;
  }

  findxy(action, e) {
    if (action == "down") {
      this._updateCoords(e);

      this.flag = true;
      this.dot_flag = true;
      if (this.dot_flag) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.currX, this.currY, 2, 2);
        this.ctx.closePath();
        this.dot_flag = false;
      }
    }

    if (action == "up" || action == "out") {
      this.flag = false;
    }

    if (action == "move") {
      if (this.flag) {
        this._updateCoords(e);
        this.draw();
      }
    }
  }

  _getScaledCanvas(){
    // Get hidden canvas
    const scaledCanvas = document.getElementById("scaled");
    const scaledCtx = scaledCanvas.getContext("2d");

    // Draw image in hidden canvas
    scaledCtx.drawImage(this.canvas, 0, 0, 28, 28);

    // Get image data and clear hidden canvas
    const scaled = scaledCtx.getImageData(0, 0, 28, 28);
    scaledCtx.clearRect(0, 0, 28, 28)
    
    // Return image data
    return scaled
  }

  getImageData(){
    return this._getScaledCanvas();
  }

  toDataURL(){
    return this.canvas.toDataURL();
  }
}
