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
};

export const FunctionsContext = createContext({} as FunctionsContextValue);

const REGISTER = "67d805fa00317040f6ff";
const GET_USERS = "67dec57b0010a501bc9e";
const CREATE_ROUTE = "67fd591d00258a3d28f7";
const GET_CONTESTANTS = "67fd63670031c2276f9f";
const ASSIGN_TO_TEAM = "67fd685f0030b3383ee3";

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

  const value: FunctionsContextValue = {
    register,
    getUsers,
    createRoute,
    getContestants,
    assignToTeam,
  };

  return (
    <FunctionsContext.Provider value={value}>
      {children}
    </FunctionsContext.Provider>
  );
}
