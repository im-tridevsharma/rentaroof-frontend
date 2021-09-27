import { useEffect, useState } from "react";
import { __d } from "../server";

function useProfile() {
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    if (!profile) {
      let data = localStorage.getItem("LU");
      data = JSON.parse(__d(data));
      if (data) {
        setProfile(data);
      }
    }
  }, []);

  return [profile];
}

export default useProfile;
