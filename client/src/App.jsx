import {BrowserRouter,Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home";
import { About } from "./pages/About";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
const App=() =>{
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
};
export default App;