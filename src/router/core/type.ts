export interface Route {
  path: string;
}

export type Params = Record<string, string>;

export interface MatchedRouteMetadata<TRoute extends Route> {
  params: Params;
  route: TRoute;
}
