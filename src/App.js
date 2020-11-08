import React, { useEffect, useState } from "react";
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
import Icon24LogoGoogle from "@vkontakte/icons/dist/24/logo_google";

import Home from "./pages/Home/Home";
import MovieCard from "./pages/Movie/Movie";

import "@vkontakte/vkui/dist/vkui.css";
import "./styles/global.css";

const authTypes = {
  google: googleAuth,
  // fb: googleAuth
};

const App = () => {
  const [isAuthorized, setAuth] = useState(false)
  const [user, setUser] = useState({})
  const [movie, setMovie] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [activeView, setActiveView] = useState('welcome')

  const setMovieOnInit = async movieId => {
    try {
      const fetchedMovie = await handleFetchMovie(movieId);
      setMovie(fetchedMovie)
    } catch (err) {
      throw err;
    }
  };

  const handleAuth = async type => {
    try {
      const user = await authTypes[type]();
      setAuth(true)
      setUser(user)
    } catch (err) {
      throw err;
    }
  };

  const handleFindMovie = async () => {
    setLoaded(false);
    const movies = await fetchMovies();
    const randomMovieId = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomMovieId];

    const isFavorite = isAuthorized
      ? await checkIsFav(randomMovie._id)
      : false;
    setMovie({
      ...randomMovie,
      isFavorite
    })

    setTimeout(() => setLoaded(true), 1300);
    setTimeout(() => setActiveView('movie'), 2000);
  };

  const likeHandler = async (movieId = null) => {
    if (movieId) {
      await handleLike(movieId);
    } else {
      await handleUnLike();
    }
    const { movie } = this.state;
    setMovie({
      ...movie,
      isFavorite: movieId ? true : false
    })
  };


  useEffect(() => {
    const { view = "welcome", movieId = null } = getObjectUrlString();
    const userId = localStorage.getItem("userId");

    if (userId) {
      fetchUserProfile().then(user => {
        setAuth(true)
        setUser(user)
      });
    }

    if (movieId) {
      setActiveView(view)
      setMovieOnInit(movieId);
    }
  }, [])

  const renderAuthButton = () => (
    <Div className="auth-block">
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
  );

  return (
    <Root activeView={activeView}>
      <View header={false} activePanel="welcome_panel" id="welcome">
        <Panel id="welcome_panel">
          <Home onFindMovie={handleFindMovie} loaded={loaded} />
          {!isAuthorized && renderAuthButton()}
        </Panel>
      </View>
      <View header={false} activePanel="movie_panel" id="movie">
        <Panel id="movie_panel" style={{ backgroundColor: "#1e1b26" }}>
          {movie && (
            <MovieCard
              movie={movie}
              goBack={() => setActiveView('welcome')}
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

}

export default App
