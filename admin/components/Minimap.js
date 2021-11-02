import React, { useEffect, useState, useRef } from "react";
import { Box, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Sketch = dynamic(import("react-p5"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Minimap = (props) => {
  const canvasRef = useRef(null);
  let x = 5;
  let y = 5;

  const map = (value, x1, y1, x2, y2) =>
    ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   //Our first draw
  //   ctx.fillStyle = "#dddddd";
  //   ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //   for (let p of props.lobby.players) {
  //     ctx.beginPath();
  //     ctx.fillStyle = "red";
  //     ctx.fill();
  //     ctx.arc(
  //       p.x * ctx.canvas.width,
  //       p.y * ctx.canvas.height,
  //       p.mass,
  //       0,
  //       2 * Math.PI
  //     );
  //     ctx.stroke();
  //   }
  // }, []);

  //See annotations in JS for more information
  const setup = (p5, canvasParentRef) => {
    console.log(canvasParentRef);
    let w = props.isMain ? 900 : 550;
    let h = props.isMain ? 350 : 175;
    p5.createCanvas(w, h).parent(canvasParentRef);
    p5.background(p5.color(90, 50));
    // p5.canvas.width = "100px";
    // p5.canvas.height = "100px";
    p5.push();
    p5.stroke(0, 160);
    p5.strokeWeight(0.3);
    for (let i = 0; i < p5.width; i += 20) {
      p5.line(i, 0, i, p5.height);
    }
    for (let j = 0; j < p5.height; j += 20) {
      p5.line(0, j, p5.width, j);
    }
    p5.pop();
    for (let p of props.lobby.players) {
      p5.push();
      let x = p5.map(p.x, 0, 1, 0, p5.width);
      let y = p5.map(p.y, 0, 1, 0, p5.height);
      p5.translate(x, y);

      p5.fill(
        p5.color(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255))
      );
      // p5.noStroke();
      p5.ellipse(0, 0, p5.map(p.mass, 0, 350, 0, p5.height));
      p5.fill(0);
      p5.text(`${p.name}(${p.level})`, 10, 10);
      p5.pop();
    }
  };

  // const draw = (p5) => {
  //   p5.ellipse(x, y, 70, 70);
  //   x++;
  // };

  return (
    <Flex flexGrow="1">
      <Sketch
        style={{
          margin: "30px",
          borderRadius: "5px",
          width: "100%",
          height: "100%",
        }}
        setup={setup}
        // draw={draw}
      />
    </Flex>
  );

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", margin: "30px", borderRadius: "5px" }}
      {...props}
    />
  );
};

export default Minimap;
