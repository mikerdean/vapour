import { screen, within } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { setup } from "../../utils/testing";
import OrderedList from "./orderedList";

describe("Unordered list component", () => {
  it("renders a top level list element", () => {
    setup(() => <OrderedList each={[1]}>{(item) => item}</OrderedList>);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("renders a list with the correct number of list items", () => {
    setup(() => <OrderedList each={[1, 2, 3]}>{(item) => item}</OrderedList>);

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(3);
  });

  it("renders a list with its list items using the render prop", () => {
    setup(() => (
      <OrderedList each={[1, 2, 3]}>{(item) => `item ${item}`}</OrderedList>
    ));

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("item 1");
    expect(items[1]).toHaveTextContent("item 2");
    expect(items[2]).toHaveTextContent("item 3");
  });
});
