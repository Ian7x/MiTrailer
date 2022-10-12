import React from "react";
import Youtube from "react-youtube";
export default function Main({
  trailer,
  setPlaying,
  movie,
  renderMovies,
  playing,
}) {
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";

  return (
    <main>
      {movie ? (
        <div
          className="poster"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`,
          }}
        >
          {playing ? (
            <>
              <Youtube
                videoId={trailer.key}
                className={"youtube"}
                containerClassName={"youtube-container "}
                opts={{
                  width: "100%",
                  height: "540px",
                  playerVars: {
                    autoplay: 1,
                    controls: 0,
                  },
                }}
              />
              <button
                onClick={() => setPlaying(false)}
                className={"button close-video"}
              >
                X
              </button>
            </>
          ) : (
            <div className="center-max-size">
              <div className="poster-content">
                {trailer ? (
                  <button
                    className={"button play-video"}
                    onClick={() => setPlaying(true)}
                    type="button"
                  >
                    Play
                  </button>
                ) : (
                  "Sorry, no trailer available"
                )}
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
              </div>
            </div>
          )}
        </div>
      ) : null}
      <div className={"center-max-size container"}>{renderMovies()}</div>
    </main>
  );
}
