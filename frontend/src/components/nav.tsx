import { Link, useLocation } from "react-router";
import { useAdmin } from "../hooks/useAdmin";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { useLabels } from "../hooks/useLabels";

export function Nav() {
  const l = useLabels();

  const { isAdmin } = useAdmin();
  const { loggedIn } = useAuth();

  const { pathname: p } = useLocation();

  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <nav>
      <div className="header">
        <h2>Navigation</h2>
        <button onClick={() => setOpen((open) => !open)}>
          {open ? <IoClose /> : <IoMenu />}
        </button>
      </div>
      <ul aria-hidden={!open}>
        <li>
          <Link
            to="/"
            aria-current={p === "/" ? "page" : "false"}
            onClick={close}
          >
            <h3>Home</h3>
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link
              to="/admin"
              aria-current={p === "/admin" ? "page" : "false"}
              onClick={close}
            >
              <h3>Admin</h3>
            </Link>
          </li>
        )}
        {loggedIn ? (
          <>
            <li>
              <Link
                to="/info"
                aria-current={p === "/info" ? "page" : "false"}
                onClick={close}
              >
                <h3>{l("infoAndRegistration")}</h3>
              </Link>
            </li>
            <li>
              <Link
                to="/current"
                aria-current={p === "/current" ? "page" : "false"}
                onClick={close}
              >
                <h3>{l("currentGame")}</h3>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                aria-current={p === "/login" ? "page" : "false"}
                onClick={close}
              >
                <h3>{l("login")}</h3>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                aria-current={p === "/register" ? "page" : "false"}
                onClick={close}
              >
                <h3>{l("register")}</h3>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
