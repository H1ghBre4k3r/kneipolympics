import { useContext } from "react";
import { AppwriteContext } from "../contexts/appwrite";

export function useAppwrite() {
  return useContext(AppwriteContext);
}
