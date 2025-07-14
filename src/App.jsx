import { Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar.components"
import Landing from "./pages/Landing.pages";
import Login from "./pages/Login.pages";
import Home from "./pages/Home.pages";

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
   <>
    <Navbar isLoggedIn={isLoggedIn}/>
    <Routes>
       <Route path="/" element ={<Landing/>} /> 
       <Route path="/login" element ={<Login/>} />
       <Route path="/home" element ={<Home/>}/>
    </Routes>
   </>
     
    
  )
}

export default App
