import { createContext, use } from "react";
import type { Router } from "./type";

export const RouterContext = createContext<Router>({
  params: {},
  navigate: () => {},
  back: () => {},
});

export function useRouter() {
  return use(RouterContext);
}
