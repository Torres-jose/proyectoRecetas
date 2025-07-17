import API from "./api";

export const listaFavoritos = () => {
    return API.get("/api/favoritos");
};

export const agregarFavorito = (idMeal) => {
    return API.post("/favoritos", { idMeal });
};

export const eliminarFavorito = (idMeal) => {
    return API.delete(`/favoritos/${idMeal}`);
};