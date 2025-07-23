// src/components/CarruselRecetas.jsx
import { useEffect, useState } from "react";
import { obtenerRandom } from "../api/apiexterna.api"; // tu función API
import "../assets/style/CarruselRecetas.css"
function CarruselRecetas() {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    const fetchRecetas = async () => {
      const nuevasRecetas = [];
      for (let i = 0; i < 5; i++) {
        const receta = await obtenerRandom();
        if (receta) {
          nuevasRecetas.push({
            id: receta.idMeal,
            nombre: receta.strMeal,
            imagen: receta.strMealThumb,
            descripcion: receta.strInstructions?.slice(0, 120) + "...", // resumen
          });
        }
      }
      setRecetas(nuevasRecetas);
    };

    fetchRecetas();
  }, []);

  return (
    <div className="carrusel-container">
      {recetas.map((receta) => (
        <div className="card-carrusel" key={receta.id}>
          <img src={receta.imagen} alt={receta.nombre} />
          <h3>{receta.nombre}</h3>
          <p>{receta.descripcion}</p>
        </div>
      ))}
    </div>
  );
}

export default CarruselRecetas;
