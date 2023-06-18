import { screen, within } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { setup } from "../../../utils/testing";
import DefinitionList from "./definitionList";

describe("Unordered list component", () => {
  it("renders a top level list element", () => {
    setup(() => (
      <DefinitionList
        label="Test definition list"
        each={[
          {
            header: "Header 1",
            description: "Description 1",
          },
        ]}
      />
    ));

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("renders a list with the correct number of list items", () => {
    setup(() => (
      <DefinitionList
        label="Test definition list"
        each={[
          {
            header: "Header 1",
            description: "Description 1",
          },
          {
            header: "Header 2",
            description: "Description 2",
          },
          {
            header: "Header 3",
            description: "Description 3",
          },
        ]}
      />
    ));

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(3);
  });

  it("renders a list with its list items using the render prop", () => {
    setup(() => (
      <DefinitionList
        label="Test definition list"
        each={[
          {
            header: "Header 1",
            description: "Description 1",
          },
          {
            header: "Header 2",
            description: "Description 2",
          },
          {
            header: "Header 3",
            description: "Description 3",
          },
        ]}
      />
    ));

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(3);

    expect(items[0]).toHaveTextContent("Header 1");
    expect(items[1]).toHaveTextContent("Header 2");
    expect(items[2]).toHaveTextContent("Header 3");

    expect(within(list).getByText("Description 1")).toBeInTheDocument();
    expect(within(list).getByText("Description 2")).toBeInTheDocument();
    expect(within(list).getByText("Description 3")).toBeInTheDocument();
  });
});
