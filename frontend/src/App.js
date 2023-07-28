import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Register from "./components/register/register";
import AddItems from "./components/add_items/add_items";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.min.css";
import Home from "./components/Home/Home";
import TopMenu from "./components/TopMenu/TopMenu";
import Footer from "./components/Footer/Footer";
import ProductListView from "./components/products/ProductListView";
import { Suspense } from "react";
import CheckoutView from "./components/CheckoutView/CheckoutView";
import ContactUsView from "./components/ContactUs/ContactUsView";



function App() {
  return (
    <BrowserRouter>
    <Header/>
    <TopMenu/>
    <Suspense
          fallback={
            <div className="text-white text-center mt-3">Loading...</div>
          }
        >
      <Routes>
        <Route path="/productsPage" element={<ProductListView/>}></Route>
        <Route path="" element={<Home/>}></Route>
        <Route exact path="/" element={<Register />}></Route>
        <Route path="/AddItems" element={<AddItems/>}></Route>
        <Route path="/checkout" element={<CheckoutView/>}></Route>
        <Route path="/contactUs" element={<ContactUsView/>}></Route>

      </Routes>
      </Suspense>

      <Footer/>
    </BrowserRouter>

  );
}

export default App;
