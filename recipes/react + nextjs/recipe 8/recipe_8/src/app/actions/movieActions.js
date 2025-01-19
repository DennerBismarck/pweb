"use server";

export async function searchMovies(formData) {
  const titleSearchKey = formData.get("titleSearchKey");
  const typeKey = formData.get("type");

  if (!titleSearchKey || titleSearchKey.trim() === "") {
    return { success: false, Search: [], message: "Campo de título vazio." };
  }

  try {
    const API_KEY = "f1cbc41e"; // Chave da API diretamente no código

    const query = new URLSearchParams({
      apikey: API_KEY,
      s: titleSearchKey,
      ...(typeKey && { type: typeKey }),
    });

    const httpRes = await fetch(`http://www.omdbapi.com/?${query.toString()}`);

    if (!httpRes.ok) {
      throw new Error(`Erro na resposta da API: ${httpRes.statusText}`);
    }

    const jsonRes = await httpRes.json();

    return { success: true, ...jsonRes };
  } catch (err) {
    return {
      success: false,
      error: `Erro na requisição: ${err.message}`,
    };
  }
}
