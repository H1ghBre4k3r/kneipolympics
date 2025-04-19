import { createContext, PropsWithChildren, useMemo } from "react";
import { useAppwrite } from "../hooks/useAppwrite";
import { ID, Models, Storage } from "appwrite";

const BUCKETS = {
  pictures: "67bbdbee001d0dac8c3a",
} as const;

type BUCKET_NAME = keyof typeof BUCKETS;

function convert(bucket: BUCKET_NAME): string {
  return BUCKETS[bucket];
}

export type StorageContextType = {
  create<BUCKET extends BUCKET_NAME>(
    bucket: BUCKET,
    file: File,
  ): Promise<Models.File>;
  getView<BUCKET extends BUCKET_NAME>(
    bucket: BUCKET,
    id: string,
  ): Promise<string>;
};

export const StorageContext = createContext<StorageContextType>(
  {} as StorageContextType,
);

export function StorageContextProvider({ children }: PropsWithChildren) {
  const { client } = useAppwrite();
  const storage = useMemo(() => new Storage(client), [client]);

  async function create<Bucket extends BUCKET_NAME>(
    bucket: Bucket,
    file: File,
  ): Promise<Models.File> {
    return storage.createFile(convert(bucket), ID.unique(), file);
  }

  async function getView<Bucket extends BUCKET_NAME>(
    bucket: Bucket,
    fileId: string,
  ): Promise<string> {
    return storage.getFileView(convert(bucket), fileId);
  }

  const value = {
    create,
    getView,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
