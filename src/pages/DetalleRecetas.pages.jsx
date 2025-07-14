import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerDetallePorId } from "../api/apiexterna.api";

function DetalleRecetas() {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);

  useEffect(() => {
    obtenerDetallePorId(id).then(setReceta);
  }, [id]);

  if (!receta) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <h2>{receta.strMeal}</h2>
      <img src={receta.strMealThumb} alt={receta.strMeal} className="img-fluid" />
      <p><strong>Categoría:</strong> {receta.strCategory}</p>
      <p><strong>Área:</strong> {receta.strArea}</p>
      <p><strong>Instrucciones:</strong></p>
      <p>{receta.strInstructions}</p>
    </div>
  );
}

export default DetalleRecetas;
