import { useQueries } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Poster from "../components/Poster";
import ScaleCarousel from "../components/ScaleCarousel";
import ScrollView from "../components/ScrollView";
import Section from "../components/Section";
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
  const navigate = useNavigate();

  return (
    <>
      <Header title="JMDB" />
      <div className="pt-20">
        <Section
          headerTitle="Discover"
          onViewAllClick={() => navigate("/discover")}
        >
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
      </div>
    </>
  );
}
