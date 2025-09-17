import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "@/router";
import { createBrowserRouter } from "@/router/api";

import { Home, Post } from "@/pages";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/post/:id",
    element: <Post />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
