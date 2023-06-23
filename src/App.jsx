import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegistrationForm from "./Pages/RegistrationForm";
import SignInForm from "./Pages/SignInForm";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="bg-[#e1edff] h-screen flex justify-center items-center">
        <Routes>
          <Route path="" element={<RegistrationForm />} />
          <Route path="signIn" element={<SignInForm />} />
        </Routes>
      </h1>
    </>
  );
}

export default App;
