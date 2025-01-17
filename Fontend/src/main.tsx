import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginPage from "./pages/Login.tsx";
import SignUpPage from "./pages/SignUp.tsx";
import HomePage from "./pages/Home.tsx";
import Editprofile from "./components/EditProfile/Editprofiel.tsx";
import SpecialOffers from "./components/SpecialOffers/SpecialOffers.tsx";
import Mostpopular from "./components/Mostpopular/Mostpopular.tsx";
import Shoe from "./components/Shoe/Shoe.tsx";
import CartPage from "./pages/Cart.tsx";
import CheckOut from "./pages/CheckOut.tsx";
import OrderPage from "./pages/Order.tsx";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/editprofile" element={<Editprofile />} />
      <Route path="/specialOffers" element={<SpecialOffers />} />
      <Route path="/mostpopular" element={<Mostpopular />} />
      <Route path="/shoe" element={<Shoe />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/order" element={<OrderPage />} />
    </>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
