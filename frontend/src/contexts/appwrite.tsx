import { Client } from "appwrite";
import { createContext, PropsWithChildren } from "react";
import { lang } from "../services/lang";

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
    .setProject("67bbdbe0003db9b80f07")
    .setLocale(lang);

  const value = {
    client,
  };

  return (
    <AppwriteContext.Provider value={value}>
      {children}
    </AppwriteContext.Provider>
  );
}
