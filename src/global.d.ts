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
  needs_submission: boolean;
  needs_picture: boolean;
  individual_points: boolean;
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

type Submission = {
  $id: string;
  routeId: string;
  barId: string;
  beers?: string;
  entranceSign?: string;
  answer?: string;
  imageSubmission?: string;
  skipped?: boolean;
  accepted?: boolean;
  declined?: boolean;
  points?: number;
  timestamp: number;
};

type ScoreboardEntry = {
  name: string;
  id: string;
  points: number;
};
