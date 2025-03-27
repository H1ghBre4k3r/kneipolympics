import { useAuth } from "./useAuth";

type Prefs = "firstName" | "lastName" | "smoker" | "joined";

export function usePreferences() {
  const { user, account } = useAuth();
  const { prefs } = user ?? {};

  function get(pref: Prefs): Maybe<string> {
    return prefs?.[pref];
  }

  async function set(pref: Prefs, value: string) {
    await account.updatePrefs({
      ...prefs,
      [pref]: value,
    });
  }

  return [get, set] as const;
}
