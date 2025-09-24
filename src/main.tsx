import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "@/router";

import { Home, Post } from "@/pages";

import "./index.css";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/post/:id",
    element: <Post />,
  },
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider routes={routes} />
  </StrictMode>
);
