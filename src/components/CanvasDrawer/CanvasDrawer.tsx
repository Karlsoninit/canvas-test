import React, { useRef, useState, useEffect, useCallback } from "react";
import { ButtonsGroup } from "../ButtonsGroup/ButtonsGroup";
import { PointsList } from "../PointsList/PointsList";
import { Canvas, Wrapper } from "./CanvasDrawer.styles";

import { CanvasSize, Size, Line } from "../../types";

interface ToogleCanvasSize {
  width: number;
  height: number;
}

// Internal fixed sizes of Canvas
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 800;

export const CanvasDrawer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentSize, setCurrentSize] = useState<CanvasSize>(Size.Medium);
  const [lines, setLines] = useState<Line[]>([]);
  const [canvasStyle, setCanvasStyle] = useState({ width: 600, height: 400 }); // default size

  const startDrawing = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      const scaleX = CANVAS_WIDTH / rect.width; // Scale calculation
      const scaleY = CANVAS_HEIGHT / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;
      setIsDrawing(true);
      setLines([...lines, { points: [x, y] }]);
    },
    [lines]
  );

  const updateCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clear canvas
    ctx.lineWidth = 2;
    ctx.strokeStyle = "blue";
    lines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.points[0], line.points[1]);
      for (let i = 2; i < line.points.length; i += 2) {
        ctx.lineTo(line.points[i], line.points[i + 1]);
      }
      ctx.stroke();
    });
  }, [lines]);

  const draw = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;
      const rect = canvasRef.current!.getBoundingClientRect();
      const scaleX = CANVAS_WIDTH / rect.width;
      const scaleY = CANVAS_HEIGHT / rect.height;
      const currentX = (event.clientX - rect.left) * scaleX;
      const currentY = (event.clientY - rect.top) * scaleY;
      const newLines = [...lines];
      const lastLine = newLines[newLines.length - 1];
      const startX = lastLine.points[0];
      const startY = lastLine.points[1];

      const deltaX = Math.abs(currentX - startX);
      const deltaY = Math.abs(currentY - startY);

      if (deltaX > deltaY) {
        // horizontall line
        lastLine.points = [startX, startY, currentX, startY];
      } else {
        // vertical line
        lastLine.points = [startX, startY, startX, currentY];
      }

      setLines(newLines);
      updateCanvas();
    },
    [isDrawing, lines, updateCanvas]
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const changeCanvasSize = useCallback((size: CanvasSize) => {
    const sizes: Record<Size, ToogleCanvasSize> = {
      [Size.Small]: { width: 300, height: 200 },
      [Size.Medium]: { width: 600, height: 400 },
      [Size.Large]: { width: 900, height: 600 },
    };
    setCanvasStyle(sizes[size]);
    setCurrentSize(size);
  }, []);

  useEffect(() => {
    updateCanvas();
  }, [lines, canvasStyle, updateCanvas]);

  return (
    <Wrapper>
      <ButtonsGroup changeSize={changeCanvasSize} currentSize={currentSize} />
      <Canvas
        data-testid="canvas"
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        canvasWidth={canvasStyle.width}
        canvasHeight={canvasStyle.height}
      />
      <PointsList points={lines} />
    </Wrapper>
  );
};
