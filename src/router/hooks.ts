import { createContext, useContext } from "react";
import type { Params } from "./type";

export function useNavigate() {
  function navigate(path: string) {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  return navigate;
}

export const ParamsContext = createContext<Params>({});

export function useParams() {
  return useContext(ParamsContext);
}
