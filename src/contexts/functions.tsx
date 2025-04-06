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
};

export const FunctionsContext = createContext({} as FunctionsContextValue);

const REGISTER = "67d805fa00317040f6ff";
const GET_USERS = "67dec57b0010a501bc9e";

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

  const value: FunctionsContextValue = {
    register,
    getUsers,
  };

  return (
    <FunctionsContext.Provider value={value}>
      {children}
    </FunctionsContext.Provider>
  );
}
