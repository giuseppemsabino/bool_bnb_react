import { usePropertiesContext } from "../../contexts/PropertiesContext";
import Card from "../../components/Card";

export default function IndexPropertiesPage() {
  const { properties } = usePropertiesContext();

  return (
    <>
      <h1 className="mt-3">TUTTI GLI IMMOBILI</h1>
      <div className="row g-3 mt-3">
        {properties.map((property) => (
          <Card property={property} key={property.id} />
        ))}
      </div>
    </>
  );
}
