import axios from "axios";

const API_KEY = "8acfa0aece876055b4f26b6c1a000307";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: API_KEY },
});

export default instance;
