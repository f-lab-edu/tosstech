import { createContext } from "react";
import type { ReactRouter } from "./Router";

export const RouterContext = createContext<ReactRouter | null>(null);
