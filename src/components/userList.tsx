import { useAdmin } from "../hooks/useAdmin";
import { UserListEntry } from "./userListEntry";

export function UserList() {
  const { users } = useAdmin();

  return (
    <section id="user-list" className="content">
      <div className="header">
        <h4>Users</h4>
      </div>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.$id}>
              <UserListEntry user={user} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
