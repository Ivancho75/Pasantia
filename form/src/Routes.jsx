import { BrowserRouter ,Routes, Route } from "react-router";

import App from './App.jsx';



function Rutas() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/mainPage' element={<MainPage />} />

      </Routes>
    </BrowserRouter>
    </>
    );
}

export default Rutas