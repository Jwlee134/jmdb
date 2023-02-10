import { cls, placeholders } from "../../libs/utils";
import Skeleton from "./Skeleton";

export default function ScaleCarouselSkeleton() {
  return (
    <div className="flex overflow-hidden justify-center">
      {placeholders().map((placeholder, i) => (
        <div
          key={placeholder.bullShit}
          className={cls("flex-[0_0_60%]", i !== 1 ? "scale-[0.8]" : "")}
        >
          <div className="relative pt-[150%] rounded-3xl overflow-hidden">
            <Skeleton
              containerClassName="overflow-hidden absolute top-0 left-0 right-0 bottom-0 w-full h-full"
              className="h-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
