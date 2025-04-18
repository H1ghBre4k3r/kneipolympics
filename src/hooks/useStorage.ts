import { useContext } from "react";
import { StorageContext } from "../contexts/storage";

export function useStorage() {
  return useContext(StorageContext);
}
