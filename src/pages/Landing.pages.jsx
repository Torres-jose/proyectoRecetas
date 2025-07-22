import "../assets/style/landing.pages.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const btn_registro = () => {
    navigate("/Register");
  };
  return (
    <>
      <main>
        <section>
          <div className="parent">
            <div className="div1">
              <h2>Bienvenido</h2>
              <h3>
                Tu lugar para descubrir, guardar y saborear las mejores recetas
              </h3>
              <p className="discripcion">
                Comparte tus recetas favoritas, inspírate con creaciones de
                otros cocineros y guarda todo lo que te gusta.
                <br />
                Bienvenido a una comunidad donde la comida une personas.
              </p>
              <button className="btn_registro" onClick={btn_registro}>
                Registrate
              </button>
            </div>
            <div className="div2">
              <div className="card1">1</div>
              <div className="card2">2</div>
              <div className="card3">3</div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Landing;
