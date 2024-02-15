import { render, screen } from "@testing-library/react";
import { PointsList } from "../PointsList";

describe("check PointsList", () => {
  it("renders a list of lines with points", () => {
    const points = [{ points: [1, 2, 3, 4] }, { points: [5, 6, 7, 8] }];

    render(<PointsList points={points} />);

    const listItems = screen.getAllByTestId("list");

    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent("Line 1 --- points: [1, 2, 3, 4]");
    expect(listItems[1]).toHaveTextContent("Line 2 --- points: [5, 6, 7, 8]");
  });
});
