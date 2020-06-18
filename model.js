
class Model {
  constructor() {
    this.model = null;
  }

  async loadModel(){
    this.model = await tf.loadLayersModel("static/model.json");
  }

  async predict(canvas){
    let predictions = [0,0,0,0,0,0,0,0,0]

    await tf.tidy(() => {
      let img = tf.browser.fromPixels(canvas, 1);
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');

      // Make and format the predications
      const output = this.model.predict(img);

      // Save predictions on the component
      predictions = Array.from(output.dataSync()); 
    });

    return predictions;
  }
}