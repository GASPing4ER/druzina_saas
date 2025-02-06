import { getUser } from "@/actions/auth";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userResponse = await getUser();
      console.log("user response:", userResponse);
      setUser(userResponse);
    };
    fetchUser();
  }, []);

  return user;
};
