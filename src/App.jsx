import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegistrationForm from "./Pages/RegistrationForm";
import SignInForm from "./Pages/SignInForm";
import {
  Navigate,
  redirect,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  const [count, setCount] = useState(0);
  const nav = useNavigate();
  // const ProtectedRoute = ({ children }) => {
  //   const isLogin = localStorage.getItem("user:Toke") !== null;
  //   if (!isLogin) nav("/signIn");
  //   return children;
  // };

  return (
    <>
      <h1 className="bg-[#e1edff] h-screen flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="signUp" element={<RegistrationForm />} />
          <Route path="signIn" element={<SignInForm />} />
        </Routes>
      </h1>
    </>
  );
}

export default App;
