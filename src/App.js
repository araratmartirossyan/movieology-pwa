import React, { useState, useEffect } from "react";
import { View, Root, Panel, Button, Div } from "@vkontakte/vkui";
import {
  handleLike,
  fetchMovies,
  checkIsFav,
  showImage,
  handleUnLike,
  onMovieShare,
  handleFetchMovie,
  googleAuth,
  fetchUserProfile
} from "./utils/prefetchData";

import { getObjectUrlString } from "./utils/urlParams";
import Icon24LogoFacebook from "@vkontakte/icons/dist/24/logo_facebook";
import Icon24LogoGoogle from "@vkontakte/icons/dist/24/logo_google";

import Home from "./pages/Home/Home";
import MovieCard from "./pages/Movie/Movie";

import "@vkontakte/vkui/dist/vkui.css";
import "./styles/global.css";

const authTypes = {
  google: googleAuth,
  fb: googleAuth
};

const App = () => {
  const [state, setState] = useState({
    isAuthorized: true,
    user: {}
  });
  const [loaded, setLoaded] = useState({ loaded: false });
  const [activeView, setActiveView] = useState("welcome");
  const [movie, setMovie] = useState(null);

  const handleFindMovie = async () => {
    setLoaded({ loaded: false });
    const movies = await fetchMovies();
    const randomMovieId = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomMovieId];
    const isFavorite = await checkIsFav(randomMovie._id);
    setMovie({
      ...randomMovie,
      isFavorite
    });
    setTimeout(() => setLoaded({ loaded: true }), 1300);
    setTimeout(() => setActiveView("movie"), 2000);
  };

  const likeHandler = async (movieId = null) => {
    if (movieId) {
      await handleLike(movieId);
    } else {
      await handleUnLike();
    }
    setMovie({
      ...movie,
      isFavorite: movieId ? true : false
    });
  };

  useEffect(() => {
    const { view = "welcome", movieId = null } = getObjectUrlString();
    const userId = localStorage.getItem("userId");
    const prefetch = async () => {
      if (userId) {
        const user = await fetchUserProfile();
        setState({ isAuthorized: true, user });
      } else {
        setState({ isAuthorized: false });
      }
    };

    if (movieId) {
      setActiveView(view);
      setMovieOnInit(movieId);
    }
    prefetch();
  }, []);

  const setMovieOnInit = async movieId => {
    try {
      const fetchedMovie = await handleFetchMovie(movieId);
      setMovie({
        ...fetchedMovie
      });
    } catch (err) {
      throw err;
    }
  };

  const handleAuth = async type => {
    try {
      const user = await authTypes[type]();
      setState({ isAuthorized: true, user });
    } catch (err) {
      throw err;
    }
  };

  return (
    <Root activeView={activeView}>
      <View header={false} activePanel="welcome_panel" id="welcome">
        <Panel id="welcome_panel">
          <Home onFindMovie={handleFindMovie} loaded={state.loaded} />
          {!state.isAuthorized && (
            <Div className="auth-block">
              <Button
                size="l"
                stretched
                aria-label="auth-button-instagram"
                role="button"
                mode="overlay_outline"
                style={{ marginRight: 8 }}
                onClick={() => handleAuth("fb")}
              >
                <Icon24LogoFacebook color="#fff" />
              </Button>
              <Button
                size="l"
                stretched
                role="button"
                aria-label="auth-button-google"
                mode="overlay_outline"
                onClick={() => handleAuth("google")}
              >
                <Icon24LogoGoogle />
              </Button>
            </Div>
          )}
        </Panel>
      </View>
      <View header={false} activePanel="movie_panel" id="movie">
        <Panel id="movie_panel" style={{ backgroundColor: "#1e1b26" }}>
          {movie && (
            <MovieCard
              movie={movie}
              goBack={() => setActiveView("welcome")}
              showImage={showImage}
              onLike={likeHandler}
              onUnLike={likeHandler}
              onMovieShare={onMovieShare}
            />
          )}
        </Panel>
      </View>
    </Root>
  );
};

export default App;
