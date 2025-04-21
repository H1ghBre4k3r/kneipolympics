import { FormEvent, PropsWithChildren, RefObject } from "react";
import { IoClose } from "react-icons/io5";

type DialogProps = {
  header?: string;
  button?: string;
  onSubmit?: (e: FormEvent) => unknown;
  onClose?: () => unknown;
  ref?: RefObject<HTMLDialogElement | null>;
};

export function Dialog({
  header,
  ref,
  onSubmit,
  onClose,
  children,
}: PropsWithChildren<DialogProps>) {
  return (
    <dialog ref={ref} className="dialog">
      <form onSubmit={onSubmit}>
        <div className="header">
          <h3>{header}</h3>
          <button className="large borderless" type="button" onClick={onClose}>
            <IoClose />
          </button>
        </div>
        {children}
      </form>
    </dialog>
  );
}
