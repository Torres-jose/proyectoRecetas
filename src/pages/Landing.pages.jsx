import "../assets/style/landing.pages.css";
import { useNavigate } from "react-router-dom";
import card1 from '../assets/img/card1.jpeg'
import card2 from '../assets/img/card2.jpeg'
import card3 from '../assets/img/card3.jpeg'
import CarruselRecetas from "../components/CarruselRecetas";

function Landing() {
  const navigate = useNavigate();
  const btn_registro = () => {
    navigate("/Register");
  }
  return (
    <>
      <main>
         <section>
         <div className="presentacion">
            <div className="bienvenido">
              <h1>Bienvenido</h1>
              <h3>Tu lugar para descubrir, 
                guardar y saborear las mejores recetas</h3>
              <p>
                Comparte tus recetas favoritas, inspírate con creaciones de
                otros cocineros y guarda todo lo que te gusta.
                Bienvenido a una comunidad donde la comida une personas.
              </p>
              <button className="btn-registrate" onClick={btn_registro}>Registrate</button>
            </div>
            <div className="card1">
              <img src={card3} alt="Decoración" className="card-image1" />
            </div>
            <div className="card2">
              <img src={card2} alt="Decoración" className="card-image" />
            </div>
            <div className="card3">
              <img src={card1} alt="Decoración" className="card-image" />
            </div>
         </div>
         <section className="carrusel-section">
        <h2>
          Inspírate Con Nuestras Recetas
        </h2>
        <CarruselRecetas />
      </section>
        </section>
      </main>
    </>
  );
}

export default Landing;
