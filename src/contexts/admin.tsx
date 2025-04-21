import { Models } from "appwrite";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useFunctions } from "../hooks/useFunctions";
import { useAuth } from "../hooks/useAuth";
import { can } from "../services/permissions";

export type User = Models.User<Models.Preferences & Prefs>;

export type AdminContextType = {
  users: User[];
  // TODO: this should probably be done in the component
  contestants: User[];
  nonContestants: User[];
  isAdmin: boolean;
};

export const AdminContext = createContext<AdminContextType>(
  {} as AdminContextType,
);

export function AdminContextProvider({ children }: PropsWithChildren) {
  const functions = useFunctions();
  const { user } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [contestants, setContestants] = useState<User[]>([]);
  const [nonContestants, setNonContestants] = useState<User[]>([]);

  useEffect(() => {
    if (can("getUsers", user?.labels)) {
      functions
        .getUsers()
        .then((response) => setUsers(response as User[]))
        .catch(console.error);
    }
  }, [functions, user]);

  useEffect(() => {
    const contestants = users.filter((user) => user.prefs["joined"] == "true");
    const nonContestants = users.filter(
      (user) => user.prefs["joined"] != "true",
    );

    setContestants(contestants);
    setNonContestants(nonContestants);
  }, [users]);

  const value: AdminContextType = {
    users,
    contestants,
    nonContestants,
    isAdmin: user?.labels.includes("admin") ?? false,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
