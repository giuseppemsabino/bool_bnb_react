import { createContext, useContext, useState, useEffect } from "react";

//creazione del context
const PropertiesContext = createContext();

//creazione del provider e anche export

export default function PropertiesContextProvider({ children }) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [properties, setProperties] = useState([]);

//   const defaultProperties = properties;

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    fetch(apiUrl + "/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
        
      });
  };

//   const handleFilter = (e) => {

//     fetchProperties();
//    const newProperties = properties.filter(
//       (property) => property.type === e.target.defaultValue
//     );
//     setProperties(newProperties);
//   };

  return (
    <PropertiesContext.Provider value={{ properties, fetchProperties }}>
      {children}
    </PropertiesContext.Provider>
  );
}

export const usePropertiesContext = () => useContext(PropertiesContext);
