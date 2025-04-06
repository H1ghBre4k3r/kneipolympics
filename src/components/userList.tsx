import { useAdmin } from "../hooks/useAdmin";
import { UserCard } from "../components/userCard";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

export function UserList() {
  const { users } = useAdmin();

  return (
    <section id="users">
      <details>
        <summary className="header">
          <h4>
            <span className="closed">
              <FaCaretRight />
            </span>
            <span className="open">
              <FaCaretDown />
            </span>
            Users
          </h4>
        </summary>
        <ul>
          {users.map((user) => {
            const { prefs, name, email } = user;
            const { firstName, lastName, joined } = prefs;

            return (
              <li>
                <details>
                  <summary>
                    <span className="name">
                      {firstName} {lastName}
                    </span>
                    <span className={`joined ${joined ?? "false"}`}>
                      {joined === "true" ? "In" : "Out"}
                    </span>
                  </summary>
                  <UserCard name={name} email={email} prefs={prefs as Prefs} />
                </details>
              </li>
            );
          })}
        </ul>
      </details>
    </section>
  );
}
