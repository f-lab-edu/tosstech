export interface Route {
  path: string;
  element: React.ReactNode;
}

export interface Router {
  params: Params;
  navigate: (path: string) => void;
  back: () => void;
}

export interface CompiledRoute {
  path: RegExp;
  element: React.ReactNode;
}

export type Params = Record<string, string>;
