import { IoClose } from "react-icons/io5";
import { PropsWithChildren, useEffect, useRef } from "react";

type ModalProps = PropsWithChildren<{
  title?: string;
  open?: boolean;
}>;

export function Modal({ title, children, open }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => ref.current?.showModal(), 0);
    } else {
      setTimeout(() => ref.current?.close(), 0);
    }
  }, [open]);

  function closeModal() {
    ref.current?.close();
  }

  return (
    <dialog ref={ref}>
      <button className="close-button" onClick={closeModal}>
        <IoClose />
      </button>
      {title && <h3>{title}</h3>}
      {children}
    </dialog>
  );
}
