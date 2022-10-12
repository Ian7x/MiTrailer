import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import Movie from "./components/Movie";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Genres from "./components/Genres";
import useGenre from "./components/useGenres";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  /* */
  const API_KEY = "a9c77a1f7634b5e9116ad59e1f9a55a7";
  const MOVIE_API = "https://api.themoviedb.org/3/";
  const SEARCH_API = MOVIE_API + "search/movie";
  const DISCOVER_API = MOVIE_API + "discover/movie/";

  //States
  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreURL = useGenre(selectedGenres);

  const fetchMovies = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const { data } = await axios.get(
      `${searchKey ? SEARCH_API : DISCOVER_API}`,
      {
        params: {
          api_key: API_KEY,
          with_genres: genreURL,
          query: searchKey,
        },
      }
    );

    console.log(data.results[0]);
    setMovies(data.results);
    // setMovie(data.results[0]);
    if (data.results.length) {
      await fetchMovie(data.results[0].id);
      setMovie(data.results.id);
      setSearchKey("");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [genreURL]);

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${MOVIE_API}movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }

    setMovie(data);
  };

  const selectMovie = (movie) => {
    fetchMovie(movie.id);
    setPlaying(false);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  const renderMovies = () =>
    movies.map((movie) => (
      <Movie selectMovie={selectMovie} key={movie.id} movie={movie} />
    ));

  return (
    <div className="App">
      <Navbar
        fetchMovies={fetchMovies}
        setSearchKey={setSearchKey}
        searchKey={searchKey}
      />
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
      ></Genres>

      {movies.length ? (
        <Main
          movie={movie}
          playing={playing}
          trailer={trailer}
          setPlaying={setPlaying}
          renderMovies={renderMovies}
        />
      ) : (
        <div className="error">
          <h1>Sorry no movies found!</h1>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
}

export default App;
