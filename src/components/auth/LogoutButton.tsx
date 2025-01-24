"use client";

import { logout } from "@/actions/auth";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <button className="text-sm underline cursor-pointer" onClick={handleLogout}>
      Odjava
    </button>
  );
};

export default LogoutButton;
