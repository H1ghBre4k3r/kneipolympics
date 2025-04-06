import { createContext, PropsWithChildren, useMemo } from "react";
import { useAppwrite } from "../hooks/useAppwrite";
import { Databases, ID } from "appwrite";

const KNEIPOLMYPICS_DB = "67e4985c00379c9bb294";

type Documents = {
  bars: Bar;
  routes: unknown;
};

type DocumentName = keyof Documents;

type DocumentConversionMap = {
  [key in DocumentName]: string;
};

const documentConverstionMap: DocumentConversionMap = {
  bars: "67e498630028469bd350",
  routes: "67e9c183002422411dbd",
};

export type DatabaseContextType = {
  databases: Databases;
  create<Document extends DocumentName>(
    document: Document,
    payload: Partial<Documents[Document]>,
  ): Promise<void>;
  getAll: <Name extends DocumentName>(
    document: Name,
  ) => Promise<Documents[Name][]>;
  get: <Name extends DocumentName>(
    document: Name,
    id: string,
  ) => Promise<Documents[Name]>;
  deleteEntry: <Name extends DocumentName>(
    document: Name,
    id: string,
  ) => Promise<void>;
  update: <Name extends DocumentName>(
    document: Name,
    id: string,
    payload: Partial<Documents[Name]>,
  ) => Promise<void>;
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

  async function create<Document extends DocumentName>(
    document: Document,
    payload: Partial<Documents[Document]>,
  ): Promise<void> {
    await databases.createDocument(
      KNEIPOLMYPICS_DB,
      convertDocument(document),
      ID.unique(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      payload as any,
    );
  }

  async function getAll<Document extends DocumentName>(
    document: Document,
  ): Promise<Documents[Document][]> {
    const result = await databases.listDocuments(
      KNEIPOLMYPICS_DB,
      convertDocument(document),
    );

    return result.documents as unknown as Documents[Document][];
  }

  async function get<Document extends DocumentName>(
    document: Document,
    id: string,
  ): Promise<Documents[Document]> {
    const result = await databases.getDocument(
      KNEIPOLMYPICS_DB,
      convertDocument(document),
      id,
    );

    return result as unknown as Documents[Document];
  }

  async function deleteEntry<Document extends DocumentName>(
    document: Document,
    id: string,
  ): Promise<void> {
    await databases.deleteDocument(
      KNEIPOLMYPICS_DB,
      convertDocument(document),
      id,
    );
  }

  async function update<Document extends DocumentName>(
    document: Document,
    id: string,
    payload: Partial<Documents[Document]>,
  ): Promise<void> {
    await databases.updateDocument(
      KNEIPOLMYPICS_DB,
      convertDocument(document),
      id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      payload as any,
    );
  }

  const value: DatabaseContextType = {
    databases,
    create,
    getAll,
    get,
    update,
    deleteEntry,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
