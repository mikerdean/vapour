import { screen } from "@solidjs/testing-library";
import { describe, expect, test } from "vitest";

import { setup } from "../../../utils/testing";
import { HeadingLevel } from "./types";
import Heading from ".";

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
    }
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
    }
  );
});
