import ('../assets/style/navbar.components.css')
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/Login");
  };

  const irAlLogin = () => {
    navigate("/Login");
  };

  /*const irAlRegistro = () => {
    navigate("/register");
  };*/

  const navMostrar = () => {
    isLoggedIn ? navigate("/Home") : navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={navMostrar} style={{ cursor: "pointer" }}>
        Mis Recetas
      </div>

      <ul className="nav-links">
        {isLoggedIn && (
          <>
            <li className="nav-li">
              <Link to="/home">Inicio</Link>
            </li>
            <li className="nav-li">
              <Link to="/favorito">Favoritos</Link>
            </li>
          
          </>
        )}
      </ul>

      <div className="nav-buttons">
        {isLoggedIn ? (
          <button className="btn-secondary" onClick={cerrarSesion}>
            Cerrar Sesión
          </button>
        ) : (
          <>
            <button className="btn-primary" onClick={irAlLogin}>
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
