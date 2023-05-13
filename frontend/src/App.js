import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Home/>
      }></Route>
    </Routes>
  );
}

export default App;