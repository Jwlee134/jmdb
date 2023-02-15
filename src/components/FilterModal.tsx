import { GENRES, PROVIDERS, SORT_BY } from "../libs/constants";
import { cls, makeImgPath } from "../libs/utils";
import useBoundStore from "../store";
import ModalContainer from "./containers/ModalContainer";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { shallow } from "zustand/shallow";
import { discover } from "../libs/api/movies";
import { useLocation, useNavigate } from "react-router-dom";
import { DeepPartial } from "../libs/utils/types";

interface IForm {
  sort_by: string;
  with_runtime: { gte: string; lte: string };
  vote_average: { gte: string; lte: string };
  with_genres: string[];
  with_watch_providers: string[];
}

function parseFilterObj(value: DeepPartial<IForm>, countryCode: string) {
  let res = Object.entries(value)
    .filter(([_, v]) => {
      if (!Array.isArray(v) && typeof v === "object")
        return Boolean(Object.entries(v).filter(([_, v]) => Boolean(v)).length);
      if (Array.isArray(v)) return Boolean(v.length);
      return Boolean(v);
    })
    .map(([n, v]) => {
      if (Array.isArray(v)) return `${n}=${v.join(",")}`;
      if (!Array.isArray(v) && typeof v === "object")
        return Object.entries(v)
          .filter(([_, v]) => Boolean(v))
          .map((v) => `${n}.${v[0]}=${v[1]}`)
          .join("&");
      return `${n}=${v}`;
    })
    .join("&");
  if (res.includes("with_watch_providers"))
    res += `&watch_region=${countryCode}`;
  return res;
}

