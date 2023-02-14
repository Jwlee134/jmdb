import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HeaderContainer from "../components/containers/HeaderContainer";
import Poster from "../components/Poster";
import ScaleCarousel from "../components/ScaleCarousel";
import ScrollView from "../components/containers/ScrollContainer";
import Section from "../components/Section";
import { discover, movies } from "../libs/api/movies";
import { placeholders } from "../libs/utils";
import useIntersectionObserver from "../libs/hooks/useIntersectionObserver";

export default function Movies() {
  const { data } = useQuery({
    queryKey: ["discover", "movies"],
    queryFn: discover.getDiscoveredMovies,
  });
  const { data: nowPlaying, fetchNextPage: fetchNextNowPlaying } =
    useInfiniteQuery({
      queryKey: ["movies", "nowPlaying"],
      queryFn: movies.getNowPlaying,
      getNextPageParam: (lastPage) => lastPage.page + 1,
    });
  const { data: upcoming, fetchNextPage: fetchNextUpcoming } = useInfiniteQuery(
    {
      queryKey: ["movies", "upcoming"],
      queryFn: movies.getUpcoming,
      getNextPageParam: (lastPage) => lastPage.page + 1,
    }
  );
  const { data: topRated, fetchNextPage: fetchNextTopRated } = useInfiniteQuery(
    {
      queryKey: ["movies", "topRated"],
      queryFn: movies.getTopRated,
      getNextPageParam: (lastPage) => lastPage.page + 1,
    }
  );
  const ref1 = useIntersectionObserver(fetchNextNowPlaying);
  const ref2 = useIntersectionObserver(fetchNextUpcoming);
  const ref3 = useIntersectionObserver(fetchNextTopRated);
  const navigate = useNavigate();

  return (
    <HeaderContainer Header={<Header title="JMDB" showBackBtn={false} />}>
      <Section
        headerTitle="Discover"
        onViewAllClick={() => navigate("/discover")}
      >
        <ScaleCarousel data={data?.results || placeholders(20)} />
      </Section>
      <Section headerTitle="Now Playing">
        <ScrollView
          data={nowPlaying?.pages.map((page) => page.results).flat()}
          renderItem={(data) => <Poster key={data.item.id} {...data} />}
          cacheKey="nowPlaying"
          infiniteRef={<div ref={ref1} />}
        />
      </Section>
      <Section headerTitle="Upcoming">
        <ScrollView
          data={upcoming?.pages.map((page) => page.results).flat()}
          renderItem={(data) => <Poster key={data.item.id} {...data} />}
          cacheKey="upcoming"
          infiniteRef={<div ref={ref2} />}
        />
      </Section>
      <Section headerTitle="Top Rated">
        <ScrollView
          data={topRated?.pages.map((page) => page.results).flat()}
          renderItem={(data) => <Poster key={data.item.id} {...data} />}
          cacheKey="topRated"
          infiniteRef={<div ref={ref3} />}
        />
      </Section>
    </HeaderContainer>
  );
}
