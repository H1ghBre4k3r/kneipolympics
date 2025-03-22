import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AppwriteException } from "appwrite";
import { Link, useNavigate } from "react-router";

export function LoginRoute() {
  const auth = useAuth();
  const nav = useNavigate();

  const [err, setErr] = useState<string | undefined>(undefined);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    auth
      .login(email, password)
      .then(() => nav("/"))
      .catch((e: AppwriteException | unknown) => {
        if (e instanceof AppwriteException) {
          setErr(e.message);
        }
        console.error(e);
      });
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>Login</h3>
      {err && <span className="error">{err}</span>}
      <label>
        E-Mail
        <input
          type="email"
          name="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button>Login</button>
      <Link to="/recovery">Forgot your password?</Link>
      <Link to="/register">No Account?</Link>
    </form>
  );
}
