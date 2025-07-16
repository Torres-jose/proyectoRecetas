// src/components/RecipeDetails.jsx
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";
import { useState, useEffect } from "react";

function RecipeDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const receta = location.state?.receta;

  const [isFavorito, setIsFavorito] = useState(false);

  useEffect(() => {
    if (!receta) return;

    const verificarFavorito = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await API.get("/favoritos");
        const favoritos = response.data;

        const yaEsFavorito = favoritos.some((f) => f.idMeal === receta.idMeal);
        setIsFavorito(yaEsFavorito);
      } catch (error) {
        console.error("Error al verificar favoritos", error);
      }
    };

    verificarFavorito();
  }, [receta]);

  const agregarAFavoritos = async () => {
    try {
      await API.post("/favoritos", { idMeal: receta.idMeal });
      setIsFavorito(true);
    } catch (err) {
      console.error("Error al agregar a favoritos", err);
    }
  };

  const quitarDeFavoritos = async () => {
    try {
      await API.delete(`/favoritos/${receta.idMeal}`);
      setIsFavorito(false);
    } catch (err) {
      console.error("Error al eliminar de favoritos", err);
    }
  };

  const volver = () => {
    navigate(-1);
  };

  if (!receta) {
    return <p className="container mt-4 text-danger">No se encontró la receta.</p>;
  }

  return (
    <div className="container mt-4">
      <h2>{receta.strMeal}</h2>
      <img src={receta.strMealThumb} alt={receta.strMeal} className="img-fluid mb-3" />
      
      <h4>Instrucciones</h4>
      <p>{receta.strInstructions}</p>

      <h5>Ingredientes:</h5>
      <ul>
        {[...Array(20).keys()].map((i) => {
          const ingrediente = receta[`strIngredient${i + 1}`];
          const medida = receta[`strMeasure${i + 1}`];
          if (ingrediente) {
            return (
              <li key={i}>
                {ingrediente} - {medida}
              </li>
            );
          }
          return null;
        })}
      </ul>

      {isFavorito ? (
        <button className="btn btn-danger" onClick={quitarDeFavoritos}>
          Quitar de favoritos
        </button>
      ) : (
        <button className="btn btn-primary" onClick={agregarAFavoritos}>
          Agregar a favoritos
        </button>
      )}

      <button className="btn btn-secondary ms-3" onClick={volver}>
        Volver
      </button>
    </div>
  );
}

export default RecipeDetails;
