type Maybe<T> = T | undefined;

type PrefKeys =
  | "firstName"
  | "lastName"
  | "phone"
  | "smoker"
  | "joined"
  | "route";

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

type Route = {
  $id: string;
  name: string;
  bars: string[] | Bar[];
  order: string[];
};

type ConcreteRoute = Omit<Route, "bars"> & {
  bars: Bar[];
};
