import { BiCameraMovie, BiHeart } from "react-icons/bi";
import { MdOutlineExplore, MdSettings } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { cls } from "../libs/utils";

export default function TabBar() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const className = ({ isActive }: { isActive: boolean }) =>
    cls(
      "flex items-center justify-center",
      isActive
        ? "text-black dark:text-white"
        : "text-gray-400 dark:text-gray-500"
    );

  return (
    <nav className="h-16 bg-white border-t-[1px] dark:border-t-0 dark:bg-black fixed w-full left-0 bottom-0 z-[998] text-3xl">
      <div className="grid grid-cols-4 h-full max-w-screen-lg mx-auto">
        <NavLink to="/" className={className} onClick={scrollToTop}>
          <BiCameraMovie />
        </NavLink>
        <NavLink to="/explore" className={className} onClick={scrollToTop}>
          <MdOutlineExplore />
        </NavLink>
        <NavLink to="/favorites" className={className} onClick={scrollToTop}>
          <BiHeart />
        </NavLink>
        <NavLink to="/settings" className={className} onClick={scrollToTop}>
          <MdSettings />
        </NavLink>
      </div>
    </nav>
  );
}
