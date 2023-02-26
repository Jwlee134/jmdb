import { IMovie, IMovieDetail } from "../libs/api/types";
import useImageLoad from "../libs/hooks/useImageLoad";
import { isPlaceholder, makeImgPath, Placeholder } from "../libs/utils";
import { memo } from "react";
import { Link } from "react-router-dom";
import RatioSkeleton from "./RatioSkeleton";
import FavIcon from "./FavIcon";
import Skeleton from "./Skeleton";
import useBoundStore from "../store";
import { useQuery } from "@tanstack/react-query";
import { genres } from "../libs/api/movies";
import { shallow } from "zustand/shallow";

interface IProps {
  data: (IMovie | IMovieDetail) | Placeholder;
  showDelBtn?: boolean;
}

export default memo(function HorizontalPoster({ data }: IProps) {
  const { theme, lng } = useBoundStore(
    (state) => ({ theme: state.theme, lng: state.lng }),
    shallow
  );
  const { data: genreData } = useQuery({
    queryKey: ["genres", lng],
    queryFn: genres.getGenres,
  });
  const loaded = useImageLoad(
    data && !isPlaceholder(data) ? makeImgPath(data.poster_path) : ""
  );
  const isReady = !isPlaceholder(data) && loaded;

  return (
    <Link
      to={`/movie/${data.id}`}
      className="flex relative bg-gray-100 dark:bg-gray-800 rounded-2xl drop-shadow"
      onClick={(e) => {
        if (!isReady) e.preventDefault();
      }}
      state={{
        ...(isReady && {
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
        }),
      }}
    >
      <div className="flex-[0_0_40%]">
        <div className="relative pt-[150%]">
          {isReady ? (
            <img
              className="rounded-tl-2xl rounded-bl-2xl absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
              src={makeImgPath(data.poster_path)}
              alt="Poster"
            />
          ) : (
            <RatioSkeleton
              baseColor={theme === "dark" ? "#111827" : undefined}
              highlightColor={theme === "dark" ? "#374151" : undefined}
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
              className="text-2xl sm:max-md:text-3xl"
              containerClassName="bg-gray-100"
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
                  <span className="dark:text-yellow-300 mr-1">★</span>
                  {data.vote_average.toFixed(1)}
                </span>
              ) : null}
              {data.vote_average && data.release_date ? (
                <span className="mx-1">•</span>
              ) : null}
              {data.release_date ? <span>{data.release_date}</span> : null}
            </div>
            <div className="text-xs text-gray-500 sm:max-md:text-sm">
              {"genre_ids" in data
                ? data.genre_ids.length
                  ? genreData
                      ?.filter((genre) =>
                        Boolean(data.genre_ids.find((id) => genre.id === id))
                      )
                      .map((genre) => genre.name)
                      .join(", ")
                  : null
                : data.genres.map((genre) => genre.name).join(", ") || null}
            </div>
          </>
        ) : (
          <Skeleton
            count={5}
            baseColor={theme === "dark" ? "#111827" : undefined}
            highlightColor={theme === "dark" ? "#374151" : undefined}
          />
        )}
      </div>
    </Link>
  );
});
