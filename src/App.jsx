import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContenedorPrincipal from './componentes/estructura/ContenedorPrincipal';
import PaginaInicio from './paginas/PaginaInicio';
import PaginaPerfil from './paginas/PaginaPerfil';
import PaginaCapacidades from './paginas/PaginaCapacidades';
import PaginaServicios from './paginas/PaginaServicios';
import PaginaArbol from './paginas/PaginaArbol';
import PaginaBitacora from './paginas/PaginaBitacora';
import PaginaNoEncontrada from './paginas/PaginaNoEncontrada';
import PaginaAlternativa from './paginas/PaginaAlternativa';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContenedorPrincipal />}>
          <Route index element={<PaginaInicio />} />
          <Route path="perfil/:id" element={<PaginaPerfil />} />
          <Route path="capacidades" element={<PaginaCapacidades />} />
          <Route path="servicios-api" element={<PaginaServicios />} />
          <Route path="arquitectura" element={<PaginaArbol />} />
          <Route path="bitacora" element={<PaginaBitacora />} />
          <Route path="alternativa" element={<PaginaAlternativa />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
