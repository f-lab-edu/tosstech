export interface Route {
  path: string;
  element: React.ReactNode;
}

export interface CompiledRoute {
  path: RegExp;
  element: React.ReactNode;
}

export type Params = Record<string, string>;
