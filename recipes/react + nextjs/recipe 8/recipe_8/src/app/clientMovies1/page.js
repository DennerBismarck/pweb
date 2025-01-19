"use client";


import { useState, useCallback, memo } from "react";

export default function Home() {
  const [searchKey, setSearchKey] = useState(""); 
  const [resultMovies, setResultMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = useCallback(async (formData) => {
    const titleSearchKey = formData.get("titleSearchKey");
    setIsLoading(true);

    const httpRes = await fetch(
      `http://www.omdbapi.com/?apikey=f1cbc41e&s=${titleSearchKey}`
    );
    const jsonRes = await httpRes.json();

    setResultMovies(jsonRes.Search || []);
    setIsLoading(false);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Movie Search</h1>

      <div className="max-w-md mx-auto">
        <MemoizedMovieForm
          handleAction={handleAction}
          isLoading={isLoading}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
      </div>

      <div className="mt-8">
        <MovieTable movies={resultMovies} />
      </div>
    </div>
  );
}

const MovieForm = ({ handleAction, isLoading, searchKey, setSearchKey }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const formData = new FormData(e.target);
    handleAction(formData); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
          isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Carregando..." : "Pesquisar"}
      </button>
    </form>
  );
};

// Memoiza o formulário para evitar redesenho
const MemoizedMovieForm = memo(MovieForm);

const MovieTable = ({ movies }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded px-8 py-6">
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
            {movies.map((m) => (
              <tr key={m.imdbID}>
                <td className="border border-gray-200 px-4 py-2">{m.Title}</td>
                <td className="border border-gray-200 px-4 py-2">{m.Year}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <img
                    src={m.Poster}
                    alt={`${m.Title} Poster`}
                    className="h-24"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-700">Nenhum resultado encontrado.</p>
      )}
    </div>
  );
};
