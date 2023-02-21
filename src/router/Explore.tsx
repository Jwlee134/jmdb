import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Poster from "../components/Poster";
import Profile from "../components/Profile";
import ScrollView from "../components/containers/ScrollContainer";
import Section from "../components/Section";
import { trending } from "../libs/api/trending";
import { GENRES } from "../libs/constants";
import useDebounce from "../libs/hooks/useDebounce";
import { FiSearch } from "react-icons/fi";
import { search as api } from "../libs/api/movies";
import { useEffect } from "react";
import SearchResults from "../components/SearchResults";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Helmet } from "react-helmet";

interface IForm {
  query: string;
}

export default function Explore() {
  const { data: movies } = useQuery({
    queryKey: ["trending", "movie"],
    queryFn: trending.getTrendingMovies,
  });
  const { data: people } = useQuery({
    queryKey: ["trending", "person"],
    queryFn: trending.getTrendingCelebs,
  });

  const { search } = useLocation();
  const { register, watch, setValue } = useForm<IForm>({
    defaultValues: { query: new URLSearchParams(search).get("q") || "" },
  });
  const value = useDebounce(watch("query"));
  const navigate = useNavigate();
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["search", "movies", value],
    queryFn: api.getMovies,
    enabled: !!value,
    getNextPageParam: (lastPage) =>
      lastPage.page + 1 === lastPage.total_pages
        ? undefined
        : lastPage.page + 1,
  });

  useEffect(() => {
    navigate(value ? `/explore?q=${value}` : "/explore", { replace: true });
  }, [value, navigate]);

  return (
    <>
      <Helmet>
        <title>JMDB | Explore</title>
      </Helmet>
      <form
        className="flex items-center p-6 pb-0 relative"
        onSubmit={(e) => e.preventDefault()}
      >
        <label
          htmlFor="search"
          className="bg-neutral-100 dark:bg-neutral-800 h-10 grid place-items-center w-8 text-gray-400 rounded-l-md"
        >
          <FiSearch />
        </label>
        <input
          {...register("query")}
          id="search"
          className="outline-none bg-neutral-100 dark:bg-neutral-800 text-sm grow h-10 placeholder:text-gray-500 rounded-r-md"
          placeholder="Search by keyword."
        />
        {watch("query") ? (
          <button
            type="button"
            className="absolute text-gray-400 right-6 w-10 h-10 grid place-items-center"
            onClick={() => setValue("query", "")}
          >
            <IoCloseCircleOutline />
          </button>
        ) : null}
      </form>
      {!watch("query") ? (
        <>
          <Section headerTitle="Trending Movies">
            <ScrollView
              data={movies?.results}
              renderItem={(data) => <Poster key={data.item.id} {...data} />}
              cacheKey="trendingMovies"
            />
          </Section>
          <Section headerTitle="Genres">
            <div className="flex flex-wrap px-6 gap-3">
              {GENRES.sort((a, b) =>
                a.name > b.name ? 1 : a.name < b.name ? -1 : 0
              ).map((genre) => (
                <Link
                  className="text-sm bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2"
                  key={genre.id}
                  to={`/discover?with_genres=${genre.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </Section>
          <Section headerTitle="Trending People">
            <ScrollView
              data={people?.results}
              renderItem={(data) => (
                <Profile key={data.item.id} {...data} showCharacter={false} />
              )}
              cacheKey="trendingPeople"
            />
          </Section>
        </>
      ) : (
        <SearchResults data={data} fetchNextPage={fetchNextPage} />
      )}
    </>
  );
}
