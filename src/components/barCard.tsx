import { useState } from "react";
import { LabelElement } from "./labelElement";
import { useDatabase } from "../hooks/useDatabase";

type BarCardProps = {
  bar: Bar;
};

export function BarCard({ bar }: BarCardProps) {
  const { update, deleteEntry } = useDatabase();

  const [name, setName] = useState(bar.name);
  const [address, setAddress] = useState(bar.address);
  const [task, setTask] = useState(bar.task);
  const [needs_picture, setNeedsPicture] = useState(bar.needs_picture);

  const [editMode, setEditMode] = useState(false);

  function save() {
    setEditMode(false);
    update("bars", bar.$id, {
      name,
      address,
      task,
      needs_picture,
    })
      .then(() => console.log("updated"))
      .catch(console.error);
  }

  function deleteBar() {
    deleteEntry("bars", bar.$id)
      .then(() => location.reload())
      .catch(console.error);
  }

  function abort() {
    setEditMode(false);
    setName(bar.name);
    setAddress(bar.address);
    setTask(bar.task);
    setNeedsPicture(bar.needs_picture);
  }

  return (
    <details className="bar">
      <summary>
        <span>
          <LabelElement value={name} onChange={setName} readonly={!editMode} />
        </span>
      </summary>
      <div>
        <b>Addresse: </b>{" "}
        <LabelElement
          value={address}
          onChange={setAddress}
          readonly={!editMode}
        />
      </div>
      <div>
        <b>Task: </b>
        <LabelElement value={task} onChange={setTask} readonly={!editMode} />
      </div>
      <div>
        <b>Needs Picture: </b>
        <input
          type="checkbox"
          checked={needs_picture}
          disabled={!editMode}
          onClick={() => setNeedsPicture((s) => !s)}
        />
      </div>
      <div className="button-row">
        {editMode ? (
          <>
            <button className="small save" onClick={save}>
              Save
            </button>
            <button className="small" onClick={abort}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="small" onClick={() => setEditMode(true)}>
              Edit
            </button>
            <button className="small delete" onClick={deleteBar}>
              Delete
            </button>
          </>
        )}
      </div>
    </details>
  );
}
