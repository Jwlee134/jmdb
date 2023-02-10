interface IMovieTV {
  poster_path?: string;
  popularity: number;
  id: number;
  backdrop_path?: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  original_language: string;
  vote_count: number;
}

interface IMovie extends IMovieTV {
  adult: boolean;
  release_date: string;
  original_title: string;
  title: string;
  video: boolean;
}

interface ITV extends IMovieTV {
  first_air_date: string;
  origin_country: string[];
  name: string;
  originam_name: string;
}

interface Paginator {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface IMovies extends Paginator {
  results: IMovie[];
}

export interface ITVs extends Paginator {
  results: ITV[];
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCountries {
  /** US */ iso_3166_1: string;
  name: string;
}

interface ProductionCompanies {
  id: number;
  name: string;
  logo_path?: string;
  origin_country: string;
}

interface IMovieTVDetail {
  genres: Genre[];
  production_countries: ProductionCountries[];
  tagline?: string;
}

export interface IMovieDetail
  extends Omit<IMovie, "genre_ids">,
    IMovieTVDetail {
  runtime?: number;
}

export interface ITVDetail extends Omit<ITV, "genre_ids">, IMovieTVDetail {
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path?: string;
  }[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path?: string;
    vote_average: number;
    vote_count: number;
  };
  networks: ProductionCompanies[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ProductionCompanies[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
}

interface ICastCrewCommon {
  adult: boolean;
  gender?: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
}

interface ICast extends ICastCrewCommon {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface ICrew extends ICastCrewCommon {
  credit_id: string;
  department: string;
  job: string;
}

export interface ICredits {
  id: number;
  cast: ICast[];
  crew: ICrew[];
}

interface IReview {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path?: string;
    rating?: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface IReviews extends Paginator {
  id: number;
  results: IReview[];
}

interface IVideo {
  /** en */
  iso_639_1: string;
  /** US */
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface IVideos {
  id: number;
  results: IVideo[];
}

export interface IPerson {
  id: number;
  name: string;
  profile_path?: string;
}

export interface IPersonDetail {
  birthday?: string;
  known_for_department: string;
  deathday?: string;
  id: number;
  name: string;
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth?: string;
  profile_path?: string;
  adult: boolean;
  imdb_id: string;
  homepage?: string;
}

interface ICastCredits extends IMovie {
  character: string;
  credit_id: string;
}

interface ICrewCredits extends IMovie {
  department: string;
  job: string;
  credit_id: string;
}

export interface IPersonMovieCredits {
  id: number;
  cast: ICastCredits[];
  crew: ICrewCredits[];
}

export interface IPeople extends Paginator {
  results: IPerson[];
}
