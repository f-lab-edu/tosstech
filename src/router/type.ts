export interface Route<T> {
  path: string;
  element: T;
}

export interface Router {
  params: Params;
  navigate: (path: string) => void;
  back: () => void;
}

export interface CompiledRoute<T> {
  path: RegExp;
  element: T;
}

export type Params = Record<string, string>;

export interface MatchedRouteMetadata<T> {
  params: Params;
  element: T;
}