function Body() {
  const {
    countryName,
    countryCode,
    setTotalResults,
    closeModal,
    totalResults,
    query,
    setQuery,
  } = useBoundStore(
    (state) => ({
      countryName: state.countryName,
      countryCode: state.countryCode,
      setTotalResults: state.setTotalResults,
      closeModal: state.closeModal,
      totalResults: state.totalResults,
      query: state.query,
      setQuery: state.setQuery,
    }),
    shallow
  );
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryObj = new URLSearchParams(search);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      sort_by: queryObj.get("sort_by") || SORT_BY[1][0],
      with_watch_providers:
        queryObj.get("with_watch_providers")?.split(",") || [],
      with_genres: queryObj.get("with_genres")?.split(",") || [],
      with_runtime: {
        gte: queryObj.get("with_runtime.gte") || "",
        lte: queryObj.get("with_runtime.lte") || "",
      },
      vote_average: {
        gte: queryObj.get("vote_average.gte") || "",
        lte: queryObj.get("vote_average.lte") || "",
      },
    },
  });
  const ref = useRef<NodeJS.Timeout>();

  const onValid = () => {
    if (!totalResults) return;
    closeModal();
    navigate(`/discover?${query}`, { replace: true });
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (ref.current) clearTimeout(ref.current);
      ref.current = setTimeout(() => {
        const query = parseFilterObj(value, countryCode);
        setQuery(query);
        discover.getTotalResults(query).then((res) => {
          setTotalResults(res);
        });
      }, 500);
    });
    return () => subscription.unsubscribe();
  }, [watch, countryCode, setTotalResults, setQuery]);

  return (
    <form className="space-y-4 p-4" onSubmit={handleSubmit(onValid)}>
      <div>
        <label htmlFor="sortBy">Sort By</label>
        <select
          id="sortBy"
          className="bg-black outline-none w-full text-gray-400"
          {...register("sort_by")}
        >
          {SORT_BY.map((option, i) => (
            <option key={i} value={option[0]}>
              {option[1]}
            </option>
          ))}
        </select>
      </div>
      <div className="max-sm:space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:place-items-start">
        <div className="space-y-1">
          <label>Runtime</label>
          <div className="flex justify-center items-center space-x-3">
            <span className="text-gray-400">gte: </span>
            <input
              type="number"
              {...register("with_runtime.gte", {
                maxLength: 3,
                validate: { noString: (v) => (v ? !isNaN(parseInt(v)) : true) },
              })}
              className={cls(
                "bg-black w-16 border border-gray-600 rounded-full px-3 py-1 text-gray-400 outline-none",
                errors.with_runtime?.gte ? "border-red-500" : ""
              )}
            />
            <span className="text-gray-400">lte: </span>
            <input
              type="number"
              {...register("with_runtime.lte", {
                maxLength: 3,
                validate: { noString: (v) => (v ? !isNaN(parseInt(v)) : true) },
              })}
              className={cls(
                "bg-black w-16 border border-gray-600 rounded-full px-3 py-1 text-gray-400 outline-none",
                errors.with_runtime?.lte ? "border-red-500" : ""
              )}
            />
          </div>
        </div>
        <div className="space-y-1">
          <label>Rating</label>
          <div className="flex justify-center items-center space-x-3">
            <span className="text-gray-400">gte: </span>
            <input
              type="number"
              {...register("vote_average.gte", {
                validate: {
                  moreThan10: (v) =>
                    v ? parseInt(v) <= 10 && parseInt(v) >= 0 : true,
                  noString: (v) => (v ? !isNaN(parseInt(v)) : true),
                },
              })}
              className={cls(
                "bg-black w-16 border border-gray-600 rounded-full px-3 py-1 text-gray-400 outline-none",
                errors.vote_average?.gte ? "border-red-500" : ""
              )}
            />
            <span className="text-gray-400">lte: </span>
            <input
              type="number"
              {...register("vote_average.lte", {
                validate: {
                  moreThan10: (v) =>
                    v ? parseInt(v) <= 10 && parseInt(v) >= 0 : true,
                  noString: (v) => (v ? !isNaN(parseInt(v)) : true),
                },
              })}
              className={cls(
                "bg-black w-16 border border-gray-600 rounded-full px-3 py-1 text-gray-400 outline-none",
                errors.vote_average?.lte ? "border-red-500" : ""
              )}
            />
          </div>
        </div>
      </div>
      <div>
        <label>Genres</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-2 gap-y-4 md:gap-x-2">
          {GENRES.map((genre) => (
            <div key={genre.id} className="flex items-center">
              <input
                {...register("with_genres")}
                type="checkbox"
                className="appearance-none grid place-content-center w-4 h-4 border rounded border-gray-400 before:content-[''] before:bg-gray-300 before:w-2 before:h-2 before:rounded-sm before:scale-0 before:transition-transform checked:before:scale-100"
                id={genre.id + ""}
                value={genre.id}
              />
              <label htmlFor={genre.id + ""} className="ml-2 text-gray-400">
                {genre.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>Where To Watch</label>
        <p className="text-xs text-gray-500">
          Based on your location: {countryName}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-2">
          {PROVIDERS.map((provider) => (
            <div key={provider.provider_id}>
              <input
                id={provider.provider_id + ""}
                {...register("with_watch_providers")}
                type="checkbox"
                className="hidden"
                value={provider.provider_id}
              />
              <label htmlFor={provider.provider_id + ""}>
                <div className="relative">
                  <img
                    src={makeImgPath(provider.logo_path, 154)}
                    alt="Provider"
                    className="object-cover rounded-lg"
                  />
                  <AnimatePresence>
                    {watch("with_watch_providers").includes(
                      provider.provider_id + ""
                    ) ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="absolute top-0 left-0 right-0 bottom-0 grid place-items-center text-4xl bg-[#00000080]"
                      >
                        <AiOutlineCheckCircle />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  {provider.provider_name}
                </p>
              </label>
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="bg-gray-800 w-full h-16 rounded-lg">
        {totalResults
          ? `See ${totalResults} movie${totalResults === 1 ? "" : "s"}`
          : "No movies to display."}
      </button>
    </form>
  );
}

export default function FilterModal() {
  return (
    <ModalContainer title="Filters">
      <Body />
    </ModalContainer>
  );
}
