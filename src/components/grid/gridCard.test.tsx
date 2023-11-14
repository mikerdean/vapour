import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import GridCard from "./gridCard";

describe("Grid card component", () => {
  it("should render the supplied title", () => {
    render(() => <GridCard title="A test title" />);
    expect(screen.getByText("A test title")).toBeInTheDocument();
  });

  it("should render a single item", () => {
    render(() => <GridCard title="A test title" items={["Item 1"]} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  it("should render a multiple items", () => {
    render(() => (
      <GridCard title="A test title" items={["Item 1", "Item 2", "Item 3"]} />
    ));
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("should render multiple JSX items", () => {
    render(() => (
      <GridCard
        title="A test title"
        items={[
          <img src="http://example.com/cat.jpg" alt="A cat" />,
          <img src="http://example.com/dog.jpg" alt="A dog" />,
          <img src="http://example.com/emu.jpg" alt="An emu" />,
        ]}
      />
    ));

    expect(screen.getByRole("img", { name: "A cat" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "A dog" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "An emu" })).toBeInTheDocument();
  });
});
