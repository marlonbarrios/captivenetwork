const canvasSketch = require('canvas-sketch');
const p5 = require('p5');

new p5()

let nb = 100;
let distMin = 200;
let lineWidth = 1
let p = Array(nb);

const settings = {
  pixelsPerInch: 300,
  p5: true,
  duration: 3,
  animate: true,
  dimensions: [512, 512],
  bleed: 1 / 8,
};

canvasSketch(() => {
  for (let i = 0; i < nb; i++) {
    p[i] = new Particle(width/2, height/2)
  }

  return ({
    width,
    height
  }) => {

    for (let i = 0; i < p.length; i++) {
      p[i].draw();
      clear()
    }

    for (let i = 0; i < p.length; i++) {
      let pi = p[i];
      for (let j = i + 1; j < p.length; j++) {
        let pj = p[j];
        let d = dist(pi.x, pi.y, pj.x, pj.y);
        if (d < distMin) {

          //strokeWeight(1 - d/distMin);
          strokeWeight(lineWidth);
          stroke(0, 255 - d * 255 / distMin);
          line(pi.x, pi.y, pj.x, pj.y);
        }
      }
    }

  }

}, settings);



class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
  }
  draw() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    if (this.x > width) {
      this.x = width;
      this.vx = -this.vx;
    }
    if (this.x < 0) {
      this.x = 0;
      this.vx = -this.vx;
    }
    if (this.y > height) {
      this.y = height;
      this.vy = -this.vy;
    }
    if (this.y < 0) {
      this.y = 0;
      this.vy = -this.vy;
    }

    point(this.x, this.y, 1);

  }
}
