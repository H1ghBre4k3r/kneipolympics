import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppwrite } from "../hooks/useAppwrite";
import { Account, AppwriteException, Models } from "appwrite";
import { useFunctions } from "../hooks/useFunctions";
import { RegisterPayload } from "./functions";

export type AuthContextValue = {
  session?: Models.Session;
  user?: Models.User<Models.Preferences>;
  loggedIn: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  register(payload: RegisterPayload): Promise<void>;
  authMessage: Maybe<string>;
};

export const AuthContext = createContext({} as AuthContextValue);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const { client } = useAppwrite();
  const functions = useFunctions();

  const [authMessage, setAuthMessage] = useState<Maybe<string>>(undefined);

  const account = useMemo(() => new Account(client), [client]);

  const [session, setSession] = useState<Maybe<Models.Session>>();
  const [user, setUser] = useState<Maybe<Models.User<Models.Preferences>>>();

  const verifyUser = useCallback(async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");
    const secret = params.get("secret");

    if (!(userId && secret)) {
      return;
    }

    try {
      await account.updateVerification(userId, secret);
      setAuthMessage("Account verified successully!");
      setTimeout(() => setAuthMessage(undefined), 5000);
    } catch (e) {
      console.error(e);
    }
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

    try {
      const user = await account.get();
      if (!user.emailVerification) {
        throw new AppwriteException(
          "Please verify your email before logging in!",
        );
      }
      setSession(session);
      setUser(user);
    } catch (e) {
      account.deleteSession("current");
      throw e;
    }
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

  async function sendVerificationEmail(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
    await account.createVerification(window.location.origin.toString());
    await account.deleteSession("current");
  }

  async function register(payload: RegisterPayload): Promise<void> {
    const result = await functions.register(payload);
    if (result.responseStatusCode !== 200) {
      throw new AppwriteException(
        "Registration failed! Either the credentials are already taken or the token is wrong!",
      );
    }

    const { email, password } = payload;
    await sendVerificationEmail(email, password);
  }

  const value = {
    login,
    logout,
    register,
    session,
    user,
    loggedIn: !!(session && user),
    authMessage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
