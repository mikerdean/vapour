import { screen } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import { describe, expect, test } from "vitest";

import { setup } from "../../utils/testing";
import Heading from "./heading";
import { HeadingLevel } from "./heading.types";

const headingLevels: HeadingLevel[] = [1, 2, 3, 4, 5, 6];

describe("Heading component", () => {
  test.each(headingLevels)(
    "renders the correct heading",
    (level: HeadingLevel) => {
      const name = "test";
      setup(() => <Heading level={level}>{name}</Heading>);

      const heading = screen.getByRole("heading", { level, name });

      expect(heading).toBeInTheDocument();
      expect(heading).not.toHaveAttribute("id");
    },
  );

  test.each(headingLevels)(
    "renders the heading with an id if supplied",
    (level: HeadingLevel) => {
      const name = "test";
      setup(() => (
        <Heading id="suppliedId" level={level}>
          {name}
        </Heading>
      ));

      const heading = screen.getByRole("heading", { level, name });

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveAttribute("id", "suppliedId");
    },
  );

  test("changes the heading level based on the supplied prop", () => {
    const [level, setLevel] = createSignal<HeadingLevel>(1);
    const name = "test";

    setup(() => <Heading level={level()}>{name}</Heading>);

    const h1 = screen.getByRole("heading", { level: 1, name });
    expect(h1).toBeInTheDocument();

    setLevel(3);
    const h3 = screen.getByRole("heading", { level: 3, name });
    expect(h3).toBeInTheDocument();
  });
});
