import { Router } from "../core";
import type { DependencyHistory, DependencyLocation } from "../core/type";
import type { Route } from "../core/type";

export interface ReactRouterRoute extends Route {
  element: React.ReactNode;
}

export const BrowserLocation: DependencyLocation = {
  getPath() {
    return (
      window.location.pathname + window.location.search + window.location.hash
    );
  },
};

export const BrowserHistory: DependencyHistory = {
  push(path: string) {
    window.history.pushState(null, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  },
  back() {
    window.history.back();
  },
};

export class ReactRouter extends Router<ReactRouterRoute> {
  readonly dispose: () => void;

  constructor(routes: ReactRouterRoute[]) {
    super(routes, {
      location: BrowserLocation,
      history: BrowserHistory,
      eventTarget: new EventTarget(),
    });

    const abortController = new AbortController();

    window.addEventListener(
      "popstate",
      () => {
        this.update();
      },
      {
        signal: abortController.signal,
      }
    );

    this.dispose = () => {};
  }

  public addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean
  ) {
    return this.eventTarget.addEventListener(type, callback, options);
  }
}
