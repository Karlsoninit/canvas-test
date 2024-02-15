import styled from "@emotion/styled";

type CanvasProps = {
  canvasWidth: number;
  canvasHeight: number;
};

export const Canvas = styled.canvas<CanvasProps>`
  border: 2px solid #a52a2a;
  width: ${(p) => `${p.canvasWidth}px`};
  height: ${(p) => `${p.canvasHeight}px`};
  grid-column: 2 / 12;
  margin-bottom: 20px;
`;

export const Wrapper = styled.div`
  max-width: 1440px;
  padding: 0 50px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 25px;
`;
