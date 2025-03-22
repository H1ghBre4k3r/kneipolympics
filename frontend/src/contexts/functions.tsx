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
};

export type FunctionsContextValue = {
  register(payload: RegisterPayload): Promise<Models.Execution>;
};

export const FunctionsContext = createContext({} as FunctionsContextValue);

const REGISTER = "67d805fa00317040f6ff";

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

  const value: FunctionsContextValue = {
    register,
  };

  return (
    <FunctionsContext.Provider value={value}>
      {children}
    </FunctionsContext.Provider>
  );
}
