import { useState } from "react";
import { CiBeerMugFull } from "react-icons/ci";
import { LoginDialog, RegistrationDialog } from "./login-dialog";

export function ProfileFlyout() {
  const [open, setOpen] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);

  function toggle() {
    setLoginOpen(false);
    setRegistrationOpen(false);
    setOpen((open) => !open);
  }

  function onClickLogin() {
    setOpen(false);
    setLoginOpen(true);
    setRegistrationOpen(false);
  }

  function onClickRegister() {
    setOpen(false);
    setLoginOpen(false);
    setRegistrationOpen(true);
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
              <button onClick={onClickRegister}>Register</button>
            </li>
          </ul>
        </aside>
      </div>
      <LoginDialog open={loginOpen} />
      <RegistrationDialog open={registrationOpen} />
    </>
  );
}
