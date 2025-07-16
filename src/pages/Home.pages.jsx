// src/pages/Home.pages.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarPorNombre, buscarPorIngrediente } from "../api/apiexterna.api";

function Home() {
  const [busqueda, setBusqueda] = useState("");
  const [recetas, setRecetas] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const buscarRecetas = async () => {
    setError("");
    setRecetas([]);

    try {
      let resultados = await buscarPorNombre(busqueda);

      if (!resultados || resultados.length === 0) {
        resultados = await buscarPorIngrediente(busqueda);
      }

      if (resultados && resultados.length > 0) {
        setRecetas(resultados);
      } else {
        setError("No se encontraron recetas.");
      }
    } catch (err) {
      console.error("Error al buscar recetas:", err);
      setError("Ocurrió un error al buscar recetas.");
    }
  };

  const verDetalle = (receta) => {
    navigate("/detalle", { state: { receta } });
  };

  return (
    <div className="container mt-4">
      <h2>Buscar Recetas</h2>
      <input
        type="text"
        className="form-control"
        placeholder="Ej: Chicken o Garlic"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button className="btn btn-success mt-2" onClick={buscarRecetas}>
        Buscar
      </button>

      {error && <p className="text-danger mt-3">{error}</p>}

      <div className="row mt-4">
        {recetas.map((r) => (
          <div className="col-md-4 mb-4" key={r.idMeal}>
            <div
              className="card h-100"
              onClick={() => verDetalle(r)}
              style={{ cursor: "pointer" }}
            >
              <img src={r.strMealThumb} className="card-img-top" alt={r.strMeal} />
              <div className="card-body">
                <h5 className="card-title">{r.strMeal}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
