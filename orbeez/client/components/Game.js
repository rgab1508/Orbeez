import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Orbe from "../Entities/Orbe";

const Sketch = dynamic(import("react-p5"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Game = () => {
  let playerBlob;
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    playerBlob = new Orbe(
      500,
      300,
      50,
      p5.color(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255))
    );
  };

  const draw = (p5) => {
    p5.background(20);

    // p5.ellipse(p5.mouseX, p5.mouseY, 70, 70);
    p5.push();
    p5.stroke(255, 160);
    p5.strokeWeight(0.3);
    for (let i = 0; i < p5.width; i += 20) {
      p5.line(i, 0, i, p5.height);
    }
    for (let j = 0; j < p5.height; j += 20) {
      p5.line(0, j, p5.width, j);
    }
    p5.pop();
    playerBlob.show(p5);
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default Game;
