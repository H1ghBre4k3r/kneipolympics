import { createContext, PropsWithChildren, useMemo } from "react";
import { useAppwrite } from "../hooks/useAppwrite";
import {
  AppwriteException,
  ExecutionMethod,
  Functions,
  Models,
} from "appwrite";

export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  token: string;
  smoker: boolean;
};

export type FunctionsContextValue = {
  register(payload: RegisterPayload): Promise<Models.Execution>;
  getUsers(): Promise<Models.User<Models.Preferences>[]>;
  createRoute(name: string): Promise<Models.Execution>;
  getContestants(): Promise<Models.User<Models.Preferences>[]>;
  assignToTeam(userId: string, routeId: string): Promise<Models.Execution>;
  getNextBar(): Promise<Maybe<Bar>>;
  /**
   * This will create a submission for the next bar on this route.
   * If you mess up, you will submit for the wrong bar.
   * Therefore, `barId` and `routeId` will be purposely ignored
   */
  createSubmission(submission: Partial<Submission>): Promise<void>;
  skipBar(barId: string): Promise<void>;
  getPoints(): Promise<ScoreboardEntry[]>;
};

export const FunctionsContext = createContext({} as FunctionsContextValue);

const REGISTER = "67d805fa00317040f6ff";
const GET_USERS = "67dec57b0010a501bc9e";
const CREATE_ROUTE = "67fd591d00258a3d28f7";
const GET_CONTESTANTS = "67fd63670031c2276f9f";
const ASSIGN_TO_TEAM = "67fd685f0030b3383ee3";
const GET_NEXT_BAR = "6804cab00036dcc43720";
const ADD_SUBMISSION = "6803fe84000ec14e0aca";
const SKIP_BAR = "6804d14d0036f97ddbc1";
const GET_POINTS = "680ccfd10009fb5382f2";

export function FunctionsContextProvider({ children }: PropsWithChildren) {
  const { client } = useAppwrite();

  const functions = useMemo(() => new Functions(client), [client]);

  async function register(payload: RegisterPayload): Promise<Models.Execution> {
    const result = await functions.createExecution(
      REGISTER,
      JSON.stringify(payload),
      false,
      undefined,
      ExecutionMethod.POST,
      {},
    );

    if (result.status !== "completed") {
      throw new AppwriteException("Internal Server Error");
    }

    return result;
  }

  async function getUsers(): Promise<Models.User<Models.Preferences>[]> {
    const result = await functions.createExecution(
      GET_USERS,
      undefined,
      false,
      undefined,
      ExecutionMethod.GET,
      {},
    );

    if (result.status !== "completed") {
      throw new AppwriteException("Internal Server Error");
    }

    return JSON.parse(result.responseBody);
  }

  async function createRoute(name: string): Promise<Models.Execution> {
    const result = await functions.createExecution(
      CREATE_ROUTE,
      JSON.stringify({ name }),
      false,
      undefined,
      ExecutionMethod.POST,
      {},
    );

    if (result.status !== "completed") {
      throw new AppwriteException("Internal Server Error");
    }

    return result;
  }

  async function getContestants(): Promise<Models.User<Models.Preferences>[]> {
    const result = await functions.createExecution(
      GET_CONTESTANTS,
      undefined,
      false,
      undefined,
      ExecutionMethod.GET,
      {},
    );

    if (result.status !== "completed") {
      throw new AppwriteException("Internal Server Error");
    }

    return JSON.parse(result.responseBody);
  }

  async function assignToTeam(
    userId: string,
    routeId: string,
  ): Promise<Models.Execution> {
    const result = await functions.createExecution(
      ASSIGN_TO_TEAM,
      JSON.stringify({ userId, routeId }),
      false,
      undefined,
      ExecutionMethod.POST,
      {},
    );

    if (result.status !== "completed") {
      throw new AppwriteException("Internal Server Error");
    }

    return result;
  }

  async function createSubmission({
    barId,
    answer,
    imageSubmission,
    entranceSign,
    beers,
  }: Partial<Submission>): Promise<void> {
    const result = await functions.createExecution(
      ADD_SUBMISSION,
      JSON.stringify({ barId, answer, imageSubmission, entranceSign, beers }),
      false,
      undefined,
      ExecutionMethod.POST,
      {},
    );

    if (result.status !== "completed") {
      throw new AppwriteException("Internal Server Error");
    }

    if (result.responseStatusCode !== 200) {
      throw new AppwriteException("Bad Request");
    }
  }

  async function skipBar(barId: string): Promise<void> {
    const result = await functions.createExecution(
      SKIP_BAR,
      JSON.stringify({ barId }),
      false,
      undefined,
      ExecutionMethod.POST,
      {},
    );

    if (result.status !== "completed") {
      throw new AppwriteException("Internal Server Error");
    }

    if (result.responseStatusCode !== 200) {
      throw new AppwriteException("Bad Request");
    }
  }

  async function getNextBar(): Promise<Maybe<Bar>> {
    const result = await functions.createExecution(
      GET_NEXT_BAR,
      undefined,
      false,
      undefined,
      ExecutionMethod.GET,
      {},
    );

    if (result.status !== "completed") {
      throw new AppwriteException("Internal Server Error");
    }

    if (result.responseStatusCode === 404) {
      return undefined;
    }

    if (result.responseStatusCode !== 200) {
      throw new AppwriteException("Bad Request");
    }

    return JSON.parse(result.responseBody);
  }

  async function getPoints(): Promise<ScoreboardEntry[]> {
    const result = await functions.createExecution(
      GET_POINTS,
      undefined,
      false,
      undefined,
      ExecutionMethod.GET,
      {},
    );

    if (result.status !== "completed") {
      throw new AppwriteException("Internal Server Error");
    }
    return JSON.parse(result.responseBody);
  }

  const value: FunctionsContextValue = {
    register,
    getUsers,
    createRoute,
    getContestants,
    assignToTeam,
    getNextBar,
    createSubmission,
    skipBar,
    getPoints,
  };

  return (
    <FunctionsContext.Provider value={value}>
      {children}
    </FunctionsContext.Provider>
  );
}
