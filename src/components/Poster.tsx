import { Link, useParams } from "react-router-dom";
import { IMovie } from "../libs/api/types";
import { GENRES } from "../libs/constants";
import useImageLoad from "../libs/hooks/useImageLoad";
import { isPlaceholder, makeImgPath } from "../libs/utils";
import useBoundStore from "../store";
import { RenderItemProps } from "./containers/ScrollContainer";
import Skeleton from "./Skeleton";

export default function Poster({
  item,
  index,
  cacheKey,
}: RenderItemProps<IMovie>) {
  const { id } = useParams();
  const setCache = useBoundStore((state) => state.setCache);
  const loaded = useImageLoad(
    !isPlaceholder(item) ? makeImgPath(item.poster_path) : ""
  );
  const isReady = !isPlaceholder(item) && loaded;

  return (
    <Link
      to={`/movie/${item.id}`}
      className="flex-[0_0_40%] min-w-0"
      onClick={(e) => {
        if (!isReady) e.preventDefault();
        if (cacheKey) setCache(cacheKey, index, id ? parseInt(id) : undefined);
      }}
    >
      <div className="relative pt-[150%] rounded-2xl overflow-hidden">
        {isReady ? (
          <img
            className="absolute w-full h-full top-0 left-0 right-0 bottom-0 object-cover"
            src={makeImgPath(item.poster_path)}
            alt="poster"
          />
        ) : (
          <Skeleton
            containerClassName="overflow-hidden absolute top-0 left-0 right-0 bottom-0 w-full h-full"
            className="absolute h-full"
          />
        )}
      </div>
      <div className="mt-1 whitespace-nowrap text-ellipsis overflow-hidden text-sm">
        {isReady ? item.title : <Skeleton />}
      </div>
      <div className="text-xs text-gray-500">
        {isReady ? (
          <>
            {item.genre_ids.length
              ? GENRES.find((genre) => genre.id === item.genre_ids[0])?.name
              : null}
            <span>
              {item.genre_ids.length ? " • " : ""}
              {item.release_date.split("-")[0]}
            </span>
          </>
        ) : (
          <Skeleton width="40%" height={10} />
        )}
      </div>
    </Link>
  );
}
