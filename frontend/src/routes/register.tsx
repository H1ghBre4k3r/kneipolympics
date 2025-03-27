import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { AppwriteException } from "appwrite";
import { useParam } from "../hooks/useParam";
import { useLabels } from "../hooks/useLabels";

export function RegisterRoute() {
  const auth = useAuth();
  const l = useLabels();

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
        setMessage(l("registerSuccess"));
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
      <h3>{l("register")}</h3>
      <span className="warn">{l("registrationDisclaimer")}</span>
      {err && <span className="error">{err}</span>}
      {message && <span className="success">{message}</span>}
      <label>
        {l("username")}
        <input
          type="text"
          name="username"
          placeholder={l("username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        {l("firstName")}
        <input
          type="text"
          name="first-name"
          placeholder={l("firstName")}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        {l("lastName")}
        <input
          type="text"
          name="last-name"
          placeholder={l("lastName")}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
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
      <label>
        {l("phone")}
        <input
          type="tel"
          name="phone-number"
          placeholder={l("phone")}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
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
          required
        />
      </label>
      <label>
        {l("token")}
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
        {l("smoker")}
      </label>
      <button>{l("register")}</button>
      <Link to="/login">{l("alreadyGotAccount")}</Link>
    </form>
  );
}
