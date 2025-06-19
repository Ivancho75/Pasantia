import { BrowserRouter ,Routes, Route } from "react-router";

import App from './App.jsx';
import Futbol from './futbol.jsx';
import Basket from './basket.jsx';
import Tenis from "./Tenis.jsx";
import Boxeo from "./Boxeo.jsx";
import Ajedrez from "./Ajedrez.jsx";


function Rutas() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/futbol' element={<Futbol />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/tenis' element={<Tenis />} />
        <Route path='/boxeo' element={<Boxeo />} />
        <Route path='/ajedrez' element={<Ajedrez />} />
      </Routes>
    </BrowserRouter>
    </>
    );
}

export default Rutas