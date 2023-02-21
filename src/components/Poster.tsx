import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { genres } from "../libs/api/movies";
import { IMovie } from "../libs/api/types";
import useImageLoad from "../libs/hooks/useImageLoad";
import { isPlaceholder, makeImgPath } from "../libs/utils";
import useBoundStore from "../store";
import { RenderItemProps } from "./containers/ScrollContainer";
import RatioSkeleton from "./RatioSkeleton";
import Skeleton from "./Skeleton";

export default function Poster({
  item,
  index,
  cacheKey,
}: RenderItemProps<IMovie>) {
  const lng = useBoundStore((state) => state.lng);
  const { data } = useQuery({
    queryKey: ["genres", lng],
    queryFn: genres.getGenres,
  });
  const { id } = useParams();
  const setCache = useBoundStore((state) => state.setCache);
  const loaded = useImageLoad(
    !isPlaceholder(item) ? makeImgPath(item.poster_path) : ""
  );
  const isReady = !isPlaceholder(item) && loaded;

  return (
    <Link
      to={`/movie/${item.id}`}
      className="flex-[0_0_40%] sm:flex-[0_0_28%] md:flex-[0_0_22%] min-w-0"
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
          <RatioSkeleton />
        )}
      </div>
      <div className="mt-1 whitespace-nowrap text-ellipsis overflow-hidden text-sm">
        {isReady ? item.title : <Skeleton />}
      </div>
      <div className="text-xs text-gray-500">
        {isReady ? (
          <>
            {item.genre_ids.length
              ? data?.find((genre) => genre.id === item.genre_ids[0])?.name
              : null}
            <span>
              {item.genre_ids.length && item.release_date ? " • " : ""}
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
