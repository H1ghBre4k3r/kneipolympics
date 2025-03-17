import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { AppwriteException } from "appwrite";

export function RegisterRoute() {
  const auth = useAuth();

  const [err, setErr] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    auth
      .register(email, password, username, token)
      .then(() => {
        setMessage(
          "Registration successful! Check you mail (and spam folder)!",
        );
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
      <h3>Register</h3>
      {err && <span className="error">{err}</span>}
      {message && <span className="success">{message}</span>}
      <label>
        Username
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
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
      <label>
        Token
        <input
          type="text"
          name="token"
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </label>
      <button>Register</button>
      <Link to="/login">Already Got Account?</Link>
    </form>
  );
}
