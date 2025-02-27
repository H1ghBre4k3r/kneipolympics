import { ProfileFlyout } from "./profile-flyout";

export function Header() {
  return (
    <header>
      <section className="heading">
        <h1>Kneipolympics</h1>
      </section>
      <section className="profile">
        <ProfileFlyout />
      </section>
    </header>
  );
}
