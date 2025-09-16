import { useEffect, useState } from "react";
import type { CompiledRoute } from "./type";

export function RouterProvider({ router }: { router: CompiledRoute[] }) {
  const [Element, setElement] = useState<React.ReactNode>(null);

  function render(path: string) {
    const page = router.filter((route) => route.path.test(path));

    if (page.length === 0) {
      setElement(<h1>404 ERROR PAGE</h1>);
    } else {
      setElement(page[0].element);
    }
  }

  useEffect(() => {
    const path = window.location.pathname;
    render(path);

    window.addEventListener("popstate", () => {
      render(path);
    });
  }, []);

  return <>{Element}</>;
}
