import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ButtonsGroup } from "../ButtonsGroup";

describe("check ButtonGroups", () => {
  it("calls changeSize with correct argument when buttons are clicked", () => {
    const changeSizeMock = jest.fn();

    render(<ButtonsGroup changeSize={changeSizeMock} currentSize="small" />);

    const smallButton = screen.getByRole("button", { name: "Small" });
    const mediumButton = screen.getByRole("button", { name: "Medium" });
    const largeButton = screen.getByRole("button", { name: "Large" });

    userEvent.click(smallButton);
    expect(changeSizeMock).toHaveBeenCalledWith("small");

    userEvent.click(mediumButton);
    expect(changeSizeMock).toHaveBeenCalledWith("medium");

    userEvent.click(largeButton);
    expect(changeSizeMock).toHaveBeenCalledWith("large");
  });
});
