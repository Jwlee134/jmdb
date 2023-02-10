import { IReview } from "../libs/api/types";
import useImageLoad from "../libs/hooks/useImageLoad";
import {
  formatCreatedAt,
  isPlaceholder,
  makeImgPath,
  Placeholder,
} from "../libs/utils";
import Skeleton from "./skeletons/Skeleton";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";

interface IProps {
  data: Placeholder | IReview;
}

export default function Review({ data }: IProps) {
  const loaded = useImageLoad(
    !isPlaceholder(data) ? makeImgPath(data.author_details.avatar_path, 45) : ""
  );
  const ref = useRef<HTMLDivElement>(null);

  const isReady = !isPlaceholder(data) && loaded;

  useEffect(() => {
    if (!ref.current) return;
    console.log(ref.current.scrollHeight, ref.current.clientHeight);
  }, [isReady]);

  return (
    <div className="px-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          {isReady ? (
            <img
              src={makeImgPath(data.author_details.avatar_path, 45)}
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <Skeleton width={48} height={48} className="rounded-full" />
          )}
          <div>
            <div>{isReady ? data.author : <Skeleton />}</div>
            <div className="text-sm font-light text-gray-400">
              {isReady ? formatCreatedAt(data.created_at) : <Skeleton />}
            </div>
          </div>
        </div>
        {isReady && data.author_details.rating ? (
          <div className="bg-gray-800 py-2 px-4 rounded-full text-sm flex items-center">
            <span className="text-yellow-300 mr-1">★</span>
            <span>{data.author_details.rating}</span>
          </div>
        ) : null}
      </div>
      {isReady ? (
        <div
          ref={ref}
          className="font-light text-gray-400 text-sm line-clamp-3"
        >
          <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>
      ) : (
        <Skeleton count={2} />
      )}
    </div>
  );
}
