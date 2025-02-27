import { useState } from "react";
import { CiBeerMugFull } from "react-icons/ci";
import { LoginDialog } from "./login-dialog";

export function ProfileFlyout() {
  const [open, setOpen] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);

  function toggle() {
    setLoginOpen(false);
    setOpen((open) => !open);
  }

  function onClickLogin() {
    setLoginOpen(true);
    setOpen(false);
  }

  return (
    <>
      <div id="profile-flyout">
        <button onClick={toggle}>
          <CiBeerMugFull />
        </button>
        <aside hidden={!open}>
          <ul>
            <li>
              <button onClick={onClickLogin}>Login</button>
            </li>
            <li>
              <button>Register</button>
            </li>
          </ul>
        </aside>
      </div>
      <LoginDialog open={loginOpen} />
    </>
  );
}
