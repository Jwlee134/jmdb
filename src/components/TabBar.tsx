import { BiCameraMovie, BiSearch } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { cls } from "../libs/utils";

export default function TabBar() {
  return (
    <nav className="h-16 fixed bottom-0 w-full backdrop-blur-3xl z-[998] grid grid-cols-2 place-items-stretch text-3xl">
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
