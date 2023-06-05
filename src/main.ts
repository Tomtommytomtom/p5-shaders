//p5 sketch

import p5 from "p5";
import { complexMag, mandelbrotWithIterations } from "./mandelbrot";

let centerX = -0.5;
let centerY = 0;
let zoom = 1;

const drawBrot = (p: p5) => {
  for (let x = 0; x < p.width; x++) {
    for (let y = 0; y < p.height; y++) {
      const real = p.map(x, 0, p.width, centerX - zoom, centerX + zoom);
      const imaginary = p.map(y, 0, p.height, centerY - zoom, centerY + zoom);

      const complex = { real, imaginary };

      const maxIterations = 50;

      const { i: iterations, result } = mandelbrotWithIterations(
        complex,
        maxIterations
      );

      let bright = p.map(iterations, 0, maxIterations, 0, 1);
      bright = p.map(Math.sqrt(bright), 0, 1, 0, 255);

      let val =
        iterations + 1 - Math.log(Math.log(complexMag(result))) / Math.log(2);

      let color = val / maxIterations;

      let p5col = p.color(color + 0.23, 1, 1);

      if (iterations === maxIterations || iterations < 10) {
        p5col = p.color(0);
      }

      const pix = (x + y * p.width) * 4;

      p.pixels[pix + 0] = p.red(p5col);
      p.pixels[pix + 1] = p.green(p5col);
      p.pixels[pix + 2] = p.blue(p5col);
      p.pixels[pix + 3] = 255;
    }
  }
  p.updatePixels();
};

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(800, 800);
    p.colorMode(p.HSB, 1);
    p.loadPixels();
    drawBrot(p);
  };

  p.draw = () => {
    if (p.mouseIsPressed) {
      p.background(0);
      centerX = p.map(p.mouseX, 0, p.width, centerX - zoom, centerX + zoom);
      centerY = p.map(p.mouseY, 0, p.height, centerY - zoom, centerY + zoom);
      zoom *= 0.9;

      drawBrot(p);
    }
  };
};

new p5(sketch);
