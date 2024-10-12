"use client";

import { logout } from "@/utils/actions";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logout();
  };

  return <button onClick={handleLogout}>Odjavi se</button>;
};

export default LogoutButton;
