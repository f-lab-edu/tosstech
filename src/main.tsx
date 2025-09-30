import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Outlet } from "./router/react/Outlet";
import { ReactRouter } from "./router/react/Router";
import { RouterContext } from "./router/react/context";

import "./index.css";
import { Home, Post } from "./pages";

export const router = new ReactRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/post/:id",
    element: <Post />,
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
