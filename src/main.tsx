import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Outlet } from "./router/react/Outlet";
import { ReactRouter } from "./router/react/Router";
import { RouterContext } from "./router/react/context";

import "./index.css";

export const router = new ReactRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path: "/post/:id",
    element: <h1>Post</h1>,
  },
]);

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <RouterContext.Provider value={router}>
      <Outlet />
    </RouterContext.Provider>
  </StrictMode>
);
