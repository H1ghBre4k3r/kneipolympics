type Maybe<T> = T | undefined;

type PrefKeys = "firstName" | "lastName" | "phone" | "smoker" | "joined";

type Prefs = {
  [key in PrefKeys]: string;
};

type Bar = {
  $id: string;
  address: string;
  name: string;
  task: string;
  needs_picture: boolean;
};
