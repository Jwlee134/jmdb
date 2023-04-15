import { useQueries } from "@tanstack/react-query";
import Header from "../components/Header";
import HeaderContainer from "../components/containers/HeaderContainer";
import Poster from "../components/Poster";
import ScrollView from "../components/containers/ScrollContainer";
import Section from "../components/Section";
import { discover, movies } from "../libs/api/movies";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import useBoundStore from "../store";

export default function Movies() {
  const lng = useBoundStore((state) => state.lng);
  const results = useQueries({
    queries: [
      {
        queryKey: ["discover", "movie", lng],
        queryFn: discover.getDiscoveredMovies,
      },
      {
        queryKey: ["movies", "now_playing", lng],
        queryFn: movies.getNowPlaying,
      },
      {
        queryKey: ["movies", "upcoming", lng],
        queryFn: movies.getUpcoming,
      },
      {
        queryKey: ["movies", "top_rated", lng],
        queryFn: movies.getTopRated,
      },
    ],
  });
  const { t } = useTranslation();

  return (
    <HeaderContainer Header={<Header title="JMDB" showBackBtn={false} />}>
      <Helmet>
        <title>JMDB | {t("home")}</title>
      </Helmet>
      <Section headerTitle={t("nowPlaying")}>
        <ScrollView
          data={results[1].data?.results}
          renderItem={(data) => <Poster key={data.item.id} {...data} />}
          cacheKey="nowPlaying"
        />
      </Section>
      <Section headerTitle={t("upcoming")}>
        <ScrollView
          data={results[2].data?.results}
          renderItem={(data) => <Poster key={data.item.id} {...data} />}
          cacheKey="upcoming"
        />
      </Section>
      <Section headerTitle={t("topRated")}>
        <ScrollView
          data={results[3].data?.results}
          renderItem={(data) => <Poster key={data.item.id} {...data} />}
          cacheKey="topRated"
        />
      </Section>
    </HeaderContainer>
  );
}
