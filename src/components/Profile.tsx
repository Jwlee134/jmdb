import { IPerson } from "../libs/api/types";
import useImageLoad from "../libs/hooks/useImageLoad";
import { isPlaceholder, makeImgPath, Placeholder } from "../libs/utils";
import Skeleton from "./Skeleton";

interface IProps {
  data: IPerson | Placeholder;
}

export default function Profile({ data }: IProps) {
  const loaded = useImageLoad(
    !isPlaceholder(data) ? makeImgPath(data.profile_path, 154) : ""
  );
  const isReady = !isPlaceholder(data) && loaded;

  return (
    <div className="flex-[0_0_28%] min-w-0">
      <div className="relative pt-[133%] overflow-hidden rounded-xl">
        {isReady ? (
          <img
            src={makeImgPath(data.profile_path, 154)}
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
      <div className="mt-1 overflow-hidden text-sm">
        {isReady ? data.name : <Skeleton />}
      </div>
    </div>
  );
}
