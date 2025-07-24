import ('../assets/style/footer.components.css')

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Sección principal - RecetasApp */}
        <div className="footer-main-section">
          <h3>Mis Recetas</h3>
          <p className="footer-description">
            Descubre, guarda y comparte las mejores recetas del mundo. Una plataforma creada para los amantes de la cocina que buscan inspiración culinaria, técnicas innovadoras y sabores únicos. Conecta con una comunidad apasionada por la gastronomía y convierte cada comida en una experiencia memorable.
          </p>
        </div>

        {/* Sección de contacto */}
        <div className="footer-contact-section">
          <h3>Contáctanos</h3>
          <div className="footer-contact-grid">
            <div className="contact-item">
              <strong>📧 Email:</strong> hola@recetasapp.com
            </div>
            <div className="contact-item">
              <strong>📱 Teléfono:</strong> +507 1234-5678
            </div>
            <div className="contact-item">
              <strong>📍 Dirección:</strong> Ciudad de Panamá, Panamá
            </div>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="footer-social">
          <a href="#" className="social-icon" aria-label="Facebook">
            📘
          </a>
          <a href="#" className="social-icon" aria-label="Instagram">
            📷
          </a>
          <a href="#" className="social-icon" aria-label="Twitter">
            🐦
          </a>
          <a href="#" className="social-icon" aria-label="YouTube">
            📺
          </a>
          <a href="#" className="social-icon" aria-label="TikTok">
            🎵
          </a>
        </div>

        {/* Separador */}
        <div className="footer-divider"></div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>
            © 2024 <strong>RecetasApp</strong>. Todos los derechos reservados.
            <br />
            Hecho con ❤️ para los amantes de la cocina
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;