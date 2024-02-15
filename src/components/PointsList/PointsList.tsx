import { FC, memo } from "react";
import { Container } from "./PointsList.styles";
import { Line } from "../../types";

interface PointList {
  points: Line[];
}

const Points: FC<PointList> = ({ points }) => {
  return (
    <Container>
      <ul>
        {[...points].map((line, index) => (
          <li data-testid="list" key={index}>
            Line {index + 1} --- points: [{line?.points.join(", ")}]
          </li>
        ))}
      </ul>
    </Container>
  );
};

export const PointsList = memo(Points);
