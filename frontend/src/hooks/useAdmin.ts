import { useContext } from "react";
import { AdminContext } from "../contexts/admin";

export function useAdmin() {
  return useContext(AdminContext);
}
