import { FaCaretDown, FaCaretRight } from "react-icons/fa6";
import { useLabels } from "../hooks/useLabels";
import { User } from "../contexts/admin";

type Props = { user: User };

export function UserListEntry({ user }: Props) {
  const l = useLabels();

  const { prefs, name, email } = user;
  const { firstName, lastName, joined, phone } = prefs;
  return (
    <details className="user-list-entry">
      <summary>
        <span className="name">
          <span className="closed">
            <FaCaretRight />
          </span>
          <span className="open">
            <FaCaretDown />
          </span>
          {firstName} {lastName}
        </span>
        <span className={`joined ${joined ?? "false"}`}>
          {joined === "true" ? "In" : "Out"}
        </span>
      </summary>
      <div>
        <div>
          <b>{l("username")}</b> {name}
        </div>
        <div>
          <b>{l("phone")}</b> <a href={`tel:${phone}`}>{phone}</a>
        </div>
        <div>
          <b>{l("email")}</b> <a href={`mailto:${email}`}>{email}</a>
        </div>
      </div>
    </details>
  );
}
