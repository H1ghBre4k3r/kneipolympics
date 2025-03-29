import { useAuth } from "./useAuth";

export function usePreferences() {
  const { user, account } = useAuth();
  const { prefs } = user ?? {};

  function get(pref: PrefKeys): Maybe<string> {
    return prefs?.[pref];
  }

  async function set(pref: PrefKeys, value: string) {
    await account.updatePrefs({
      ...prefs,
      [pref]: value,
    });
  }

  return [get, set] as const;
}
