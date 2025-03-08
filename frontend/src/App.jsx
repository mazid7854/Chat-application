import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { useSelector } from "react-redux";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
