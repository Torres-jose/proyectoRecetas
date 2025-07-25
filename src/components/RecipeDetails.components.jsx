import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";
import { useState, useEffect } from "react";
import "../assets/style/Recipedetails.style.css"
import { FaHeart, FaRegHeart, FaArrowLeft, FaYoutube } from "react-icons/fa";

function RecipeDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const normalizarReceta = (receta) => {
    if (!receta.strMeal && receta.nombre) {
      // Es una receta desde MongoDB
      const normalizada = {
        ...receta,
        strMeal: receta.nombre,
        strMealThumb: receta.imagen,
        strInstructions: receta.instrucciones,
        strYoutube: receta.video,
        strCategory: receta.categoria,
        strArea: receta.area
      };

      // Convertir ingredientes y medidas en formato strIngredient1, strMeasure1,
      receta.ingredientes?.forEach((ing, i) => {
        normalizada[`strIngredient${i + 1}`] = ing;
      });
      receta.medidas?.forEach((med, i) => {
        normalizada[`strMeasure${i + 1}`] = med;
      });

      return normalizada;
    }
    return receta;
  };

  const recetaOriginal = location.state?.receta;
  const receta = normalizarReceta(recetaOriginal);
  const [isFavorito, setIsFavorito] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!receta) return;

    const verificarFavorito = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await API.get("/favoritos");
        const favoritos = response.data;
        const yaEsFavorito = favoritos.some((f) => f.idMeal === receta.idMeal);
        setIsFavorito(yaEsFavorito);
      } catch (error) {
        console.error("Error al verificar favoritos", error);
      } finally {
        setIsLoading(false);
      }
    };

    verificarFavorito();
  }, [receta]);

  const toggleFavorito = async () => {
    try {
      setIsLoading(true);
      if (isFavorito) {
        await API.delete(`/favoritos/${receta.idMeal}`);
      } else {
        await API.post("/favoritos", { idMeal: receta.idMeal });
      }
      setIsFavorito(!isFavorito);
    } catch (err) {
      console.error("Error al actualizar favoritos", err);
    } finally {
      setIsLoading(false);
    }
  };

  const volver = () => navigate(-1);

  if (!receta) {
    return (
      <div className="recipe-not-found">
        <h2>Receta no encontrada</h2>
        <button onClick={volver} className="back-button">
          <FaArrowLeft /> Volver
        </button>
      </div>
    );
  }

  // Extraer el ID del video de YouTube
  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYoutubeId(receta.strYoutube);

  // Obtener ingredientes válidos
  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const ingrediente = receta[`strIngredient${i}`];
    const medida = receta[`strMeasure${i}`];
    if (ingrediente && ingrediente.trim() !== "") {
      ingredientes.push({ ingrediente, medida });
    }
  }

  // Dividir instrucciones en pasos
  const pasos = receta.strInstructions
    ? receta.strInstructions.split("\r\n").filter((paso) => paso.trim() !== "")
    : [];

  return (
    <div className="recipe-details-container">
      <button onClick={volver} className="back-button">
        <FaArrowLeft /> Volver
      </button>

      <div className="recipe-header">
        <div className="recipe-title-section">
          <h1>{receta.strMeal}</h1>
          <div className="recipe-meta">
            {receta.strCategory && <span className="badge">{receta.strCategory}</span>}
            {receta.strArea && <span className="badge">{receta.strArea}</span>}
            {receta.strTags && 
              receta.strTags.split(",").map((tag, i) => (
                <span key={i} className="badge">{tag.trim()}</span>
              ))
            }
          </div>
        </div>

        <button 
          onClick={toggleFavorito} 
          className={`favorite-button ${isFavorito ? 'active' : ''}`}
          disabled={isLoading}
        >
          {isFavorito ? <FaHeart /> : <FaRegHeart />}
          {isFavorito ? ' En favoritos' : ' Agregar a favoritos'}
        </button>
      </div>

      <div className="recipe-content">
        <div className="recipe-media">
          <img 
            src={receta.strMealThumb} 
            alt={receta.strMeal} 
            className="recipe-image"
          />
          
          {youtubeId && (
            <div className="video-container">
              <h3>
                <FaYoutube /> Video de la receta
              </h3>
              <div className="video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video de la receta"
                />
              </div>
            </div>
          )}
        </div>

        <div className="recipe-info">
          <section className="ingredients-section">
            <h2>Ingredientes</h2>
            <ul className="ingredients-list">
              {ingredientes.map((item, index) => (
                <li key={index}>
                  <span className="ingredient">{item.ingrediente}</span>
                  <span className="measure">{item.medida}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="instructions-section">
            <h2>Instrucciones</h2>
            <ol className="instructions-list">
              {pasos.map((paso, index) => (
                <li key={index}>{paso}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;