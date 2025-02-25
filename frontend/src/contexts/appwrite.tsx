import { Client } from "appwrite";
import { createContext, PropsWithChildren } from "react";

export type AppwriteContextValue = {
  client: Client;
};

export const AppwriteContext = createContext<AppwriteContextValue>(
  {} as AppwriteContextValue,
);

type Props = PropsWithChildren;

export function AppwriteContextProvider({ children }: Props) {
  const client = new Client();
  client
    .setEndpoint("https://appwrite.git-ci.dev/v1")
    .setProject("67bbdbe0003db9b80f07");

  const value = {
    client,
  };

  return (
    <AppwriteContext.Provider value={value}>
      {children}
    </AppwriteContext.Provider>
  );
}
