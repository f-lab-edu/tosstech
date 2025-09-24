import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Home, Post } from "@/pages";
import { Router } from "@/router";

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

const root = createRoot(document.getElementById("root")!);
const render = (element: React.ReactNode) => {
  root.render(<StrictMode>{element}</StrictMode>);
};

export const router = new Router(routes, render);
