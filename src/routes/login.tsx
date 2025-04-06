import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AppwriteException } from "appwrite";
import { Link, useNavigate } from "react-router";
import { useLabels } from "../hooks/useLabels";

export function LoginRoute() {
  const auth = useAuth();
  const nav = useNavigate();
  const l = useLabels();

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
      <h3>{l("login")}</h3>
      {err && <span className="error">{err}</span>}
      <label>
        {l("email")}
        <input
          type="email"
          name="email"
          placeholder={l("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        {l("password")}
        <input
          type="password"
          name="password"
          placeholder={l("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button>{l("login")}</button>
      <Link to="/recovery">{l("forgotYouPassword")}</Link>
      <Link to="/register">{l("noAccount")}</Link>
    </form>
  );
}
