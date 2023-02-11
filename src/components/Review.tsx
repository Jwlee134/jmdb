import { IReview } from "../libs/api/types";
import useImageLoad from "../libs/hooks/useImageLoad";
import {
  cls,
  formatCreatedAt,
  isPlaceholder,
  makeImgPath,
  Placeholder,
} from "../libs/utils";
import Skeleton from "./Skeleton";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";
import rehypeRaw from "rehype-raw";

interface IProps {
  data: Placeholder | IReview;
}

export default function Review({ data }: IProps) {
  const loaded = useImageLoad(
    !isPlaceholder(data) ? makeImgPath(data.author_details.avatar_path, 45) : ""
  );
  const ref = useRef<HTMLDivElement>(null);
  const [showBtn, setShowBtn] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const isReady = !isPlaceholder(data) && loaded;

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.scrollHeight > 64) setShowBtn(true);
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
        <div className="flex flex-col">
          <div className={cls("overflow-hidden", showMore ? "h-auto" : "h-16")}>
            <div ref={ref}>
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                className="font-light text-gray-400 text-sm"
              >
                {data.content}
              </ReactMarkdown>
            </div>
          </div>
          {showBtn ? (
            <button
              onClick={() => setShowMore((prev) => !prev)}
              className="text-xs text-gray-500 w-fit self-center mt-2"
            >
              {showMore ? "Read less" : "Read more"}
            </button>
          ) : null}
        </div>
      ) : (
        <Skeleton count={3} />
      )}
    </div>
  );
}
