import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Login({setIsLoggedIn}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        const response = await API.post("/auth/login", {username,password,});
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.usuario));
        setIsLoggedIn(true);
        navigate("/Home");
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Error al iniciar sesión");
        }
      }
    };
    return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
export default Login;
