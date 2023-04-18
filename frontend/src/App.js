import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Login/>
      }></Route>
      <Route path="/home" element={
        <Home/>
      }></Route>
    </Routes>
  );
}

export default App;