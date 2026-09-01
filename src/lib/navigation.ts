export type RouteMatch = "exact" | "prefix";

export const isRouteActive = (
  pathname: string,
  href: string,
  match: RouteMatch = "prefix"
) => {
  if (match === "exact") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};
