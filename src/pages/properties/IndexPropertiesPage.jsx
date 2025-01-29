import { usePropertiesContext } from "../../contexts/PropertiesContext";
import Card from "../../components/Card";

export default function IndexPropertiesPage() {
  const { properties } = usePropertiesContext();

  return (
    <>
      <div className="row g-3 mt-3">
        {properties.map((property) => (
          <Card property={property} key={property.id} />
        ))}
      </div>
    </>
  );
}
