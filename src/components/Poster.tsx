import { Link } from "react-router-dom";
import { IMovie } from "../libs/api/types";
import { GENRES } from "../libs/constants";
import useImageLoad from "../libs/hooks/useImageLoad";
import { isPlaceholder, makeImgPath, Placeholder } from "../libs/utils";
import Skeleton from "./skeletons/Skeleton";

interface IProps {
  data: IMovie | Placeholder;
}

export default function Poster({ data }: IProps) {
  const loaded = useImageLoad(
    !isPlaceholder(data) ? makeImgPath(data.poster_path) : ""
  );
  const isReady = !isPlaceholder(data) && loaded;

  return (
    <Link
      to={`/movie/${data.id}`}
      className="flex-[0_0_40%] min-w-0"
      onClick={(e) => {
        if (!isReady) e.preventDefault();
      }}
    >
      <div className="relative pt-[150%] rounded-2xl overflow-hidden">
        {isReady ? (
          <img
            className="absolute w-full h-full top-0 left-0 right-0 bottom-0 object-cover"
            src={makeImgPath(data.poster_path)}
            alt="poster"
          />
        ) : (
          <Skeleton
            containerClassName="overflow-hidden absolute top-0 left-0 right-0 bottom-0 w-full h-full"
            className="h-full"
          />
        )}
      </div>
      <div className="mt-1 whitespace-nowrap text-ellipsis overflow-hidden text-sm">
        {isReady ? data.title : <Skeleton />}
      </div>
      <div className="text-xs text-gray-500">
        {isReady ? (
          <>
            {data.genre_ids.length
              ? GENRES.find((genre) => genre.id === data.genre_ids[0])?.name
              : null}
            <span>
              {data.genre_ids.length ? " • " : ""}
              {data.release_date.split("-")[0]}
            </span>
          </>
        ) : (
          <Skeleton width="40%" height={10} />
        )}
      </div>
    </Link>
  );
}
