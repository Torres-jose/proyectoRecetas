import { Link, useNavigate } from "react-router-dom";
import Login from "../pages/Login.pages";
import Home from "../pages/Home.pages";
import Landing from "../pages/Landing.pages";
import Register from "../pages/registre.pages";
function Navbar({isLoggedIn}) {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        navigate('/Login')
    };

      const irAlLogin = () => {
        navigate('/Login')
    };

    const navMostrar = () =>{
        isLoggedIn ? navigate('/Home'): navigate('/');
    }

    const irAlRegistro = () =>{
        navigate('/register')
      
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="" onClick={navMostrar} >Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        {isLoggedIn ?(
             <>
            
            <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
        <li><button onClick={cerrarSesion}>Cerrar Sesion</button></li>
        
        </>
        ) :(
            <>
            
           <li className="nav-item"><button onClick={irAlLogin}>Login</button></li> 
          <li className="nav-item"><button onClick={irAlRegistro}>Registrar</button></li>
            </>
        )}
      </ul>
    </div>
  </div>
</nav>
    );
    


}

export default Navbar;
