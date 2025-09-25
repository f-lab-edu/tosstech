import { useEffect } from "react";
import { RouterContext } from "./context";
import type { ReactRouter } from "./Router";

interface RouterProviderProps {
  router: ReactRouter;
  children: React.ReactNode;
}

export function RouterProvider({ router, children }: RouterProviderProps) {
  useEffect(() => {
    return () => router.dispose();
  }, [router]);

  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
}
