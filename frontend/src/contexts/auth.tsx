import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppwrite } from "../hooks/useAppwrite";
import { Account, AppwriteException, ID, Models } from "appwrite";

export type AuthContextValue = {
  session?: Models.Session;
  user?: Models.User<Models.Preferences>;
  loggedIn: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  register(email: string, password: string, name: string): Promise<void>;
};

export const AuthContext = createContext({} as AuthContextValue);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const { client } = useAppwrite();
  const account = useMemo(() => new Account(client), [client]);

  const [session, setSession] = useState<Models.Session | undefined>();
  const [user, setUser] = useState<
    Models.User<Models.Preferences> | undefined
  >();

  const verifyUser = useCallback(async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");
    const secret = params.get("secret");

    if (!(userId && secret)) {
      return;
    }

    await account.updateVerification(userId, secret).catch(() => {});
  }, [account]);

  useEffect(() => {
    verifyUser();

    account
      .getSession("current")
      .then((session) => {
        account
          .get()
          .then((user) => {
            setSession(session);
            setUser(user);
          })
          .catch(() => account.deleteSession("current"));
      })
      .catch(() => {});
  }, [account, verifyUser]);

  async function login(email: string, password: string): Promise<void> {
    const session = await account.createEmailPasswordSession(email, password);

    account
      .get()
      .then((user) => {
        if (!user.emailVerification) {
          throw new AppwriteException(
            "Please verify your email before logging in!",
          );
        }
        setSession(session);
        setUser(user);
      })
      .catch(() => account.deleteSession("current"));
  }

  async function logout(): Promise<void> {
    try {
      await account.deleteSession("current");
      setSession(undefined);
      setUser(undefined);
    } catch (e) {
      console.error(e);
    }
  }

  async function register(
    email: string,
    password: string,
    name: string,
  ): Promise<void> {
    await account.create(ID.unique(), email, password, name);
    await account.createEmailPasswordSession(email, password);
    await account.createVerification(window.location.origin.toString());
    await account.deleteSession("current");
  }

  const value = {
    login,
    logout,
    register,
    session,
    user,
    loggedIn: !!(session && user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
