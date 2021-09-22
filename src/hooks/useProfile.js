import { useEffect, useState } from "react";
import { getProfile, removeAuthToken } from "../lib/frontend/auth";

function useProfile() {
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    if (!profile) {
      (async () => {
        const response = await getProfile();
        if (response?.status) {
          setProfile(response.data);
        } else {
          removeAuthToken.then(() => {
            console.log("Something went wrong!");
          });
        }
      })();
    }
  }, []);

  return [profile];
}

export default useProfile;
