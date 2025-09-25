import { useRouter } from "./hooks";

export function Outlet() {
  const { currentRoute } = useRouter();
  return <>{currentRoute?.element}</>;
}
