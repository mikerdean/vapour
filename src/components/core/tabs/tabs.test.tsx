import { screen } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";

import { setupWithRouter } from "../../../utils/testing";
import Tabs from "./tabs";
import type { TabItem } from "./types";

const setupTabs = function <T extends TabItem>(
  length: number,
  tabSetup: (value: unknown, index: number) => T,
) {
  const tabs: T[] = Array.from({ length }, tabSetup);

  const view = setupWithRouter([
    {
      component: () => <Tabs items={tabs} />,
      path: "/",
    },
  ]);

  return {
    ...view,
    tabs,
  };
};

const setupLinkTabs = (length: number) =>
  setupTabs(length, (_, i) => ({
    label: `Tab ${i + 1}`,
    path: `/tab${i + 1}`,
  }));

const setupButtonTabs = (length: number) =>
  setupTabs(length, (_, i) => ({
    label: `Tab ${i + 1}`,
    onClick: vi.fn(),
  }));

const setupMixedTabs = (length: number) =>
  setupTabs(length, (_, i) => {
    const tabPart = {
      label: `Tab ${i + 1}`,
    };

    if (i % 2 === 0) {
      return {
        ...tabPart,
        path: `/tab${i + 1}`,
      };
    } else {
      return {
        ...tabPart,
        onClick: vi.fn(),
      };
    }
  });

describe("Tabs component", () => {
  it("renders a tablist element with a supplied list of link tabs", () => {
    setupLinkTabs(1);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("renders a tablist element for a supplied list of button tabs", () => {
    setupButtonTabs(1);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("renders a tablist element for a supplied list of mixed tabs", () => {
    setupMixedTabs(1);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("renders the correct number of tabitem elements with a list of link tabs", () => {
    setupLinkTabs(5);
    expect(screen.getAllByRole("tab")).toHaveLength(5);
  });

  it("renders the correct number of tabitem elements with a list of button tabs", () => {
    setupButtonTabs(7);
    expect(screen.getAllByRole("tab")).toHaveLength(7);
  });

  it("renders the correct number of tabitem elements with a list of mixed tabs", () => {
    setupMixedTabs(10);
    expect(screen.getAllByRole("tab")).toHaveLength(10);
  });

  it("renders the correct number of link elements for a list of link tabs", () => {
    const length = 5;
    setupLinkTabs(length);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(length);

    Array.from({ length }).forEach((_, i) => {
      expect(links[i]).toHaveAttribute("href", `/tab${i + 1}`);
      expect(links[i]).toHaveTextContent(`Tab ${i + 1}`);
    });
  });

  it("renders the correct number of button elements for a list of button tabs", () => {
    const length = 7;
    setupButtonTabs(length);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(length);

    Array.from({ length }).forEach((_, i) => {
      expect(buttons[i]).toHaveTextContent(`Tab ${i + 1}`);
    });
  });

  it("renders the correct number of elements for a list of mixed tabs", () => {
    setupMixedTabs(10);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5);
  });

  it("calls the `onClick` method of the button when a tab is pressed", async () => {
    const length = 7;
    const { tabs, user } = setupButtonTabs(length);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(length);

    const results = Array.from({ length }).map(async (_, i) => {
      await user.click(buttons[i]);
      expect(tabs[i].onClick).toHaveBeenCalledOnce();
    });

    await Promise.all(results);
  });
});
