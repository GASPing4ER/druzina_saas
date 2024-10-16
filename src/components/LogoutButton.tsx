"use client";

import { logout } from "@/actions/auth";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <button className="text-sm text-left" onClick={handleLogout}>
      Odjavi se
    </button>
  );
};

export default LogoutButton;
