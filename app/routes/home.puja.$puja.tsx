import { useLocation } from "@remix-run/react";
import { PujaResponse } from "./home.pujas";

export default function Puja() {
  const location = useLocation();

  // Acceder al objeto pasado como estado
  const { puja }: { puja: PujaResponse } = location.state || {};

  if (!puja) {
    return <div>No se encontró el producto.</div>;
  }

  return (
    <div>
      <h1>Producto: {puja.name}</h1>
      <p>{puja.createdBy.name}</p>
    </div>
  );
}
