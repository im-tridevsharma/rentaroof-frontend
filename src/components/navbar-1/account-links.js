import Link from "next/link";
import { FiUser, FiLogIn } from "react-icons/fi";
import { logoutUser, removeAuthToken } from "../../lib/authentication";
import { useRouter } from "next/router";

const AccountLinks = () => {
  const router = useRouter();

  const items = [
    {
      url: "/admin/profile",
      icon: <FiUser size={18} className="stroke-current" />,
      name: "Profile",
      badge: null,
    },
    {
      url: "/admin/logout",
      icon: <FiLogIn size={18} className="stroke-current" />,
      name: "Logout",
      badge: null,
    },
  ];

  const endSession = async () => {
    const response = await logoutUser();
    if (response?.success) {
      removeAuthToken();
      localStorage.removeItem("LA");
      router.push("/admin");
    } else {
      console.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <ul className="list-none">
        {items.map((item, i) => (
          <li key={i} className="dropdown-item">
            {item.url === "/admin/logout" ? (
              <button
                onClick={endSession}
                className="flex flex-row items-center justify-start h-10 w-full px-2"
              >
                {item.icon}
                <span className="mx-2">{item.name}</span>
                {item.badge && (
                  <span
                    className={`uppercase font-bold inline-flex text-center p-0 leading-none text-2xs h-4 w-4 inline-flex items-center justify-center rounded-full ${item.badge.color} ml-auto`}
                  >
                    {item.badge.number}
                  </span>
                )}
              </button>
            ) : (
              <Link href={item.url}>
                <a className="flex flex-row items-center justify-start h-10 w-full px-2">
                  {item.icon}
                  <span className="mx-2">{item.name}</span>
                  {item.badge && (
                    <span
                      className={`uppercase font-bold inline-flex text-center p-0 leading-none text-2xs h-4 w-4 inline-flex items-center justify-center rounded-full ${item.badge.color} ml-auto`}
                    >
                      {item.badge.number}
                    </span>
                  )}
                </a>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountLinks;
