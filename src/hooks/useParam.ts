import { useLocation } from "react-router";

export function useParam(name: string): Maybe<string> {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return params.get(name) ?? undefined;
}
