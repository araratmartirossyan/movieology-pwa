import axios from "axios";

const urls = {
  movies: "https://api.themoviedb.org",
  api: "https://movie.incodewetrust.dev",
  omdb: "https://www.omdbapi.com",
  insta: "https://api.instagram.com",
  prediction: 'http://localhost:3000'
};

// http://www.omdbapi.com/?i=tt3896198&apikey=f5f111a3

// const API_KEY = "ca7b0635ffccf1dfb0cd5e2673609810";
const API_KEY = "f5f111a3";
export const request = async (method, url, endpoint, params = {}) => {
  try {
    const computedUrl = endpoint === "omdb" ? `${url}&apikey=${API_KEY}` : url;
    const { data } = await axios({
      url: `${urls[endpoint]}/${computedUrl}`,
      method,
      data: params
    });
    return data;
  } catch (err) {
    return err;
  }
};
