import {
  useScroll,
  useTransform,
  motion,
  HTMLMotionProps,
} from "framer-motion";
import { ReactNode } from "react";
import { cls } from "../libs/utils";
import useBoundStore from "../store";

interface IProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  transparent?: boolean;
}

export default function HeaderBtn({
  children,
  transparent = false,
  className,
  ...rest
}: IProps) {
  const theme = useBoundStore((state) => state.theme);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ["#1f293700", theme === "dark" ? "#1f2937ff" : "#1f293700"]
  );

  return (
    <motion.button
      {...rest}
      className={cls(
        "font-bold text-xl w-10 h-10 bg-white dark:bg-gray-800 flex justify-center items-center rounded-xl",
        className ? className : ""
      )}
      style={{ ...(transparent && { backgroundColor }) }}
    >
      {children}
    </motion.button>
  );
}
