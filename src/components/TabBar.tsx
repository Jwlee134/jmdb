import { BiCameraMovie, BiSearch } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { cls } from "../libs/utils";

export default function TabBar() {
  return (
    <nav className="h-16 bg-black fixed w-full max-w-[inherit] bottom-0 z-[998] text-3xl grid grid-cols-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          cls(
            "flex items-center justify-center",
            isActive ? "text-white" : "text-gray-500"
          )
        }
      >
        <BiCameraMovie />
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) =>
          cls(
            "flex items-center justify-center",
            isActive ? "text-white" : "text-gray-500"
          )
        }
      >
        <BiSearch />
      </NavLink>
    </nav>
  );
}
