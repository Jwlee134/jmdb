import { useQueries } from "@tanstack/react-query";
import Poster from "../components/common/Poster";
import ScaleCarousel from "../components/common/ScaleCarousel";
import ScrollView from "../components/common/ScrollView";
import Section from "../components/common/Section";
import { discover, movies } from "../libs/api/movies";

export default function Movies() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["discover", "movies"],
        queryFn: discover.getDiscoveredMovies,
      },
      {
        queryKey: ["movies", "nowPlaying"],
        queryFn: movies.getNowPlaying,
      },
      {
        queryKey: ["movies", "upcoming"],
        queryFn: movies.getUpcoming,
      },
      {
        queryKey: ["movies", "topRated"],
        queryFn: movies.getTopRated,
      },
    ],
  });

  return (
    <>
      <Section headerTitle="Discover">
        <ScaleCarousel data={results[0].data?.results} />
      </Section>
      <Section headerTitle="Now Playing">
        <ScrollView
          data={results[1].data?.results}
          renderItem={(data) => <Poster key={data.id} data={data} />}
        />
      </Section>
      <Section headerTitle="Upcoming">
        <ScrollView
          data={results[2].data?.results}
          renderItem={(data) => <Poster key={data.id} data={data} />}
        />
      </Section>
      <Section headerTitle="Top Rated">
        <ScrollView
          data={results[3].data?.results}
          renderItem={(data) => <Poster key={data.id} data={data} />}
        />
      </Section>
    </>
  );
}
