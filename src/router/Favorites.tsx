import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet";
import HeaderContainer from "../components/containers/HeaderContainer";
import HorizontalPosterContainer from "../components/containers/HorizontalPosterContainer";
import Header from "../components/Header";
import ScrollToTopBtn from "../components/ScrollToTopBtn";
import useBoundStore from "../store";
import { useTranslation } from "react-i18next";
import FavItem from "../components/FavItem";

export default function Favorites() {
  const favs = useBoundStore((state) => state.favs);
  const { t } = useTranslation();

  return (
    <HeaderContainer
      Header={<Header title={t("favorites") as string} showBackBtn={false} />}
    >
      <Helmet>
        <title>JMDB | {t("favorites")}</title>
      </Helmet>
      <HorizontalPosterContainer>
        <AnimatePresence mode="popLayout">
          {favs.length ? (
            favs.map((favId) => (
              <motion.div key={favId} layout exit={{ scale: 0.8, opacity: 0 }}>
                <FavItem id={favId} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid place-items-center absolute top-0 left-0 right-0 min-h-[calc(100vh-80px)] bottom-0 text-gray-600 dark:text-gray-400 font-light"
            >
              {t("nothingToDisplay")}
            </motion.div>
          )}
        </AnimatePresence>
      </HorizontalPosterContainer>
      <ScrollToTopBtn />
    </HeaderContainer>
  );
}
