import { screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { setup } from "../../utils/testing";
import Input from "./input";

describe("Input component", () => {
  it("should render with the supplied label", () => {
    const label = "Special label";
    setup(() => <Input label={label} ref={() => null} />);
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it("should render with unique ids", () => {
    setup(() => (
      <>
        <Input ref={() => null} />
        <Input ref={() => null} />
      </>
    ));

    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toEqual(2);
    expect(inputs[0]).toHaveAttribute("id");
    expect(inputs[1]).toHaveAttribute("id");
    expect(inputs[0].id).not.toEqual(inputs[1].id);
  });

  it("should render with an error message if the relevant prop is supplied", () => {
    const message = "This field is required";
    setup(() => <Input error={message} ref={() => null} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should render with appropriate classes applied if an error prop is supplied", () => {
    const message = "This field is required";
    setup(() => <Input error={message} ref={() => null} />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("bg-fuchsia-200", "border-fuchsia-500");
    expect(input).not.toHaveClass("bg-slate-400");
  });
});
