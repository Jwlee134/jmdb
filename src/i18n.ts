import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import useBoundStore from "./store/index";

const resources = {
  en: {
    translation: {
      home: "Home",
      nowPlaying: "nowPlaying",
      upcoming: "upcoming",
      topRated: "topRated",
      discover: "Discover",
      trendingMovies: "Trending Movies",
      trendingPeople: "Trending People",
      searchByKeyword: "Search by keyword.",
      favorites: "Favorites",
      nothingToDisplay: "Nothing to display! 😣",
      colorTheme: "Color Theme",
      light: "Light",
      dark: "Dark",
      system: "System",
      viewAll: "View all",
      filters: "Filters",
      sortBy: "Sort By",
      runtime: "Runtime",
      rating: "Rating",
      gte: "gte",
      lte: "lte",
      genres: "Genres",
      whereToWatch: "Where To Watch",
      basedOnMyLoc: "Based on your location: {{location}}",
      seeFiltered: "See {{n}} movie{{s}}",
      seeTotalReviews: "See {{n}} reviews",
      totalReviews: "{{n}} reviews",
      overview: "Overview",
      casts: "Casts",
      videos: "Videos",
      reviews: "Reviews",
      readMore: "Read more",
      readLess: "Read less",
      similarMovies: "Similar Movies",
      biography: "Biography",
      gallery: "Gallery",
      movieCredits: "Movie Credits",
      settings: "Settings",
      noInfo: "No data.",
      lang: "Language",
      sorting: {
        popularAsec: "Popularity Ascending",
        popularDesc: "Popularity Descending",
        dateAsec: "Release Date Ascending",
        dateDesc: "Release Date Descending",
        titleAsec: "Title (A-Z)",
        titleDesc: "Title (Z-A)",
        ratingAsec: "Rating Ascending",
        ratingDesc: "Rating Descending",
        voteNumAsec: "Vote Count Ascending",
        voteNumDesc: "Vote Count Descending",
      },
    },
  },
  ko: {
    translation: {
      home: "홈",
      nowPlaying: "현재 상영 중",
      upcoming: "개봉 예정",
      topRated: "높은 평점",
      discover: "탐색",
      trendingMovies: "인기 영화",
      trendingPeople: "인기 배우",
      searchByKeyword: "키워드로 검색",
      favorites: "위시리스트",
      nothingToDisplay: "아무것도 없네요! 😣",
      colorTheme: "색",
      light: "낮",
      dark: "밤",
      system: "시스템",
      viewAll: "모두 보기",
      filters: "필터",
      sortBy: "정렬",
      runtime: "러닝타임",
      rating: "평점",
      gte: "이상",
      lte: "이하",
      genres: "장르",
      whereToWatch: "스트리밍 서비스",
      basedOnMyLoc: "현재 위치 기반: {{location}}",
      seeFiltered: "{{n}}개의 영화 보기",
      seeTotalReviews: "{{n}}개의 리뷰 보기",
      totalReviews: "{{n}}개의 리뷰",
      overview: "개요",
      casts: "출연진",
      videos: "동영상",
      reviews: "리뷰",
      readMore: "펼치기",
      readLess: "접기",
      similarMovies: "비슷한 영화",
      biography: "소개",
      gallery: "갤러리",
      movieCredits: "출연작",
      settings: "설정",
      noInfo: "정보 없음",
      lang: "언어",
      sorting: {
        popularAsec: "인기도 오름차순",
        popularDesc: "인기도 내림차순",
        dateAsec: "개봉일 오름차순",
        dateDesc: "개봉일 내림차순",
        titleAsec: "제목 오름차순",
        titleDesc: "제목 내림차순",
        ratingAsec: "평점 오름차순",
        ratingDesc: "평점 내림차순",
        voteNumAsec: "평점수 오름차순",
        voteNumDesc: "평점수 내림차순",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: useBoundStore.getState().lng, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;