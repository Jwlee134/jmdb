import {
  useScroll,
  motion,
  useMotionValueEvent,
  AnimatePresence,
  HTMLMotionProps,
} from "framer-motion";
import { useState } from "react";
import { IoArrowUpCircle } from "react-icons/io5";
import { cls } from "../libs/utils";

interface IProps extends HTMLMotionProps<"div"> {}

export default function ScrollToTopBtn({ className, ...rest }: IProps) {
  const { scrollY } = useScroll();
  const [showBtn, setShowBtn] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 1000) setShowBtn(true);
    else setShowBtn(false);
  });

  return (
    <AnimatePresence>
      {showBtn ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className={cls(
            "fixed bottom-16 w-full max-w-[inherit] px-6 py-4 z-[999] grid place-items-end pointer-events-none",
            className ? className : ""
          )}
          {...rest}
        >
          <button
            className="w-10 h-10 text-4xl grid place-items-center pointer-events-auto text-white drop-shadow-md dark:text-black dark:drop-shadow-none"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <IoArrowUpCircle />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
