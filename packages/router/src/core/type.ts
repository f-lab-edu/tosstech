export interface Route {
  path: string;
}

export type Params = Record<string, string>;

export interface MatchedRouteMetadata<TRoute extends Route> {
  params: Params;
  route: TRoute;
}

export interface DependencyLocation {
  getPath(): string;
}

export interface DependencyHistory {
  push(path: string): void;
  back(): void;
}

export interface RouterEventTarget {
  dispatchEvent(event: Event): boolean;
  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions | boolean
  ): void;
}
