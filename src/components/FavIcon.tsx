import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { animate, motion, useMotionValue } from "framer-motion";
import { makeImgPath } from "../libs/utils";
import useBoundStore from "../store";
import { shallow } from "zustand/shallow";
import HeaderBtn from "./HeaderBtn";
import { IMovieDetail } from "../libs/api/types";

interface IProps {
  id: number;
  details: IMovieDetail;
}

function useIsFav(id: number) {
  return useBoundStore((state) => state.favs.some((fav) => fav.id === id));
}

export default function FavIcon({ id, details }: IProps) {
  const { toggleFav } = useBoundStore(
    (state) => ({ toggleFav: state.toggleFav, isFav: state.isFav }),
    shallow
  );
  const isFav = useIsFav(id);
  const scale = useMotionValue(1);

  const onHeartClick = () => {
    toggleFav(id, {
      title: details.title,
      genre_ids: details.genres.map((genre) => genre.id),
      poster_path: makeImgPath(details.poster_path),
      release_date: details.release_date,
      vote_average: details.vote_average,
    });
    if (!isFav) animate(scale, [0.8, 1.2, 0.9, 1.1, 1], { duration: 0.5 });
  };

  return (
    <HeaderBtn transparent onClick={onHeartClick}>
      <motion.div style={{ scale }}>
        {isFav ? <IoHeart /> : <IoHeartOutline />}
      </motion.div>
    </HeaderBtn>
  );
}
