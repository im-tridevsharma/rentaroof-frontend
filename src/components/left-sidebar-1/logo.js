import { useSelector, shallowEqual } from "react-redux";
import Link from "next/link";

const Logo = () => {
  const { leftSidebar } = useSelector(
    (state) => ({
      config: state.config,
      leftSidebar: state.leftSidebar,
    }),
    shallowEqual
  );
  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

  const { showLogo } = { ...leftSidebar };
  if (showLogo) {
    return (
      <div className="truncate p-2 sticky top-0 bg-white z-40">
        <Link href="/admin/dashboard">
          <a
            className="flex items-center justify-center p-2 bg-white"
            style={{ height: "52px" }}
          >
            <img
              src={website?.logo || "/images/website/no_photo.png"}
              alt="logo"
              className="h-20 w-20 object-contain"
            />
          </a>
        </Link>
      </div>
    );
  }
  return null;
};

export default Logo;
