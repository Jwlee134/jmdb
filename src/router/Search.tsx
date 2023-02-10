import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Poster from "../components/Poster";
import Profile from "../components/Profile";
import ScrollView from "../components/ScrollView";
import Section from "../components/Section";
import { trending } from "../libs/api/trending";
import { GENRES } from "../libs/constants";
import useDebounce from "../libs/hooks/useDebounce";
import { FiSearch } from "react-icons/fi";
import { search as api } from "../libs/api/movies";
import { useEffect } from "react";
import SearchResults from "../components/SearchResults";

interface IForm {
  query: string;
}

export default function Search() {
  const { data: movies } = useQuery({
    queryKey: ["trending", "movie"],
    queryFn: trending.getTrendingMovies,
  });
  const { data: people } = useQuery({
    queryKey: ["trending", "person"],
    queryFn: trending.getTrendingCelebs,
  });

  const { search } = useLocation();
  const { register, watch } = useForm<IForm>({
    defaultValues: { query: new URLSearchParams(search).get("q") || "" },
  });
  const value = useDebounce(watch("query"));
  const navigate = useNavigate();
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["search", "movies", value],
    queryFn: api.getMovies,
    enabled: !!value,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });

  useEffect(() => {
    navigate(value ? `/search?q=${value}` : "/search", { replace: true });
  }, [value, navigate]);

  return (
    <>
      <form className="flex items-center p-6 pb-0">
        <label
          htmlFor="search"
          className="bg-neutral-800 h-10 grid place-items-center w-8 text-gray-400 rounded-l-md"
        >
          <FiSearch />
        </label>
        <input
          {...register("query")}
          id="search"
          className="outline-none bg-neutral-800 text-sm grow h-10 placeholder:text-gray-500 rounded-r-md"
          placeholder="Search by keyword."
        />
      </form>
      {!value ? (
        <>
          <Section headerTitle="Trending Movies">
            <ScrollView
              data={movies?.results}
              renderItem={(data) => <Poster key={data.id} data={data} />}
            />
          </Section>
          <Section headerTitle="Genres">
            <div className="flex flex-wrap px-6 gap-3">
              {GENRES.sort((a, b) =>
                a.name > b.name ? 1 : a.name < b.name ? -1 : 0
              ).map((genre) => (
                <Link
                  className="text-sm bg-neutral-800 rounded-lg p-2"
                  key={genre.id}
                  to={`/discover?with_genres=${genre.id}`}
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
                <Profile key={data.id} data={data} showCharacter={false} />
              )}
            />
          </Section>
        </>
      ) : (
        <SearchResults data={data} fetchNextPage={fetchNextPage} />
      )}
    </>
  );
}
