import { screen, within } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";

import { setup } from "../../../utils/testing";
import Button from "./button";

describe("Button component", () => {
  it("renders without children", () => {
    setup(() => <Button />);

    const button = screen.getByRole("button");
    expect(button).toBeEmptyDOMElement();
  });

  it("renders with children", () => {
    setup(() => (
      <Button>
        <span>test</span>
      </Button>
    ));

    const button = screen.getByRole("button");

    expect(within(button).getByText("test")).toBeInTheDocument();
  });

  it("renders disabled when set", () => {
    setup(() => <Button disabled={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders as active when disabled not supplied", () => {
    setup(() => <Button />);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("renders as active when disabled is explicitly set to false", () => {
    setup(() => <Button disabled={false} />);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("fires onClick when the button is pressed", async () => {
    const fn = vi.fn();
    const { user } = setup(() => <Button onClick={fn} />);

    const button = screen.getByRole("button");
    await user.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("renders as type=`button` by default", () => {
    setup(() => <Button />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("renders as type=`button` when supplied", () => {
    setup(() => <Button type="button" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("renders as type=`submit` when supplied", () => {
    setup(() => <Button type="submit" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("renders as type=`reset` when supplied", () => {
    setup(() => <Button type="reset" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
  });
});
