export default class Orbe {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = color;
  }

  show(p5) {
    p5.push();
    p5.fill(this.color);
    p5.noStroke();
    p5.ellipse(this.x, this.y, this.radius * 2);
    p5.pop();
  }

  update(p5) {}
}
