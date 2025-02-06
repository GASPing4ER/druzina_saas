import { getUser } from "@/actions/auth";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      const userResponse = await getUser();
      setUser(userResponse);
    };
    fetchUser();
  }, []);
  return user;
};
