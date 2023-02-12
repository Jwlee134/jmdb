import { IMovie } from "../libs/api/types";
import { GENRES } from "../libs/constants";
import useImageLoad from "../libs/hooks/useImageLoad";
import { isPlaceholder, makeImgPath, Placeholder } from "../libs/utils";
import { memo } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

interface IProps {
  data: IMovie | Placeholder;
}

export default memo(function HorizontalPoster({ data }: IProps) {
  const loaded = useImageLoad(
    data && !isPlaceholder(data) ? makeImgPath(data.poster_path) : ""
  );
  const isReady = !isPlaceholder(data) && loaded;

  return (
    <Link
      to={`/movie/${data.id}`}
      className="flex"
      onClick={(e) => {
        if (!isReady) e.preventDefault();
      }}
    >
      <div className="flex-[0_0_35%]">
        <div className="relative pt-[150%] rounded-2xl overflow-hidden">
          {isReady ? (
            <img
              className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
              src={makeImgPath(data.poster_path)}
              alt="Poster"
            />
          ) : (
            <Skeleton
              containerClassName="overflow-hidden absolute top-0 left-0 right-0 bottom-0 w-full h-full"
              className="absolute h-full"
            />
          )}
        </div>
      </div>
      <div className="ml-4 grow">
        <h1 className="font-bold mb-1">
          {isReady ? data.title : <Skeleton />}
        </h1>
        {isReady ? (
          data.genre_ids.length ? (
            <div className="text-xs text-gray-500">
              {GENRES.filter((genre) =>
                Boolean(data.genre_ids.find((id) => genre.id === id))
              )
                .map((genre) => genre.name)
                .join(", ")}
            </div>
          ) : null
        ) : (
          <Skeleton />
        )}
        {isReady ? (
          <div className="flex flex-wrap text-xs text-gray-400 mt-2 gap-2">
            {data.release_date ? (
              <div className="bg-gray-800 rounded-full p-2">
                {data.release_date}
              </div>
            ) : null}
            <div className="bg-gray-800 rounded-full p-2">
              <span className="text-yellow-300 mr-1">★</span>
              {data.vote_average.toFixed(1)}
            </div>
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </Link>
  );
});
