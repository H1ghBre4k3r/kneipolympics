import { useContext } from "react";
import { FunctionsContext } from "../contexts/functions";

export function useFunctions() {
  return useContext(FunctionsContext);
}
