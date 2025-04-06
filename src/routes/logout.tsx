import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

export function LogoutRoute() {
  const auth = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    auth
      .logout()
      .then(() => nav("/"))
      .catch((e) => {
        console.error(e);
        nav("/");
      });
  }, [auth, nav]);
  return <></>;
}
