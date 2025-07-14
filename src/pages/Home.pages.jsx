import { useState } from "react";
import { buscarPorNombre } from "../api/apiexterna.api";
import DetalleRecetas from "./DetalleRecetas.pages";

function Home() {
  const [termino, setTermino] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleBuscar = async () => {
    const data = await buscarPorNombre(termino);
    setResultados(data || []);
  };

  return (
    <div className="container mt-4">
      <h2>Buscar Recetas</h2>
      <input
        type="text"
        className="form-control"
        placeholder="Ej: Arrabiata o Chicken"
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={handleBuscar}>
        Buscar
      </button>

      <div className="row mt-4">
        {resultados.map((receta) => (
          <div key={receta.idMeal} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={receta.strMealThumb}
                alt={receta.strMeal}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{receta.strMeal}</h5>
                <a
                  href={`/DetalleRecetas/${receta.idMeal}`}
                  className="btn btn-outline-secondary btn-sm"
                >
                  Ver detalle
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
