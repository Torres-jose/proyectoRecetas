import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import ('../assets/style/Favoritos.css')

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [eliminandoId, setEliminandoId] = useState(null);
  const navigate = useNavigate();

  const cargarFavoritos = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/favoritos");
      setFavoritos(res.data);
    } catch (error) {
      console.error("Error al cargar favoritos", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("No se pudieron cargar los favoritos. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (idMeal) => {
    if (eliminandoId === idMeal) return;
    
    if (!window.confirm("¿Estás seguro de que quieres quitar esta receta de favoritos?")) {
      return;
    }

    try {
      setEliminandoId(idMeal);
      setError("");
      
      await API.delete(`/favoritos/${idMeal}`);
      setFavoritos((prev) => prev.filter((f) => f.idMeal !== idMeal));
      
    } catch (err) {
      console.error("Error al eliminar favorito", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else if (err.response?.status === 404) {
        setFavoritos((prev) => prev.filter((f) => f.idMeal !== idMeal));
      } else {
        setError("No se pudo eliminar el favorito. Intenta nuevamente.");
      }
    } finally {
      setEliminandoId(null);
    }
  };

  const verDetalle = (receta) => {
    console.log("Receta enviada favorito al detalle:", receta);
    navigate("/detalle", { state: { receta } });
  };

  const recargarFavoritos = () => {
    cargarFavoritos();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      cargarFavoritos();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="favoritos-container">
        <div className="container">
          <div className="favoritos-header">
            <h2 className="favoritos-title">Mis Recetas Favoritas</h2>
          </div>
          <div className="favoritos-loading">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favoritos-container">
      <div className="container">
        <div className="favoritos-header">
          <h2 className="favoritos-title">Mis Recetas Favoritas</h2>
          <button 
            className="btn-actualizar"
            onClick={recargarFavoritos}
            disabled={loading}
          >
            🔄 Actualizar
          </button>
        </div>

        {error && (
          <div className="alert-custom alert-danger-custom">
            {error}
            <button 
              type="button" 
              className="btn-close float-end" 
              onClick={() => setError("")}
              aria-label="Close"
            ></button>
          </div>
        )}

        {favoritos.length === 0 ? (
          <div className="estado-vacio">
            <h4>No tienes recetas favoritas aún</h4>
            <p>
              Explora nuestras deliciosas recetas y guarda tus favoritas para encontrarlas fácilmente aquí.
            </p>
            <button 
              className="btn-explorar"
              onClick={() => navigate("/recetas")}
            >
              🍽️ Explorar Recetas
            </button>
          </div>
        ) : (
          <>
            <p className="contador-favoritos">
              ❤️ Tienes {favoritos.length} receta{favoritos.length !== 1 ? 's' : ''} favorita{favoritos.length !== 1 ? 's' : ''}
            </p>
            
            <div className="favoritos-grid">
              {favoritos.map((f, index) => (
                <div className="favorito-card" key={f._id || f.idMeal} style={{animationDelay: `${index * 0.1}s`}}>
                  <img
                    src={f.imagen}
                    className="favorito-imagen"
                    alt={f.nombre}
                    onClick={() => verDetalle(f)}
                    onError={(e) => {
                      e.target.src = '/placeholder-food.jpg';
                    }}
                  />
                  <div className="favorito-contenido">
                    <h5
                      className="favorito-titulo"
                      onClick={() => verDetalle(f)}
                    >
                      {f.nombre}
                    </h5>
                    
                    {f.categoria && (
                      <div className="favorito-categoria">
                        {f.categoria}
                      </div>
                    )}
                    
                    <button
                      className={`btn-eliminar ${eliminandoId === f.idMeal ? 'loading' : ''}`}
                      onClick={() => eliminar(f.idMeal)}
                      disabled={eliminandoId === f.idMeal}
                    >
                      {eliminandoId === f.idMeal ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Eliminando...
                        </>
                      ) : (
                        <>
                          💔 Quitar de favoritos
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Favoritos;