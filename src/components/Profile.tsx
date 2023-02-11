import { Link } from "react-router-dom";
import { ICast, IPerson } from "../libs/api/types";
import useImageLoad from "../libs/hooks/useImageLoad";
import { isPlaceholder, makeImgPath } from "../libs/utils";
import { RenderItemProps } from "./ScrollView";
import Skeleton from "./Skeleton";

interface IProps extends RenderItemProps<IPerson | ICast> {
  showCharacter?: boolean;
}

export default function Profile({ item, index, showCharacter = true }: IProps) {
  const loaded = useImageLoad(
    !isPlaceholder(item) ? makeImgPath(item.profile_path, 154) : ""
  );
  const isReady = !isPlaceholder(item) && loaded;

  return (
    <Link
      to={`/person/${item.id}`}
      className="flex-[0_0_40%] min-w-0"
      onClick={(e) => {
        if (!isReady) e.preventDefault();
      }}
    >
      <div className="relative pt-[133%] overflow-hidden rounded-xl">
        {isReady ? (
          <img
            src={makeImgPath(item.profile_path, 154)}
            alt="Avatar"
            className="absolute w-full h-full top-0 left-0 right-0 bottom-0 object-cover"
          />
        ) : (
          <Skeleton
            containerClassName="overflow-hidden absolute top-0 left-0 right-0 bottom-0 w-full h-full"
            className="h-full"
          />
        )}
      </div>
      <div className="mt-1 whitespace-nowrap text-ellipsis overflow-hidden text-sm">
        {isReady ? item.name : <Skeleton />}
      </div>
      {showCharacter ? (
        <div className="text-gray-500 text-xs">
          {isReady && "character" in item ? item.character : <Skeleton />}
        </div>
      ) : null}
    </Link>
  );
}
