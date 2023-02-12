import { AnimatePresence, motion } from "framer-motion";
import HeaderContainer from "../components/containers/HeaderContainer";
import Header from "../components/Header";
import HorizontalPoster from "../components/HorizontalPoster";
import { IMovie } from "../libs/api/types";
import useBoundStore from "../store";

export default function Favorites() {
  const favs = useBoundStore((state) => state.favs);

  return (
    <HeaderContainer Header={<Header title="Favorites" showBackBtn={false} />}>
      <div className="p-6 space-y-4">
        <AnimatePresence mode="popLayout">
          {favs.length ? (
            favs.map((fav) => (
              <motion.div key={fav.id} layout exit={{ scale: 0.8, opacity: 0 }}>
                <HorizontalPoster
                  key={fav.id}
                  data={fav as IMovie}
                  showDelBtn
                />
              </motion.div>
            ))
          ) : (
            <div className="grid place-items-center absolute top-0 left-0 right-0 bottom-0 text-gray-400 font-light">
              Nothing to display! 😣
            </div>
          )}
        </AnimatePresence>
      </div>
    </HeaderContainer>
  );
}
