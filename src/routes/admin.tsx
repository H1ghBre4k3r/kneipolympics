import { BarList } from "../components/barList";
import { UserList } from "../components/userList";

export function AdminRoute() {
  return (
    <section id="admin">
      <h3>Admin</h3>
      <UserList />
      <BarList />
    </section>
  );
}
