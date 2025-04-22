import { useState } from "react";
import { LabelElement } from "./labelElement";
import { useDatabase } from "../hooks/useDatabase";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";

type BarCardProps = {
  bar: Bar;
};

export function BarListEntry({ bar }: BarCardProps) {
  const { update, deleteEntry } = useDatabase();

  const [name, setName] = useState(bar.name);
  const [address, setAddress] = useState(bar.address);
  const [task, setTask] = useState(bar.task);
  const [needs_submission, setNeedsSubmission] = useState(bar.needs_submission);
  const [needs_picture, setNeedsPicture] = useState(bar.needs_picture);
  const [individual_points, setIndividualPoints] = useState(
    !!bar.individual_points,
  );

  const [editMode, setEditMode] = useState(false);

  function save() {
    setEditMode(false);
    update("bars", bar.$id, {
      name,
      address,
      task,
      needs_picture,
      needs_submission,
      individual_points,
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
    setIndividualPoints(bar.individual_points);
  }

  return (
    <details className="bar-list-entry">
      <summary>
        <span>
          <span className="closed">
            <FaCaretRight />
          </span>
          <span className="open">
            <FaCaretDown />
          </span>
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
        <b>Needs Submission: </b>
        <input
          type="checkbox"
          checked={needs_submission}
          disabled={!editMode}
          onClick={() =>
            setNeedsSubmission((wasNeeded) => {
              if (wasNeeded) {
                setNeedsPicture(false);
              }
              return !wasNeeded;
            })
          }
        />
      </div>
      <div>
        <b>Needs Picture: </b>
        <input
          type="checkbox"
          checked={needs_picture}
          disabled={!editMode || !needs_submission}
          onClick={() => setNeedsPicture((s) => !s)}
        />
      </div>
      <div>
        <b>Individual Points: </b>
        <input
          type="checkbox"
          checked={individual_points}
          disabled={!editMode}
          onClick={() => setIndividualPoints((s) => !s)}
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
