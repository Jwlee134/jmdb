import { IMovie } from "../libs/api/types";
import { GENRES } from "../libs/constants";
import useImageLoad from "../libs/hooks/useImageLoad";
import { isPlaceholder, makeImgPath, Placeholder } from "../libs/utils";
import { memo } from "react";
import { Link } from "react-router-dom";
import RatioSkeleton from "./RatioSkeleton";
import FavIcon from "./FavIcon";
import Skeleton from "./Skeleton";

interface IProps {
  data: IMovie | Placeholder;
  showDelBtn?: boolean;
}

export default memo(function HorizontalPoster({ data }: IProps) {
  const loaded = useImageLoad(
    data && !isPlaceholder(data) ? makeImgPath(data.poster_path) : ""
  );
  const isReady = !isPlaceholder(data) && loaded;

  return (
    <Link
      to={`/movie/${data.id}`}
      className="flex relative bg-gray-800 rounded-2xl overflow-hidden"
      onClick={(e) => {
        if (!isReady) e.preventDefault();
      }}
    >
      <div className="flex-[0_0_40%]">
        <div className="relative pt-[150%]">
          {isReady ? (
            <img
              className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
              src={makeImgPath(data.poster_path)}
              alt="Poster"
            />
          ) : (
            <RatioSkeleton
              baseColor="#111827"
              highlightColor="#374151"
              className="rounded-none rounded-tl-2xl rounded-bl-2xl"
            />
          )}
        </div>
      </div>
      <div className="p-4 grow space-y-2">
        {isReady ? (
          <div className="inline float-right ml-2">
            <FavIcon
              details={data}
              transparent={false}
              className="text-2xl sm:max-md:text-3xl"
            />
          </div>
        ) : null}
        {isReady ? (
          <>
            <h1 className="mt-2 sm:max-md:text-2xl">
              {isReady ? data.title : null}
            </h1>
            <div className="flex flex-wrap text-xs text-gray-400">
              {data.vote_average ? (
                <span>
                  <span className="text-yellow-300 mr-1">★</span>
                  {data.vote_average.toFixed(1)}
                </span>
              ) : null}
              {data.vote_average && data.release_date ? (
                <span className="mx-1">•</span>
              ) : null}
              {data.release_date ? <span>{data.release_date}</span> : null}
            </div>
            {data.genre_ids.length ? (
              <div className="text-xs text-gray-500 sm:max-md:text-sm">
                {GENRES.filter((genre) =>
                  Boolean(data.genre_ids.find((id) => genre.id === id))
                )
                  .map((genre) => genre.name)
                  .join(", ")}
              </div>
            ) : null}
          </>
        ) : (
          <Skeleton count={5} baseColor="#111827" highlightColor="#374151" />
        )}
      </div>
    </Link>
  );
});
