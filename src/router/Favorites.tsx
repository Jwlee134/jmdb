import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet";
import HeaderContainer from "../components/containers/HeaderContainer";
import HorizontalPosterContainer from "../components/containers/HorizontalPosterContainer";
import Header from "../components/Header";
import HorizontalPoster from "../components/HorizontalPoster";
import ScrollToTopBtn from "../components/ScrollToTopBtn";
import { IMovie } from "../libs/api/types";
import useBoundStore from "../store";

export default function Favorites() {
  const favs = useBoundStore((state) => state.favs);

  return (
    <HeaderContainer Header={<Header title="Favorites" showBackBtn={false} />}>
      <Helmet>
        <title>JMDB | Favorites</title>
      </Helmet>
      <HorizontalPosterContainer>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid place-items-center absolute top-0 left-0 right-0 min-h-[calc(100vh-80px)] bottom-0 text-gray-600 dark:text-gray-400 font-light"
            >
              Nothing to display! 😣
            </motion.div>
          )}
        </AnimatePresence>
      </HorizontalPosterContainer>
      <ScrollToTopBtn />
    </HeaderContainer>
  );
}
