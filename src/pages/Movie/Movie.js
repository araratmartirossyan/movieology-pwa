import React from "react";
import { Button } from "@vkontakte/vkui";
import Icon24ShareExternal from "@vkontakte/icons/dist/24/share_external";
import Icon16LikeOutline from "@vkontakte/icons/dist/16/like_outline";
import Icon16Like from "@vkontakte/icons/dist/16/like";
import Icon28FavoriteOutline from "@vkontakte/icons/dist/28/favorite_outline";

import "./Movie.css";

const MovieView = ({
  movie: {
    Title,
    Poster,
    Plot,
    Actors,
    Rated,
    Runtime,
    Genre,
    imdbRating,
    isFavorite,
    _id
  },
  goBack,
  onLike,
  showImage,
  onUnLike,
  onMovieShare
}) => {
  return (
    <div className="wrap">
      <div className="cellphone-container">
        <div className="movie">
          <div
            onClick={() => showImage(Poster)}
            className="movie-img"
            style={{
              backgroundImage: `url(${Poster})`,
              backgroundSize: "cover"
            }}
          ></div>
          <div className="text-movie-cont">
            <div className="mr-grid">
              <div className="col1">
                <h2 className="title">{Title}</h2>
                <ul className="movie-gen">
                  <li>{Rated} /</li>
                  <li>{Runtime} /</li>
                  <li>{Genre}</li>
                </ul>
              </div>
            </div>
            <div className="mr-grid summary-row">
              <div className="col2">
                <h3>Описание:</h3>
              </div>
              <div className="col2">
                <div className="movie-likes">
                  <Icon28FavoriteOutline width={20} height={20} />
                  <span>{imdbRating}</span>
                </div>
              </div>
            </div>
            <div className="mr-grid">
              <div className="col1">
                <p className="movie-description">{Plot}</p>
              </div>
            </div>
            <div className="mr-grid actors-row">
              <div className="col1">
                <p className="movie-actors">{Actors.split("...")[0]}</p>
              </div>
            </div>
            <div className="mr-grid action-row">
              <div className="col6 action-btn">
                {!isFavorite ? (
                  <Icon16LikeOutline
                    width={30}
                    height={30}
                    style={{ color: "#fe4141" }}
                    onClick={() => onLike(_id)}
                  />
                ) : (
                  <Icon16Like
                    width={30}
                    height={30}
                    style={{ color: "#fe4141" }}
                    onClick={() => onUnLike()}
                  />
                )}
              </div>
              <div className="col6 action-btn">
                <Icon24ShareExternal
                  width={30}
                  height={30}
                  style={{ color: "#fe4141" }}
                  onClick={() => onMovieShare(_id)}
                />
              </div>
            </div>
            <div className="back-btn">
              <Button size="xl" level="outline" onClick={goBack}>
                Назад
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieView;
