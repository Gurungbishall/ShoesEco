import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginPage from "./pages/Login.tsx";
import SignUpPage from "./pages/customerPages/SignUp.tsx";
import HomePage from "./pages/customerPages/Home.tsx";
import SpecialOffers from "./components/customerComponents/SpecialOffers/SpecialOffers.tsx";
import Mostpopular from "./components/customerComponents/Mostpopular/Mostpopular.tsx";
import Shoe from "./components/customerComponents/Shoe/Shoe.tsx";
import CartPage from "./pages/customerPages/Cart.tsx";
import CheckOut from "./pages/customerPages/CheckOut.tsx";
import OrderPage from "./pages/customerPages/Order.tsx";
import Profile from "./pages/customerPages/Profile.tsx";
import EditProfile from "./components/customerComponents/EditProfile/Editprofiel.tsx";
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
      <Route path="/profile" element={<Profile />} />
      <Route path="/specialOffers" element={<SpecialOffers />} />
      <Route path="/mostpopular" element={<Mostpopular />} />
      <Route path="/shoe" element={<Shoe />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/editprofile" element={<EditProfile />} />
    </>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
