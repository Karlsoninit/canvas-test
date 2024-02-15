import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CanvasDrawer } from "../CanvasDrawer";

describe("check CanvasDrawer", () => {
  it("renders canvas element", () => {
    render(<CanvasDrawer />);
    const canvasElement = screen.getByTestId("canvas");
    expect(canvasElement).toBeInTheDocument();
  });

  it("canvas has correct border style", () => {
    render(<CanvasDrawer />);
    const canvasElement = screen.getByTestId("canvas");
    expect(canvasElement).toHaveStyle("border: 2px solid #a52a2a");
  });

  test("changes canvas display size when buttons are clicked", async () => {
    render(<CanvasDrawer />);
    const smallButton = screen.getByRole("button", { name: "Small" });
    const mediumButton = screen.getByRole("button", { name: "Medium" });
    const largeButton = screen.getByRole("button", { name: "Large" });
    const canvasElement = screen.getByTestId("canvas");

    expect(canvasElement).toHaveStyle("width: 600px");
    expect(canvasElement).toHaveStyle("height: 400px");

    userEvent.click(smallButton);

    await waitFor(() => {
      expect(canvasElement).toHaveStyle("width: 300px");
    });
    await waitFor(() => {
      expect(canvasElement).toHaveStyle("height: 200px");
    });

    userEvent.click(largeButton);
    await waitFor(() => {
      expect(canvasElement).toHaveStyle("width: 900px");
    });

    await waitFor(() => {
      expect(canvasElement).toHaveStyle("height: 600px");
    });

    userEvent.click(mediumButton);
    await waitFor(() => {
      expect(canvasElement).toHaveStyle("width: 600px");
    });
    await waitFor(() => {
      expect(canvasElement).toHaveStyle("height: 400px");
    });
  });
});
