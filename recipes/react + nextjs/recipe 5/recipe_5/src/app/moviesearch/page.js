"use client";

import { useState } from "react";

export default function MovieSearch() {
  const [searchParams, setSearchParams] = useState({
    titleSearchKey: "",
    typekey: "movie",
  });

  const [movies, setMovies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const res = await fetch(
      `http://www.omdbapi.com/?apikey=f1cbc41e&s=${searchParams.titleSearchKey}&type=${searchParams.typekey}`
    );
    const data = await res.json();

    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="idTitleSearchKey">Título:</label>
        <input
          id="idTitleSearchKey"
          name="titleSearchKey"
          value={searchParams.titleSearchKey}
          onChange={handleChange}
        />

        <label htmlFor="idTypeKey">Tipo:</label>
        <select
          id="idTypeKey"
          name="typekey"
          value={searchParams.typekey}
          onChange={handleChange}
        >
          <option value="movie">Filme</option>
          <option value="series">Série</option>
          <option value="episode">Episódio</option>
        </select>

        <button type="submit">Pesquisar</button>
      </form>

      
      <div style={{ marginTop: "20px" }}>
        {movies.length > 0 ? (
          movies.map((m) => (
            <div key={m.imdbID} style={{ marginBottom: "20px" }}>
              <h2>{m.Title}</h2>
              <p>{m.Year}</p>
              <img
                src={m.Poster}
                alt={`${m.Title} Poster`}
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          ))
        ) : (
          <p>Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
}

//Codigo da receita cinco