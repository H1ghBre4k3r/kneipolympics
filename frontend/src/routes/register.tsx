import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { AppwriteException } from "appwrite";

export function RegisterRoute() {
  const auth = useAuth();
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    auth
      .register(email, password, username)
      .then(() => nav("/"))
      .catch((e: AppwriteException | unknown) => {
        if (e instanceof AppwriteException) {
          // setErr(e.message);
        }
        console.error(e);
      });
  }
  return (
    <form onSubmit={onSubmit}>
      <h3>Register</h3>
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
      <button>Register</button>
      <Link to="/login">Already Got Account?</Link>
    </form>
  );
}
