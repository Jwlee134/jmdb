import { BiCameraMovie, BiHeart } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { cls } from "../libs/utils";

export default function TabBar() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <nav className="h-16 bg-black fixed w-full max-w-[inherit] bottom-0 z-[998] text-3xl grid grid-cols-3">
      <NavLink
        to="/"
        className={({ isActive }) =>
          cls(
            "flex items-center justify-center",
            isActive ? "text-white" : "text-gray-500"
          )
        }
        onClick={scrollToTop}
      >
        <BiCameraMovie />
      </NavLink>
      <NavLink
        to="/explore"
        className={({ isActive }) =>
          cls(
            "flex items-center justify-center",
            isActive ? "text-white" : "text-gray-500"
          )
        }
        onClick={scrollToTop}
      >
        <MdOutlineExplore />
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          cls(
            "flex items-center justify-center",
            isActive ? "text-white" : "text-gray-500"
          )
        }
        onClick={scrollToTop}
      >
        <BiHeart />
      </NavLink>
    </nav>
  );
}
