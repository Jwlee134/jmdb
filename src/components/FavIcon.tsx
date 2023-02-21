import { IoHeart } from "react-icons/io5";
import {
  animate,
  HTMLMotionProps,
  motion,
  useMotionValue,
} from "framer-motion";
import { cls } from "../libs/utils";
import useBoundStore from "../store";
import { shallow } from "zustand/shallow";
import HeaderBtn from "./HeaderBtn";
import { IMovie, IMovieDetail } from "../libs/api/types";

interface IProps extends HTMLMotionProps<"div"> {
  details: IMovieDetail | IMovie;
  transparent?: boolean;
  containerClassName?: string;
}

function useIsFav(id: number) {
  return useBoundStore((state) => state.favs.some((favId) => favId === id));
}

export default function FavIcon({
  details,
  transparent = false,
  className,
  containerClassName,
}: IProps) {
  const { toggleFav } = useBoundStore(
    (state) => ({ toggleFav: state.toggleFav, isFav: state.isFav }),
    shallow
  );
  const isFav = useIsFav(details.id);
  const scale = useMotionValue(1);

  const onHeartClick = () => {
    toggleFav(details.id);
    if (!isFav) animate(scale, [0.8, 1.2, 0.9, 1.1, 1], { duration: 0.5 });
  };

  return (
    <HeaderBtn
      transparent={transparent}
      onClick={(e) => {
        e.preventDefault();
        onHeartClick();
      }}
      className={containerClassName}
    >
      <motion.div
        className={cls(
          isFav
            ? "text-red-500 dark:text-gray-200"
            : "text-gray-300 dark:text-gray-600",
          className ? className : ""
        )}
        style={{ scale }}
      >
        <IoHeart />
      </motion.div>
    </HeaderBtn>
  );
}
