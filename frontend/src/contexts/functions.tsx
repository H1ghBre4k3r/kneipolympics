import { createContext, PropsWithChildren, useMemo } from "react";
import { useAppwrite } from "../hooks/useAppwrite";
import {
  AppwriteException,
  ExecutionMethod,
  Functions,
  Models,
} from "appwrite";

export type FunctionsContextValue = {
  register(
    email: string,
    password: string,
    name: string,
    token: string,
  ): Promise<Models.Execution>;
};

export const FunctionsContext = createContext({} as FunctionsContextValue);

const REGISTER = "67d805fa00317040f6ff";

export function FunctionsContextProvider({ children }: PropsWithChildren) {
  const { client } = useAppwrite();

  const functions = useMemo(() => new Functions(client), [client]);

  async function register(
    email: string,
    password: string,
    name: string,
    token: string,
  ): Promise<Models.Execution> {
    const result = await functions.createExecution(
      REGISTER,
      JSON.stringify({
        email,
        password,
        name,
        token,
        location,
      }),
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
  };

  return (
    <FunctionsContext.Provider value={value}>
      {children}
    </FunctionsContext.Provider>
  );
}
