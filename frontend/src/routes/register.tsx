import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { AppwriteException } from "appwrite";
import { useParam } from "../hooks/useParam";

export function RegisterRoute() {
  const auth = useAuth();

  const presentToken = useParam("token");

  const [err, setErr] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(presentToken ?? "");
  const [smoker, setSmoker] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    auth
      .register({
        email,
        password,
        firstName,
        lastName,
        username,
        phone,
        token,
        smoker,
      })
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
          required
        />
      </label>
      <label>
        First Name
        <input
          type="text"
          name="first-name"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          name="last-name"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
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
          required
        />
      </label>
      <label>
        Phone Number
        <input
          type="tel"
          name="phone-number"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
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
          required
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
          required
        />
      </label>
      <label>
        <input
          type="checkbox"
          name="smoker"
          checked={smoker}
          onChange={(e) => setSmoker(e.target.checked)}
        />
        Are Smoking Bars OK?
      </label>
      <button>Register</button>
      <Link to="/login">Already Got Account?</Link>
    </form>
  );
}
