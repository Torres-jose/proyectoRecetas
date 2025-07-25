import axios from "axios";

const MEALDB = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
});

export const buscarPorNombre = async (nombre) => {
  const response = await MEALDB.get(`/search.php?s=${nombre}`);
  console.log("respuesta completa", response.data);
  console.log("receta encontrada:", response.data.meals);
  return response.data.meals; // puede ser null si no encuentra
};

export const buscarPorIngrediente = async (ingrediente) => {
  const response = await MEALDB.get(`/filter.php?i=${ingrediente}`);
  return response.data.meals;
};

export const obtenerDetallePorId = async (id) => {
  const response = await MEALDB.get(`/lookup.php?i=${id}`);
  return response.data.meals?.[0];
};

export const obtenerRandom = async () => {
  const response = await MEALDB.get(`/random.php`);
  return response.data.meals?.[0];
};

// Nueva función para obtener múltiples recetas aleatorias
export const obtenerMultiplesRandom = async (cantidad = 10) => {
  try {
    const promesas = Array(cantidad).fill().map(() => obtenerRandom());
    const recetas = await Promise.all(promesas);
    return recetas.filter(receta => receta !== undefined);
  } catch (error) {
    console.error("Error al obtener recetas aleatorias:", error);
    return [];
  }
};