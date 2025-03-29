import { Models } from "appwrite";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useFunctions } from "../hooks/useFunctions";
import { useAuth } from "../hooks/useAuth";
import { can } from "../services/permissions";

export type User = Models.User<Models.Preferences & Prefs>;

export type AdminContextType = {
  users: User[];
  isAdmin: boolean;
};

export const AdminContext = createContext<AdminContextType>(
  {} as AdminContextType,
);

export function AdminContextProvider({ children }: PropsWithChildren) {
  const functions = useFunctions();
  const { user } = useAuth();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (can("getUsers", user?.labels)) {
      functions
        .getUsers()
        .then((response) => setUsers(response as User[]))
        .catch(console.error);
    }
  }, [functions, user]);

  const value: AdminContextType = {
    users,
    isAdmin: user?.labels.includes("admin") ?? false,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
