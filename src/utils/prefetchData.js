// Api Calls
import MovieService from "../services/movieService";
import UserService from "../services/userService";
import VkService from "../services/vkService";

const movieService = new MovieService();
const userService = new UserService();
const vkService = new VkService();

export const googleAuth = async () => {
  const user = await userService.googleAuth();
  return {
    user
  };
};

export const fetchUserProfile = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const userProfile = await userService.getProfile(userId);
    return userProfile;
  } catch (err) {
    throw err;
  }
};

export const fetchMovies = async () => {
  try {
    const movies = await movieService.fetchMovies();
    return movies;
  } catch (err) {
    throw err;
  }
};

export const handleLike = async movieId => {
  try {
    const like = await movieService.like(movieId);
    return like;
  } catch (error) {
    throw error;
  }
};

export const checkIsFav = async movieId => {
  try {
    const isFav = await movieService.checkIsFav(movieId);
    return isFav;
  } catch (error) {
    throw error;
  }
};

export const showImage = img => userService.showImage(img);

export const handleUnLike = async () => {
  try {
    const result = await movieService.unlike();
    return result;
  } catch (err) {
    throw err;
  }
};

export const onMovieShare = movieId => vkService.onMovieShare(movieId);

export const handleFetchMovie = async movieId => {
  try {
    const movie = await movieService.fetchMovie(movieId);
    const isFavorite = await movieService.checkIsFav(movieId);
    return {
      ...movie,
      isFavorite
    };
  } catch (err) {
    throw err;
  }
};
