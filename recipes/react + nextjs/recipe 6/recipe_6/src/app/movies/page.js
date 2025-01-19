export default async function Home({ searchParams }) {
  const { titleSearchKey = "bagdad", typekey = "movie" } = await searchParams;
  //Parametro novo adicionado: Tipo

  const res = await fetch(
    `http://www.omdbapi.com/?apikey=f1cbc41e&s=${titleSearchKey}&type=${typekey}`
  );

  const data = await res.json();

  return (
    <div>
      <div>
        {data.Search.map((m) => (
          <div key={m.imdbID} style={{ marginBottom: "20px" }}>
            <h2>{m.Title}</h2>
            <p>{m.Year}</p>
            <img src={m.Poster} alt={`${m.Title} Poster`} style={{ width: "200px", height: "auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
