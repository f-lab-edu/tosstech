import { Router } from "../core";
import type { Route } from "../core/type";

export interface ReactRouterRoute extends Route {
  element: React.ReactNode;
}

export class ReactRouter extends Router<ReactRouterRoute> {}
