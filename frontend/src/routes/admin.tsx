import { useAdmin } from "../hooks/useAdmin";

export function AdminRoute() {
  const { users } = useAdmin();

  return (
    <>
      <h3>Admin</h3>
      <ul>
        {users.map((user) => {
          const { prefs, name } = user;
          const { firstName, lastName, phone } = prefs;

          return (
            <li>
              {name}, {firstName}, {lastName}, {phone}
            </li>
          );
        })}
      </ul>
    </>
  );
}
