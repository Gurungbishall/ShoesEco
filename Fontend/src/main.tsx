import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginPage from "./pages/Login.tsx";
import SignUpPage from "./pages/SignUp.tsx";
import HomePage from "./pages/Home.tsx";
import SpecialOffers from "./components/SpecialOffers/SpecialOffers.tsx";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/specialOffers" element={<SpecialOffers />} />
    </>
  )
);


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
