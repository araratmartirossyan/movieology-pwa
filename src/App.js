import React from "react";
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
import Icon24LogoInstagram from "@vkontakte/icons/dist/24/logo_instagram";
import Icon24LogoGoogle from "@vkontakte/icons/dist/24/logo_google";

import Home from "./pages/Home/Home";
import MovieCard from "./pages/Movie/Movie";

import "@vkontakte/vkui/dist/vkui.css";
import "./styles/global.css";

const authTypes = {
  google: googleAuth,
  fb: googleAuth
};

export default class App extends React.Component {
  state = {
    isAuthorized: true,
    user: {},
    loaded: false,
    activeView: "welcome",
    movie: {}
  };

  async componentDidMount() {
    const { view = "welcome", movieId = null } = getObjectUrlString();
    const userId = localStorage.getItem("userId");

    if (userId) {
      const user = await fetchUserProfile();
      this.setState({ isAuthorized: true, user });
    } else {
      this.setState({ isAuthorized: false });
    }

    if (movieId) {
      this.setState({
        activeView: view
      });
      this.setMovieOnInit(movieId);
    }
  }

  setMovieOnInit = async movieId => {
    try {
      const fetchedMovie = await handleFetchMovie(movieId);
      this.setState({
        ...fetchedMovie
      });
    } catch (err) {
      throw err;
    }
  };

  handleAuth = async type => {
    try {
      const user = await authTypes[type]();
      this.setState({ isAuthorized: true, user });
    } catch (err) {
      throw err;
    }
  };

  handleFindMovie = async () => {
    this.setState({ loaded: false });
    const movies = await fetchMovies();
    const randomMovieId = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomMovieId];
    const isFavorite = this.state.isAuthorized
      ? await checkIsFav(randomMovie._id)
      : false;
    this.setState({
      movie: {
        ...randomMovie,
        isFavorite
      }
    });
    setTimeout(() => this.setState({ loaded: true }), 1300);
    setTimeout(() => this.setState({ activeView: "movie" }), 2000);
  };

  likeHandler = async (movieId = null) => {
    if (movieId) {
      await handleLike(movieId);
    } else {
      await handleUnLike();
    }
    const { movie } = this.state;
    this.setState({
      movie: {
        ...movie,
        isFavorite: movieId ? true : false
      }
    });
  };

  render() {
    const { loaded, activeView, isAuthorized, movie } = this.state;
    return (
      <Root activeView={activeView}>
        <View header={false} activePanel="welcome_panel" id="welcome">
          <Panel id="welcome_panel">
            <Home onFindMovie={this.handleFindMovie} loaded={loaded} />
            {!isAuthorized && (
              <Div className="auth-block">
                <Button
                  size="l"
                  stretched
                  aria-label="auth-button-instagram"
                  role="button"
                  mode="overlay_outline"
                  style={{ marginRight: 8 }}
                  onClick={() => this.handleAuth("fb")}
                >
                  <Icon24LogoInstagram color="#fff" />
                </Button>
                <Button
                  size="l"
                  stretched
                  role="button"
                  aria-label="auth-button-google"
                  mode="overlay_outline"
                  onClick={() => this.handleAuth("google")}
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
                goBack={() => this.setState({ activeView: "welcome" })}
                showImage={showImage}
                onLike={this.likeHandler}
                onUnLike={this.likeHandler}
                onMovieShare={onMovieShare}
              />
            )}
          </Panel>
        </View>
      </Root>
    );
  }
}
