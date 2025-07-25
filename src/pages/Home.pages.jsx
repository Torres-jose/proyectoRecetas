import { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { buscarPorNombre, buscarPorIngrediente, obtenerRandom } from "../api/apiexterna.api";
import { FaHeart, FaRegHeart, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import API from "../api/api";
import "../assets/style/Home.style.css";

function Home() {
  const [busqueda, setBusqueda] = useState("");
  const [recetas, setRecetas] = useState([]);
  const [recetasRandom, setRecetasRandom] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    if (slider) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      slider.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const obtenerMultiplesRandom = async (cantidad) => {
    const promesas = Array(cantidad).fill().map(() => obtenerRandom());
    const resultados = await Promise.all(promesas);
    return resultados.filter(receta => receta !== null && receta !== undefined);
  };

  useEffect(() => {
    const cargarRecetasIniciales = async () => {
      try {
        setLoading(true);
        const randomRecipes = await obtenerMultiplesRandom(10);
        setRecetasRandom(randomRecipes);
        
        const token = localStorage.getItem("token");
        if (token) {
          const response = await API.get("/favoritos");
          const data = Array.isArray(response.data) ? response.data : [];
          setFavoritos(data);
        }
      } catch (err) {
        console.error("Error al cargar recetas iniciales:", err);
      } finally {
        setLoading(false);
      }
    };
    
    cargarRecetasIniciales();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || loading) return;

    const handleScroll = () => {
      setCanScrollLeft(slider.scrollLeft > 0);
      setCanScrollRight(
        slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 1
      );
      
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 100) {
        cargarMasRecetas();
      }
    };

    slider.addEventListener('scroll', handleScroll);
    return () => slider.removeEventListener('scroll', handleScroll);
  }, [recetasRandom, loading]);

  const cargarMasRecetas = async () => {
    try {
      setLoading(true);
      const nuevasRecetas = await obtenerMultiplesRandom(5);
      setRecetasRandom(prev => [...prev, ...nuevasRecetas]);
    } catch (err) {
      console.error("Error al cargar más recetas:", err);
    } finally {
      setLoading(false);
    }
  };

  const buscarRecetas = async () => {
    setError("");
    setRecetas([]);
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const verDetalle = (receta) => {
    navigate("/detalle", { state: { receta } });
  };

  const toggleFavorito = async (receta) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const yaEsFavorito = Array.isArray(favoritos) && favoritos.some(f => f.idMeal === receta.idMeal);

      if (yaEsFavorito) {
        await API.delete(`/favoritos/${receta.idMeal}`);
        setFavoritos(prev => prev.filter(f => f.idMeal !== receta.idMeal));
      } else {
        await API.post("/favoritos", { 
          idMeal: receta.idMeal,
          nombre: receta.strMeal,
          imagen: receta.strMealThumb
        });
        setFavoritos(prev => [...prev, receta]);
      }
    } catch (err) {
      console.error("Error al actualizar favoritos", err);
    }
  };

  const esFavorito = (idMeal) => {
    return Array.isArray(favoritos) && favoritos.some(f => f.idMeal === idMeal);
  };

  return (
    <div className="home-container">
      <div className="recipes-slider-container">
        <h2>Descubre Recetas</h2>
        <div className="slider-wrapper">
          <button 
            className="slider-button left" 
            onClick={() => scrollSlider('left')}
            disabled={!canScrollLeft}
            aria-label="Recetas anteriores"
          >
            <FaChevronLeft />
          </button>
          
          <div className="recipes-slider" ref={sliderRef}>
            {recetasRandom.map((r) => (
              <div className="recipe-slide" key={r.idMeal} onClick={() => verDetalle(r)}>
                <div className="favorite-icon" onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorito(r);
                }}>
                  {esFavorito(r.idMeal) ? <FaHeart color="red" /> : <FaRegHeart />}
                </div>
                <img src={r.strMealThumb} alt={r.strMeal} />
                <h3>{r.strMeal}</h3>
              </div>
            ))}
            {loading && <div className="loading-slide">Cargando más recetas...</div>}
          </div>
          
          <button 
            className="slider-button right" 
            onClick={() => scrollSlider('right')}
            disabled={!canScrollRight}
            aria-label="Recetas siguientes"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="search-container">
        <h2>Buscar Recetas</h2>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nombre o ingrediente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && buscarRecetas()}
          />
          <button className="search-button" onClick={buscarRecetas} disabled={loading}>
            <FaSearch /> {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="search-results">
        {recetas.map((r) => (
          <div className="recipe-card" key={r.idMeal}>
            <div className="card-content" onClick={() => verDetalle(r)}>
              <img src={r.strMealThumb} alt={r.strMeal} />
              <h3>{r.strMeal}</h3>
            </div>
            <button 
              className={`favorite-button ${esFavorito(r.idMeal) ? 'active' : ''}`}
              onClick={() => toggleFavorito(r)}
            >
              {esFavorito(r.idMeal) ? <FaHeart /> : <FaRegHeart />}
              {esFavorito(r.idMeal) ? ' En favoritos' : ' Agregar a favoritos'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
