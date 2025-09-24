export function pathToRegex(path: string): RegExp {
  const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern =
    "^" +
    escaped.replace(/\/:([^/]+)/g, (_m, name) => `/(?<${name}>[^/]+)`) +
    "$";

  return new RegExp(pattern);
}
