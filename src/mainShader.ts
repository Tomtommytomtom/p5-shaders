import p5 from "p5";
import "./index.css";

let shader: p5.Shader;
//p5 sketch
const sketch = (p: p5) => {
  p.preload = () => {
    shader = p.loadShader("vert.glsl", "frag.glsl");
  };

  p.setup = () => {
    p.createCanvas(800, 800, p.WEBGL);
  };

  p.draw = () => {
    p.shader(shader);
    shader.setUniform("iResolution", [p.width, p.height]);
    shader.setUniform("iTime", p.millis() / 1000);
    p.rect(0, 0, p.width, p.height);
  };
};

new p5(sketch);
