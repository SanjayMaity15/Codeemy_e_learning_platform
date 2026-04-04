import { useLocation, matchPath } from "react-router-dom";

export default function useRouteMatch(path) {
  const location = useLocation();

  return matchPath(
    { path: path, end: true }, // exact match
    location.pathname
  );
}