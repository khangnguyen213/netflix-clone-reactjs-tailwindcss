import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./components/Detail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";

function App() {
  return (
    <>
      <Detail />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
