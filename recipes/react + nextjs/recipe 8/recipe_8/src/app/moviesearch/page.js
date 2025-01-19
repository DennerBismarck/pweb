"use client";

import { useState } from "react";

export default function MovieSearch() {
  const [searchKey, setSearchKey] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchKey.trim()) return;

    setIsLoading(true);

    try {
      const res = await fetch(`/api/searchMovies?titleSearchKey=${searchKey}`);
      const data = await res.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Movie Search</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="idTitleSearchKey"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Título do Filme
          </label>
          <input
            id="idTitleSearchKey"
            name="titleSearchKey"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Digite o título do filme"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Carregando..." : "Pesquisar"}
        </button>
      </form>

      <div className="mt-8 max-w-4xl mx-auto bg-white shadow-md rounded px-8 py-6">
        {movies.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">Título</th>
                <th className="border border-gray-200 px-4 py-2">Ano</th>
                <th className="border border-gray-200 px-4 py-2">Poster</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.imdbID}>
                  <td className="border border-gray-200 px-4 py-2">
                    {movie.Title}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {movie.Year}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <img
                      src={movie.Poster}
                      alt={`${movie.Title} Poster`}
                      className="h-24"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-700">
            Nenhum resultado encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
