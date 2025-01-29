import { createContext, useContext, useState, useEffect } from "react";

//creazione del context
const PropertiesContext = createContext();

//creazione del provider e anche export

export default function PropertiesContextProvider({ children }) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [properties, setProperties] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchProperties();
    fetchTypes();
  }, []);

  const fetchProperties = () => {
    fetch(apiUrl + "/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
      });
  };

  const fetchTypes = () => {
    fetch(apiUrl + "/api/properties/types")
      .then((res) => res.json())
      .then((data) => {
        setTypes(data.types);
      });
  };

  return (
    <PropertiesContext.Provider
      value={{ properties, types, fetchProperties, setProperties }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}

export const usePropertiesContext = () => useContext(PropertiesContext);
