import { Routes, Route } from "react-router";
import MainPage from "./MainPage";

<Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/MainPage" element={<MainPage />} />
</Routes>
