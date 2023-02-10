import { IVideo } from "../libs/api/types";
import useImageLoad from "../libs/hooks/useImageLoad";
import { isPlaceholder, Placeholder } from "../libs/utils";
import Skeleton from "./skeletons/Skeleton";

interface IProps {
  data: IVideo | Placeholder;
}

export default function Video({ data }: IProps) {
  const loaded = useImageLoad(
    !isPlaceholder(data) ? `https://img.youtube.com/vi/${data.key}/0.jpg` : ""
  );
  const isReady = !isPlaceholder(data) && loaded;

  return (
    <a
      href={isReady ? `https://youtu.be/${data.key}` : ""}
      target="_blank"
      rel="noreferrer"
      className="flex-[0_0_80%] min-w-0"
      onClick={(e) => {
        if (!isReady) e.preventDefault();
      }}
    >
      <div className="relative pt-[56.25%] rounded-2xl overflow-hidden">
        {isReady ? (
          <img
            src={`https://img.youtube.com/vi/${data.key}/0.jpg`}
            alt="Video thumbnail"
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
        {isReady ? data.name : <Skeleton />}
      </div>
    </a>
  );
}
