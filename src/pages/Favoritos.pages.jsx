import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const cargarFavoritos = async () => {
    try {
      const res = await API.get("/favoritos");
      setFavoritos(res.data);
    } catch (error) {
      console.error("Error al cargar favoritos", error);
      setError("No se pudieron cargar los favoritos.");
    }
  };

  const eliminar = async (idMeal) => {
    try {
      await API.delete(`/favoritos/${idMeal}`);
      setFavoritos((prev) => prev.filter((f) => f.idMeal !== idMeal));
    } catch (err) {
      console.error("Error al eliminar favorito", err);
      setError("No se pudo eliminar el favorito.");
    }
  };

  const verDetalle = (receta) => {
    navigate("/detalle", { state: { receta } });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      cargarFavoritos();
    } else {
      navigate("/login");
    }
  }, );

  return (
    <div className="container mt-4">
      <h2>Mis Recetas Favoritas</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {favoritos.length === 0 ? (
        <p>No tienes recetas favoritas aún.</p>
      ) : (
        <div className="row">
          {favoritos.map((f) => (
            <div className="col-md-4 mb-3" key={f._id}>
              <div className="card h-100">
                <img
                  src={f.imagen}
                  className="card-img-top"
                  alt={f.nombre}
                  style={{ cursor: "pointer" }}
                  onClick={() => verDetalle(f)}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5
                    className="card-title"
                    style={{ cursor: "pointer" }}
                    onClick={() => verDetalle(f)}
                  >
                    {f.nombre}
                  </h5>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => eliminar(f.idMeal)}
                  >
                     Quitar de favoritos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;
