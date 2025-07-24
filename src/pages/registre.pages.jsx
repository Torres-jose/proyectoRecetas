import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../assets/style/Registro.style.css'
import API from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    lasname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await API.post("/auth/register", form);
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error al registrar usuario. Por favor, inténtalo de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Crea tu cuenta</h2>
          <p>Únete a nuestra comunidad</p>
        </div>

        {error && <div className="register-error">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="username">Nombre de usuario</label>
              <input
                id="username"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Ej: usuario123"
                required
              />
              <span className="input-icon">👤</span>
            </div>

            <div className="input-group">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
              <span className="input-icon">📛</span>
            </div>

            <div className="input-group">
              <label htmlFor="lasname">Apellido</label>
              <input
                id="lasname"
                type="text"
                name="lasname"
                value={form.lasname}
                onChange={handleChange}
                placeholder="Tu apellido"
                required
              />
              <span className="input-icon">🏷️</span>
            </div>

            <div className="input-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tucorreo@ejemplo.com"
                required
              />
              <span className="input-icon">✉️</span>
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
              />
              <span className="input-icon">🔒</span>
            </div>
          </div>

          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              "Registrarse"
            )}
          </button>
        </form>

        <div className="register-footer">
          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;