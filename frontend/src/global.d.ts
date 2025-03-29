type Maybe<T> = T | undefined;

type PrefKeys = "firstName" | "lastName" | "phone" | "smoker" | "joined";

type Prefs = {
  [key in PrefKeys]: string;
};
