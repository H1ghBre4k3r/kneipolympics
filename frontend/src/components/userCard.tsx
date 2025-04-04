import { useLabels } from "../hooks/useLabels";

type UserCardProps = { name: string; email: string; prefs: Prefs };

export function UserCard({ name, prefs, email }: UserCardProps) {
  const l = useLabels();

  const { phone } = prefs;
  return (
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
  );
}
