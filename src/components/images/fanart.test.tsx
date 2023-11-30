import { screen } from "@solidjs/testing-library";
import type { JSX } from "solid-js";
import { describe, expect, it } from "vitest";

import { setup } from "../../utils/testing";
import HostProvider from "../context/hostProvider";
import type { Host } from "../context/hostProvider.types";
import Fanart from "./fanart";

const defaultHost = { hostname: "localhost", httpPort: 8080, tcpPort: 9090 };

const setupFanart = (ui: () => JSX.Element, host?: Host) =>
  setup(() => <HostProvider host={host}>{ui()}</HostProvider>);

describe("Fanart component", () => {
  it("should not show an image when the host is `undefined`", () => {
    setupFanart(() => <Fanart uri={undefined} />);

    const img = screen.queryByRole("img");
    expect(img).not.toBeInTheDocument();
  });

  it("should not show an image when the provided uri is `undefined`", () => {
    setupFanart(() => <Fanart uri={undefined} />, defaultHost);

    const img = screen.queryByRole("img");
    expect(img).not.toBeInTheDocument();
  });

  it("should show the image when a uri is provided by host is not available", () => {
    setupFanart(() => <Fanart uri={"image://someimageuri"} />);

    const img = screen.queryByRole("img");
    expect(img).not.toBeInTheDocument();
  });

  it("should show the image when a uri is provided", () => {
    setupFanart(() => <Fanart uri={"image://someimageuri"} />, defaultHost);

    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });
});
