import axios from "axios";
import React, { useEffect } from "react";
import Chip from "@mui/material/Chip";

export default function Genres({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
}) {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=a9c77a1f7634b5e9116ad59e1f9a55a7&language=en-US`
    );

    setGenres(data.genres);
  };

  console.log(genres);

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres();
    };
  }, []);

  return (
    <div className="chip">
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 5 }}
            clickable
            key={genre.id}
            onDelete={() => handleRemove(genre)}
            color="warning"
          ></Chip>
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            variant="outlined"
            label={genre.name}
            style={{ margin: 5 }}
            clickable
            key={genre.id}
            onClick={() => handleAdd(genre)}
          ></Chip>
        ))}
    </div>
  );
}
