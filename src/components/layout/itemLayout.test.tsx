import { screen } from "@solidjs/testing-library";
import { JSX } from "solid-js";
import { describe, expect, it } from "vitest";

import { setup } from "../../utils/testing";
import HostProvider from "../context/hostProvider";
import IntersectionObserverProvider from "../context/intersectionObserverProvider";
import { ThumbnailType } from "../images/thumbnail.types";
import ItemLayout from "./itemLayout";

const setupItemLayout = (ui: () => JSX.Element) => {
  const host = { hostname: "localhost", httpPort: 8080, tcpPort: 9090 };
  return setup(() => (
    <HostProvider host={host}>
      <IntersectionObserverProvider>{ui()}</IntersectionObserverProvider>
    </HostProvider>
  ));
};

describe("Item layout component", () => {
  it("should not show fanart if `backgroundUrl` is not supplied", () => {
    setupItemLayout(() => (
      <ItemLayout title="Title" thumbnailType={ThumbnailType.Album} />
    ));

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("should show fanart if `backgroundUrl` is supplied", () => {
    setupItemLayout(() => (
      <ItemLayout
        title="Title"
        backgroundArtUrl="image://testimage"
        thumbnailType={ThumbnailType.Album}
      />
    ));

    expect(screen.getByTestId("fanart")).toBeInTheDocument();
  });

  it("should not show a thumbnail if `thumbnailUrl` is not supplied", () => {
    setupItemLayout(() => (
      <ItemLayout title="Title" thumbnailType={ThumbnailType.Album} />
    ));

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("should show thumbnail if `thumbnailUrl` is supplied", () => {
    setupItemLayout(() => (
      <ItemLayout
        title="Title"
        thumbnailType={ThumbnailType.Album}
        thumbnailUrl="image://testimage"
      />
    ));

    expect(screen.getByTestId("thumbnail-placeholder")).toBeInTheDocument();
  });

  it("should the supplied title", () => {
    const name = "This is a title";

    setupItemLayout(() => (
      <ItemLayout title={name} thumbnailType={ThumbnailType.Album} />
    ));

    expect(screen.getByRole("heading", { name, level: 1 })).toBeInTheDocument();
  });

  it("should render child components", () => {
    setupItemLayout(() => (
      <ItemLayout title="Title" thumbnailType={ThumbnailType.Album}>
        <span>This is a child I want to find</span>
      </ItemLayout>
    ));

    expect(
      screen.getByText("This is a child I want to find"),
    ).toBeInTheDocument();
  });
});
