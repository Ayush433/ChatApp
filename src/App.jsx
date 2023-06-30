import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import RegistrationForm from "./Pages/RegistrationForm";
import SignInForm from "./Pages/SignInForm";

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      navigate("/signIn"); // Redirect to signIn if userInfo is not available
    }
  }, [navigate, userInfo]);

  return (
    <>
      <h1 className="bg-[#e1edff] h-screen flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signUp" element={<RegistrationForm />} />
          <Route path="/signIn" element={<SignInForm />} />
        </Routes>
      </h1>
    </>
  );
}

export default App;
