// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import DefaultLayout from "./layouts/DefaultLayout";
import PropertiesContextProvider from "./contexts/PropertiesContext";
import IndexPropertiesPage from "./pages/properties/IndexPropertiesPage";
import ShowPropertyPage from "./pages/properties/ShowPropertyPage";
import StoreProperty from "./pages/properties/StoreProperty";
function App() {
  return (
    <PropertiesContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<IndexPropertiesPage />} />
            <Route path="properties">
              <Route index element={<SearchPage />} />
              <Route path=":id" element={<ShowPropertyPage />} />
              <Route path="insert" element={<StoreProperty />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </PropertiesContextProvider>
  );
}

export default App;
