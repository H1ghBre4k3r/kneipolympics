import { createContext, PropsWithChildren, useMemo } from "react";
import { useAppwrite } from "../hooks/useAppwrite";
import { Databases } from "appwrite";

const KNEIPOLMYPICS_DB = "67e4985c00379c9bb294";

type Document = {
  bars: {
    name: string;
  };
};

type DocumentName = keyof Document;

type DocumentConversionMap = {
  [key in DocumentName]: string;
};

const documentConverstionMap: DocumentConversionMap = {
  bars: "67e498630028469bd350",
};

export type DatabaseContextType = {
  databases: Databases;
  getAll: <T>(document: DocumentName) => Promise<T[]>;
};

export const DatabaseContext = createContext<DatabaseContextType>(
  {} as DatabaseContextType,
);

function convertDocument(doc: DocumentName): string {
  return documentConverstionMap[doc];
}

export function DatabaseContextProvider({ children }: PropsWithChildren) {
  const { client } = useAppwrite();

  const databases = useMemo(() => new Databases(client), [client]);

  async function getAll<T>(document: DocumentName): Promise<T[]> {
    const result = await databases.listDocuments(
      KNEIPOLMYPICS_DB,
      convertDocument(document),
    );

    return result.documents as T[];
  }

  const value: DatabaseContextType = { databases, getAll };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
