interface IMovie {
  poster_path?: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path?: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface Paginator {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface IMovies extends Paginator {
  results: IMovie[];
}

export interface IMovieDetail extends IMovie {
  genres: { id: number; name: string }[];
  production_countries: { /** US */ iso_3166_1: string; name: string }[];
  runtime?: number;
  tagline?: string;
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

export interface IReviews extends Paginator {
  id: number;
  results: {
    author: string;
    author_details: {
      name: string;
      username: string;
      avatar_path?: string;
      rating?: number;
    };
    name: string;
    username: string;
    avatar_path?: string;
    rating?: number;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
  };
}

export interface IVideos {
  id: number;
  results: {
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
  };
}

export interface IPerson {
  birthday: string;
  known_for_department: string;
  deathday?: string;
  id: number;
  name: string;
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
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
