import { useTranslation } from "react-i18next";
import { Labels } from "../services/i18n";

export function useLabels() {
  const { t } = useTranslation();

  return (key: Labels): string => {
    return t(key);
  };
}
