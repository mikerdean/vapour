import { screen, within } from "@solidjs/testing-library";
import type { JSX } from "solid-js";
import { describe, expect, it } from "vitest";

import { mockIsIntersecting } from "../../../utils/intersectionObserver";
import { setup } from "../../../utils/testing";
import HostProvider from "../../context/hostProvider";
import type { Host } from "../../context/hostProvider.types";
import IntersectionObserverProvider from "../../context/intersectionObserverProvider";
import { ThumbnailType } from "./types";
import Thumbnail from ".";

const defaultHost = { hostname: "localhost", httpPort: 8080, tcpPort: 9090 };

const setupThumbnail = (ui: () => JSX.Element, host?: Host) =>
  setup(() => (
    <HostProvider host={host}>
      <IntersectionObserverProvider>{ui()}</IntersectionObserverProvider>
    </HostProvider>
  ));

describe("Thumbnail component", () => {
  it("renders a default icon if no uri is provided", () => {
    setupThumbnail(() => <Thumbnail type={ThumbnailType.Album} />, defaultHost);

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-icon");
  });

  it("renders a default icon if no host is found", () => {
    setupThumbnail(() => (
      <Thumbnail type={ThumbnailType.Artist} uri="image://someKodiImage.jpg" />
    ));

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-icon");
  });

  it("renders a placeholder image that waits to be in view", () => {
    setupThumbnail(
      () => (
        <Thumbnail type={ThumbnailType.Song} uri="image://someKodiImage.jpg" />
      ),
      defaultHost,
    );

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon).not.toHaveAttribute("src");
  });

  it("renders an image when the intersection observer is triggered", () => {
    setupThumbnail(
      () => (
        <Thumbnail type={ThumbnailType.Song} uri="image://someKodiImage.jpg" />
      ),
      defaultHost,
    );

    const placeholder = screen.getByTestId("thumbnail-placeholder");
    expect(placeholder).toBeInTheDocument();

    const img = within(placeholder).getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).not.toHaveAttribute("src");

    mockIsIntersecting(placeholder, true);

    expect(img).toHaveAttribute(
      "src",
      `http://localhost:8080/image/image%3A%2F%2FsomeKodiImage.jpg`,
    );
  });

  it("renders the correct `played` label when the prop is set", () => {
    setupThumbnail(
      () => <Thumbnail type={ThumbnailType.Song} played={true} />,
      defaultHost,
    );

    expect(screen.getByTitle("Played")).toBeInTheDocument();
  });

  it("renders the correct `played` label when the prop is set and a URI is provided", () => {
    setupThumbnail(
      () => (
        <Thumbnail
          type={ThumbnailType.Song}
          uri="image://someKodiImage.jpg"
          played={true}
        />
      ),
      defaultHost,
    );

    expect(screen.getByTitle("Played")).toBeInTheDocument();
  });
});
