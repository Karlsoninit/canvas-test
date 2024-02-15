import { capitalizeFirstLetter } from "../helpers";

describe("capitalizeFirstLetter", () => {
  it("capitalizes the first letter of a string", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
  });

  it("does not change the case of other letters", () => {
    expect(capitalizeFirstLetter("hElLo")).toBe("HElLo");
  });

  it("handles empty strings", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("handles single-character strings", () => {
    expect(capitalizeFirstLetter("a")).toBe("A");
  });

  it("handles strings with leading whitespace", () => {
    expect(capitalizeFirstLetter(" hello")).toBe(" hello");
  });
});
