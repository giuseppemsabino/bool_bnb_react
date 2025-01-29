// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
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
            <Route index element={<HomePage />} />
            <Route path="properties">
              <Route index element={<IndexPropertiesPage />} />
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
