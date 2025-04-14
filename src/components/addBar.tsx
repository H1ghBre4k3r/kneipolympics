import { FormEvent, useEffect, useRef, useState } from "react";
import { useLabels } from "../hooks/useLabels";
import { IoClose } from "react-icons/io5";

type AddBarDialogProps = {
  open?: boolean;
  close?: () => void;
  submit?: (bar: Omit<Bar, "$id">) => void;
};
export function AddBarDialog({ open, submit, close }: AddBarDialogProps) {
  const l = useLabels();

  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [task, setTask] = useState("");
  const [needsSubmission, setNeedsSubmission] = useState(true);
  const [needsPicture, setNeedsPicture] = useState(false);

  function reset() {
    setName("");
    setAddress("");
    setTask("");
    setNeedsPicture(false);
  }

  function onClose() {
    close?.();
    reset();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    submit?.({
      name,
      address,
      task,
      needs_submission: needsSubmission,
      needs_picture: needsPicture,
    });
    close?.();

    reset();
  }

  return (
    <dialog ref={ref} className="new-bar">
      <form onSubmit={onSubmit}>
        <div className="header">
          <h3>New Bar</h3>
          <button className="large borderless" type="button" onClick={onClose}>
            <IoClose />
          </button>
        </div>
        <label>
          {l("name")}
          <input
            type="text"
            name="name"
            placeholder={l("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          {l("address")}
          <input
            type="text"
            name="address"
            placeholder={l("address")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          {l("task")}
          <input
            type="text"
            name="task"
            placeholder={l("task")}
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </label>
        <label>
          {l("needsSubmission")}
          <input
            type="checkbox"
            name="needsSubmission"
            checked={needsSubmission}
            onClick={() =>
              setNeedsSubmission((wasNeeded) => {
                if (wasNeeded) {
                  setNeedsPicture(false);
                }
                return !wasNeeded;
              })
            }
          />
        </label>
        <label>
          {l("needsPicture")}
          <input
            type="checkbox"
            name="needsPicture"
            checked={needsSubmission && needsPicture}
            onClick={() => setNeedsPicture((mode) => needsSubmission && !mode)}
            disabled={!needsSubmission}
          />
        </label>
        <button>Submit</button>
      </form>
    </dialog>
  );
}
