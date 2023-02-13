import { IProfile } from "../libs/api/types";
import useImageLoad from "../libs/hooks/useImageLoad";
import { isPlaceholder, makeImgPath } from "../libs/utils";
import { RenderItemProps } from "./containers/ScrollContainer";
import Skeleton from "./Skeleton";

interface IProps extends RenderItemProps<IProfile> {}

export default function Image({ item }: IProps) {
  const loaded = useImageLoad(
    !isPlaceholder(item) ? makeImgPath(item.file_path) : ""
  );
  const isReady = loaded && !isPlaceholder(item);

  return (
    <div className="flex-[0_0_80%] sm:flex-[0_0_60%] md:flex-[0_0_40%] min-w-0">
      <div className="relative pt-[150%] rounded-2xl overflow-hidden">
        {isReady ? (
          <img
            className="absolute w-full h-full top-0 left-0 right-0 bottom-0 object-cover"
            src={makeImgPath(item.file_path)}
            alt="poster"
          />
        ) : (
          <Skeleton
            containerClassName="overflow-hidden absolute top-0 left-0 right-0 bottom-0 w-full h-full"
            className="h-full"
          />
        )}
      </div>
    </div>
  );
}
