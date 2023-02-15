import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet";
import HeaderContainer from "../components/containers/HeaderContainer";
import HorizontalPosterContainer from "../components/containers/HorizontalPosterContainer";
import Header from "../components/Header";
import HorizontalPoster from "../components/HorizontalPoster";
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
              <motion.div key={fav.id} layout>
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
              className="grid place-items-center absolute top-0 left-0 right-0 bottom-0 text-gray-400 font-light"
            >
              Nothing to display! 😣
            </motion.div>
          )}
        </AnimatePresence>
      </HorizontalPosterContainer>
    </HeaderContainer>
  );
}
