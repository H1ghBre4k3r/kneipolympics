import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AppwriteException } from "appwrite";
import { useParam } from "../hooks/useParam";
import { Link } from "react-router";

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

  const [err, setErr] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    auth
      .sendRecoveryEmail(email)
      .then(() => {
        setMessage("Recovery E-Mail send! Check you mail (and spam folder)!");
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
      <span>
        Enter your E-Mail address to receive an E-Mail with a link to recover
        your account.
      </span>
      <label>
        E-Mail
        <input
          type="email"
          name="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button>Submit</button>
      <Link to="/login">Login</Link>
    </form>
  );
}

type NewPasswordFormParams = {
  secret: string;
  userId: string;
};

function NewPasswordForm({ secret, userId }: NewPasswordFormParams) {
  const auth = useAuth();

  const [err, setErr] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const [password, setPassword] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    auth
      .setRecoveredPassword(userId, secret, password)
      .then(() => {
        setMessage("Password updated successfully! You can now log in!");
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
      <span>Please enter your new password.</span>
      <label>
        New Password
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button>Submit</button>
      <Link to="/login">Login</Link>
    </form>
  );
}
