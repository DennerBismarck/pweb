"use client";

import { useState } from "react";
import { searchMovies } from "../actions/movieActions";

export default function Home() {
  const [data, setData] = useState({});

  async function handleAction(formData) {
    const res = await searchMovies(formData);
    setData(res);
  }

  return (
    <div className="p-4">
      <MovieForm actionHandler={handleAction} />
      {data.Search && <MovieTable movies={data.Search} />}
      {data.error && <p className="text-red-500">Erro: {data.error}</p>}
    </div>
  );
}

export function MovieForm({ actionHandler }) {
  return (
    <form action={actionHandler} className="space-y-4">
      <div>
        <label htmlFor="idTitleSearchKey" className="block text-sm font-medium">
          Título
        </label>
        <input
          id="idTitleSearchKey"
          name="titleSearchKey"
          className="border rounded p-2 w-full"
          placeholder="Digite o título..."
        />
      </div>

      <div>
        <label htmlFor="idTypeKey" className="block text-sm font-medium">
          Tipo
        </label>
        <select
          id="idTypeKey"
          name="type"
          className="border rounded p-2 w-full"
        >
          <option value="">Todos</option>
          <option value="movie">Filme</option>
          <option value="series">Série</option>
          <option value="episode">Episódio</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Pesquisar
      </button>
    </form>
  );
}

export function MovieTable({ movies }) {
  return (
    <div className="mt-4">
      {movies.length === 0 && <p>Nenhum resultado encontrado.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {movies.map((m) => (
          <div key={m.imdbID} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{m.Title}</h2>
            <p>{m.Year}</p>
            <img src={m.Poster} alt={`${m.Title} poster`} className="mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
