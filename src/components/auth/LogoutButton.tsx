"use client";

import { logout } from "@/actions/auth";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <button className="font-bold text-lg cursor-pointer" onClick={handleLogout}>
      ...
    </button>
  );
};

export default LogoutButton;
