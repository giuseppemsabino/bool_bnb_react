import { Link } from "react-router-dom";
import { usePropertiesContext } from "../../contexts/PropertiesContext";

export default function IndexPropertiesPage() {
  const properties = usePropertiesContext();
  return (
    <div>
      {properties.map((property) => (
        <ul key={property.id}>
          <li>
            <Link to={`/properties/${property.id}`}>{property.title}</Link>
          </li>
        </ul>
      ))}
    </div>
  );
}
