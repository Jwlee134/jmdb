import { useNavigate } from "react-router-dom";
import { RxChevronLeft } from "react-icons/rx";
import { cls } from "../libs/utils";
import { MouseEventHandler, ReactNode, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import HeaderBtn from "./HeaderBtn";

interface IProps {
  title?: string;
  subTitle?: string;
  showBackBtn?: boolean;
  rightIcons?: ReactNode[] | null;
  rightIconsOnClick?: MouseEventHandler<HTMLButtonElement>[];
  transparent?: boolean;
}

export default function Header({
  title,
  subTitle,
  showBackBtn = true,
  rightIcons,
  rightIconsOnClick,
  transparent = false,
}: IProps) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ["#0a141900", "#0a1419ff"]
  );

  return (
    <motion.header
      ref={ref}
      className="bg-black h-20 fixed top-0 w-full z-[998] px-6 flex items-center"
      style={{ ...(transparent && { backgroundColor }) }}
    >
      <div className="w-[25%] flex items-center">
        {showBackBtn ? (
          <HeaderBtn onClick={() => navigate(-1)} transparent={transparent}>
            <RxChevronLeft className="text-2xl" />
          </HeaderBtn>
        ) : null}
      </div>
      <div className="w-[50%] flex flex-col justify-center items-center">
        {title ? (
          <p className={cls("font-bold", subTitle ? "text-lg" : "text-xl")}>
            {title}
          </p>
        ) : null}
        {subTitle ? <p className="text-gray-500 text-sm">{subTitle}</p> : null}
      </div>
      <div className="w-[25%] flex justify-end items-center space-x-2">
        {rightIcons?.length
          ? rightIcons.map((icon, i) => (
              <HeaderBtn
                key={i}
                onClick={rightIconsOnClick?.[i]}
                transparent={transparent}
              >
                {icon}
              </HeaderBtn>
            ))
          : null}
      </div>
    </motion.header>
  );
}
