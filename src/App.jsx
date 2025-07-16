import { Routes, Route} from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar.components"
import Landing from "./pages/Landing.pages";
import Login from "./pages/Login.pages";
import Home from "./pages/Home.pages";
import Register from "./pages/registre.pages";
import DetalleRecetas from "./pages/DetalleRecetas.pages";
import Favoritos from "./pages/Favoritos.pages";
import PrivateRoute from "./components/PrivateRoute.components";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // pada escuchar los cambios al token
  useEffect(() =>{
    const listener = () =>{
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  },[]);

  return (
   <>
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn ={setIsLoggedIn}/>
    <Routes>
       <Route path="/" element ={<Landing/>} /> 
       <Route path="/login" element ={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/register" element ={<Register/>}/>
        //rutas protegidas 
        <Route element={<PrivateRoute/>}>
       <Route path="/home" element ={<Home/>}/>
       <Route path="/favorito" element={<Favoritos/>} />
       <Route path="/detalle" element ={<DetalleRecetas/>}/>
       </Route>
    </Routes>
   </>
     
    
  )
}

export default App
