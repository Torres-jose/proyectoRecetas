
import { useLocation } from "react-router-dom";
import RecipeDetails from "../components/RecipeDetails.components";

function DetalleReceta() {
  const location = useLocation();
  const receta = location.state?.receta;

  if (!receta) return <p>No hay receta para mostrar</p>;

  return <RecipeDetails receta={receta} />;
}

export default DetalleReceta;
