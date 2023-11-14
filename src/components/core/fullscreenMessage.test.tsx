import { screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { setup } from "../../utils/testing";
import FullScreenMessage from "./fullscreenMessage";

describe("Input component", () => {
  it("should render without a role", () => {
    const { container } = setup(() => <FullScreenMessage />);
    expect(container.firstElementChild).not.toHaveAttribute("role");
  });

  it("should render with a supplied role prop", () => {
    setup(() => <FullScreenMessage role="main" />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("should render with the supplied children", () => {
    setup(() => (
      <FullScreenMessage>
        <button type="button">Save</button>
      </FullScreenMessage>
    ));

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });
});
