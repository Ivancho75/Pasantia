import { BrowserRouter ,Routes, Route } from "react-router";
import MainPage from "./MainPage";
import Login from './Login';
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

function Rutas() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default Rutas


