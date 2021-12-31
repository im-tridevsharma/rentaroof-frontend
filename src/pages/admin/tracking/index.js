import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  useLoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { getUsersForMap } from "../../../lib/users";
import Loader from "../../../components/loader";

function Index() {
  const [mapObj, setMapObj] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [center, setCenter] = useState(false);
  const [hoveredUser, setHoveredUser] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.MAP_API_KEY, // Add your API key
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  React.useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const res = await getUsersForMap();
      if (res?.status) {
        setIsLoading(false);
        setUsers(res?.data);
        setFilteredUsers(res?.data);
        if (isLoaded && mapObj) handleOnLoad(mapObj);
      } else {
        setIsLoading(false);
        console.log(res?.messagee);
      }
    };

    fetchUsers();
  }, []);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    setMapObj(map);
    const bounds = new window.google.maps.LatLngBounds();
    users?.length > 0 &&
      users.forEach((user) => {
        if (user?.address) {
          bounds.extend({
            lat: parseFloat(user?.address?.lat || 0),
            lng: parseFloat(user?.address?.long || 0),
          });
        }
      });
    map.fitBounds(bounds);
  };

  const filterUsers = (e) => {
    setIsSearching(true);
    if(e.target.value){
      const value = e.target.value.toLowerCase();
      setFilteredUsers(
        users.filter(
          (u) =>
            u.first?.toLowerCase().includes(value) ||
            u.last?.toLowerCase().includes(value) ||
            u.email?.toLowerCase().includes(value) ||
            u.mobile?.toLowerCase().includes(value) ||
            u.system_userid?.toLowerCase().includes(value) || 
            u.role?.toLowerCase().includes(value)
        )
      );
    }else{
      setIsSearching(false);
      setHoveredUser(null)
    }
  }

  return (
    <div className="flex items-center flex-col">
      {isLoading && <Loader />}
      {/**search bar */}
      <div className="max-w-3xl w-full mb-3">
        <input
          type="text"
          onChange={(e) => filterUsers(e)}
          className="w-full form-input border rounded-md border-gray-200"
          placeholder="Search Tenant/Ibo/Landlord..."
        />
        {/**searched users */}
        {isSearching && (
          <div className="z-40 w-full">
            {filteredUsers?.length > 0 ? (
              filteredUsers.map((u, i) => (
                <div
                  onClick={() => {setHoveredUser(u?.id); setIsSearching(false)}}
                  className="py-1 hover:bg-white flex items-center px-3 border cursor-pointer mt-1 rounded-md"
                  key={i}
                >
                  <img
                    src={u?.profile_pic || "/images/website/no_photo.png"}
                    className="h-14 w-14 rounded-full object-contain"
                  />
                  <div className="ml-5">
                    <h6>
                      {u?.first + " " + u?.last}
                      <span className="text-xs ml-3"> - {u?.role}</span>
                    </h6>
                    <p>{u?.system_userid}</p>
                    <p>{u?.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-red-400">No Users found!</p>
            )}
          </div>
        )}
      </div>
      <div className="w-full bg-gray-50 rounded-sm h-128">
        {isLoaded && (users?.length > 0 || center) && (
          <GoogleMap
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            {users.map((user) => (
              <Marker
                key={user.id}
                position={{
                  lat: parseFloat(user?.address?.lat),
                  lng: parseFloat(user?.address?.long),
                }}
                onClick={() => handleActiveMarker(user.id)}
                icon="/icons/ibo_icons/marker.png"
                animation={hoveredUser === user?.id ? 1 : null}
              >
                {activeMarker === user.id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div className="p-1 flex items-center justify-center flex-col">
                      <img
                        src={
                          user?.profile_pic || "/images/website/no_photo.png"
                        }
                        className="w-20 h-20 object-contain rounded-full mb-2"
                      />
                      <b className="uppercase mb-1">{user?.role}</b>
                      <b className="flex items-center my-1">
                        {user?.first + " " + user?.last}{" "}
                        <span
                          className={`ml-3 w-3 h-3 rounded-full ${
                            user?.is_logged_in ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></span>
                      </b>
                      <p className="mb-2">{user?.email}</p>
                    </div>
                  </InfoWindow>
                ) : null}
              </Marker>
            ))}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Index), { ssr: false });
