import { motion, AnimatePresence, Variants } from "framer-motion";
import useBoundStore from "../store";
import { shallow } from "zustand/shallow";
import { IoClose } from "react-icons/io5";
import { ReactNode, useEffect } from "react";

const bg: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 0.7 },
};

const main: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

interface IProps {
  title?: string;
  children: ReactNode;
}

export default function ModalContainer({ title, children }: IProps) {
  const { isVisible, closeModal } = useBoundStore(
    (state) => ({ isVisible: state.isVisible, closeModal: state.closeModal }),
    shallow
  );

  useEffect(() => {
    if (isVisible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <div className="grid place-items-center fixed top-0 z-20 w-full h-full">
          <motion.div
            variants={bg}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black"
          />
          <motion.div
            variants={main}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={{ duration: 0.2 }}
            className="w-3/4 h-[60vh] bg-black rounded-xl z-30 flex flex-col justify-between overflow-hidden"
          >
            <div className="h-12 flex justify-end shrink-0 relative">
              {title ? (
                <span className="text-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {title}
                </span>
              ) : null}
              <button
                className="w-12 h-12 grid place-items-center text-xl text-gray-300"
                onClick={closeModal}
              >
                <IoClose />
              </button>
            </div>
            <div className="overflow-y-auto grow">{children}</div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
