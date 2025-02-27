import { Modal } from "./modal";

type LoginDialogProps = {
  open?: boolean;
};

export function LoginDialog({ open }: LoginDialogProps) {
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
