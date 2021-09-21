import { useEffect, useState } from "react";
import { getProfile } from "../lib/frontend/auth";

function useProfile() {
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    if (!profile) {
      (async () => {
        const response = await getProfile();
        if (response?.status) {
          setProfile(response.data);
        }
      })();
    }
  }, []);

  return [profile];
}

export default useProfile;
