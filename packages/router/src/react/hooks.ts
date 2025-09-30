import { use, useSyncExternalStore } from "react";
import { RouterContext } from "./context";

export const useRouter = () => {
  const router = use(RouterContext);

  const currentRoute = useSyncExternalStore(
    (onChange) => {
      const abortController = new AbortController();
      router?.addEventListener("routechange", onChange, {
        signal: abortController.signal,
      });
      return () => abortController.abort();
    },
    () => router?.getCurrentRoute()
  );

  if (!router) {
    throw new Error("RouterContext is not provided");
  }

  return {
    currentRoute,
    navigate: router.navigate.bind(router),
    back: router.back.bind(router),
  };
};
