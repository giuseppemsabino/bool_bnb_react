import { usePropertiesContext } from "../../contexts/PropertiesContext";
import Card from "../../components/Card";

export default function IndexPropertiesPage() {
  const { properties } = usePropertiesContext();

  return (
    <>
      <h1 className="mt-4">Elenco immobili</h1>
      <div className="row g-3 mt-3 mb-5">
        {properties.map((property) => (
          <Card property={property} key={property.id} />
        ))}
      </div>
    </>
  );
}
