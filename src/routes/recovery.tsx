import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AppwriteException } from "appwrite";
import { useParam } from "../hooks/useParam";
import { Link } from "react-router";
import { useLabels } from "../hooks/useLabels";

export function RecoveryRoute() {
  const secret = useParam("secret");
  const userId = useParam("userId");

  return secret && userId ? (
    <NewPasswordForm secret={secret} userId={userId} />
  ) : (
    <RecoveryRequestForm />
  );
}

function RecoveryRequestForm() {
  const auth = useAuth();
  const l = useLabels();

  const [err, setErr] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    auth
      .sendRecoveryEmail(email)
      .then(() => {
        setMessage(l("recoveryEmailSend"));
      })
      .catch((e: AppwriteException | unknown) => {
        if (e instanceof AppwriteException) {
          setErr(e.message);
        }
        console.error(e);
      });
  }
  return (
    <form onSubmit={onSubmit}>
      <h3>Recovery</h3>
      {err && <span className="error">{err}</span>}
      {message && <span className="success">{message}</span>}
      <span>{l("enterRecoveryEmail")}</span>
      <label>
        {l("email")}
        <input
          type="email"
          name="email"
          placeholder={l("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button>{l("submit")}</button>
      <Link to="/login">{l("login")}</Link>
    </form>
  );
}

type NewPasswordFormParams = {
  secret: string;
  userId: string;
};

function NewPasswordForm({ secret, userId }: NewPasswordFormParams) {
  const l = useLabels();
  const auth = useAuth();

  const [err, setErr] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const [password, setPassword] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    auth
      .setRecoveredPassword(userId, secret, password)
      .then(() => {
        setMessage(l("passwordUpdated"));
      })
      .catch((e: AppwriteException | unknown) => {
        if (e instanceof AppwriteException) {
          setErr(e.message);
        }
        console.error(e);
      });
  }
  return (
    <form onSubmit={onSubmit}>
      <h3>Recovery</h3>
      {err && <span className="error">{err}</span>}
      {message && <span className="success">{message}</span>}
      <span>{l("enterNewPassword")}</span>
      <label>
        {l("newPassword")}
        <input
          type="password"
          name="password"
          placeholder={l("newPassword")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button>{l("submit")}</button>
      <Link to="/login">{l("login")}</Link>
    </form>
  );
}
