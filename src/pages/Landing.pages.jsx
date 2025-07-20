import './landing.pages.css'

function Landing(){
    return(
<>

<div className="landing-container">
      <header className="landing-header">
        <h1>Mi Página</h1>
      </header>

      <section className="landing-hero">
        <h2>Bienvenido</h2>
        <p>Descubre lo que tenemos para ti.</p>
      </section>

      <section className="landing-features">
        <div className="feature">🔧 Herramienta 1</div>
        <div className="feature">🚀 Herramienta 2</div>
        <div className="feature">🛡️ Herramienta 3</div>
      </section>

    
    </div>
</>
    );
}

export default Landing;