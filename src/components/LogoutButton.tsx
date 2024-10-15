"use client";

import { logout } from "@/actions/auth";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logout();
  };

  return <button onClick={handleLogout}>Odjavi se</button>;
};

export default LogoutButton;
