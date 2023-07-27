import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Register from "./components/register/register";
import AddItems from "./components/add_items/add_items";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Register />}></Route>
        <Route path="/AddItems" element={<AddItems/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
