import { Modal } from "./modal";

type DialogProps = {
  open?: boolean;
};

export function LoginDialog({ open }: DialogProps) {
  return (
    <Modal title="Login" open={open}>
      <form>
        <label>
          Username
          <input type="text" />
        </label>
        <label>
          Password
          <input type="text" />
        </label>
        <button>Login</button>
      </form>
    </Modal>
  );
}

export function RegistrationDialog({ open }: DialogProps) {
  return (
    <Modal title="Register" open={open}>
      <form>
        <label>
          Username
          <input type="text" />
        </label>
        <label>
          Password
          <input type="text" />
        </label>
        <button>Register</button>
      </form>
    </Modal>
  );
}
