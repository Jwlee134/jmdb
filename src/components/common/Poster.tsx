import { IMovie } from "../../libs/api/types";
import { GENRES } from "../../libs/constants";
import { Placeholder, isMovie, makeImgPath } from "../../libs/utils";
import Skeleton from "./Skeleton";

interface IProps {
  data: IMovie | Placeholder;
}

export default function Poster({ data }: IProps) {
  return (
    <div className="flex-[0_0_40%] min-w-0">
      <div className="relative pt-[150%] rounded-2xl overflow-hidden">
        {isMovie(data) ? (
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
        {isMovie(data) ? data.title : <Skeleton />}
      </div>
      <div className="text-xs text-gray-500">
        {isMovie(data) ? (
          data.genre_ids.length &&
          GENRES.find((genre) => genre.id === data.genre_ids.slice(0, 1)[0])
            ?.name
        ) : (
          <Skeleton width="40%" height={10} />
        )}
      </div>
    </div>
  );
}
