import type {
  DependencyHistory,
  DependencyLocation,
  MatchedRouteMetadata,
  Params,
  Route,
  RouterEventTarget,
} from "./type";
import { pathToRegex } from "./utils";

interface RouterDependencyObject {
  location: DependencyLocation;
  history: DependencyHistory;
  eventTarget?: RouterEventTarget;
}

// 다른 환경에서 동작할수 있는 EventTarget 생성
class CustomEventTarget implements RouterEventTarget {
  dispatchEvent() {
    return true;
  }
  addEventListener() {}
  removeEventListener() {}
}

class Router<TRoute extends Route> {
  private routes: TRoute[];
  private currentRoute: TRoute | undefined;
  private params: Params = {};

  public eventTarget: RouterEventTarget;
  private dependencyObject: RouterDependencyObject;

  constructor(routes: TRoute[], dependencyObject: RouterDependencyObject) {
    this.routes = routes;
    this.dependencyObject = dependencyObject;
    this.eventTarget = dependencyObject.eventTarget ?? new CustomEventTarget();

    this.update();
  }

  private getMatchedRoute(path: string): MatchedRouteMetadata<TRoute> | null {
    for (const route of this.routes) {
      const pathRegex = pathToRegex(route.path);
      const matched = pathRegex.exec(path);

      if (matched) {
        return { params: matched.groups ?? {}, route };
      }
    }

    return null;
  }

  protected update() {
    const pathname = this.dependencyObject.location.getPath();
    const matched = this.getMatchedRoute(pathname);

    this.currentRoute = matched?.route;
    this.params = matched?.params ?? {};

    if (matched) {
      this.params = matched.params;
    } else {
      this.params = {};
    }

    this.eventTarget.dispatchEvent(new Event("routechange"));
  }

  public getCurrentRoute() {
    return this.currentRoute;
  }

  public navigate = (path: string): void => {
    this.dependencyObject.history.push(path);
    this.update();
  };

  public back = (): void => {
    this.dependencyObject.history.back();
    this.update();
  };

  public getParams(): Params {
    return this.params;
  }
}

export { Router };
