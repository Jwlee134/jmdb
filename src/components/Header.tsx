import { useNavigate } from "react-router-dom";
import { RxChevronLeft } from "react-icons/rx";
import { cls } from "../libs/utils";
import { Fragment, ReactNode, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import HeaderBtn from "./HeaderBtn";
import useBoundStore from "../store";

interface IProps {
  title?: string;
  subTitle?: string;
  showBackBtn?: boolean;
  rightIcons?: ReactNode[] | null;
  transparent?: boolean;
}

export default function Header({
  title,
  subTitle,
  showBackBtn = true,
  rightIcons,
  transparent = false,
}: IProps) {
  const theme = useBoundStore((state) => state.theme);
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    [
      theme === "dark" ? "#0a141900" : "#ffffff00",
      theme === "dark" ? "#0a1419ff" : "#ffffffff",
    ]
  );
  const backBtnColor = useTransform(
    scrollY,
    [0, 80],
    ["#e5e7eb", theme === "light" ? "#000000" : "#e5e7eb"]
  );

  return (
    <motion.header
      ref={ref}
      className="bg-white dark:bg-black h-20 fixed top-0 left-0 w-full z-[998] drop-shadow dark:drop-shadow-none"
      style={{ ...(transparent && { backgroundColor }) }}
    >
      <div className="max-w-screen-lg w-full flex items-center px-6 mx-auto h-full">
        <div className="w-[25%] flex items-center">
          {showBackBtn ? (
            <HeaderBtn onClick={() => navigate(-1)} transparent={transparent}>
              <motion.span
                style={{ ...(transparent && { color: backBtnColor }) }}
              >
                <RxChevronLeft className="text-2xl" />
              </motion.span>
            </HeaderBtn>
          ) : null}
        </div>
        <div className="w-[50%] flex flex-col justify-center items-center">
          {title ? (
            <p className={cls("font-bold", subTitle ? "text-lg" : "text-xl")}>
              {title}
            </p>
          ) : null}
          {subTitle ? (
            <p className="text-gray-500 text-sm">{subTitle}</p>
          ) : null}
        </div>
        <div className="w-[25%] flex justify-end items-center space-x-2">
          {rightIcons?.length
            ? rightIcons.map((icon, i) => <Fragment key={i}>{icon}</Fragment>)
            : null}
        </div>
      </div>
    </motion.header>
  );
}
