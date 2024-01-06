import { MemoryRouter, type RouteDefinition } from "@solidjs/router";
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import type { Component, JSX } from "solid-js";

type ResultWithUser = ReturnType<typeof render> & {
  user: ReturnType<typeof userEvent.setup>;
};

type InMemoryRouterProps = {
  routes: RouteDefinition | RouteDefinition[];
};

const InMemoryRouter: Component<InMemoryRouterProps> = (props) => {
  return <MemoryRouter>{props.routes}</MemoryRouter>;
};

export const setup = (ui: () => JSX.Element): ResultWithUser => {
  const user = userEvent.setup();
  const view = render(ui);

  return {
    ...view,
    user,
  };
};

export const setupWithRouter = (
  routes: RouteDefinition | RouteDefinition[],
): ResultWithUser => {
  const user = userEvent.setup();
  const view = render(() => <InMemoryRouter routes={routes} />, {});

  return {
    ...view,
    user,
  };
};
