import { useContext } from "react";
import { DatabaseContext } from "../contexts/database";

export function useDatabase() {
  return useContext(DatabaseContext);
}
