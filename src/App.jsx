import "./App.css";
import Form from "./Modules/Form";
import Dashboard from "./Modules/Dashboard";
import { toast } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children, auth = false }) => {
  const isLoggedIn = localStorage.getItem("user:token") !== null || false;

  if (!isLoggedIn && auth) {
    return <Navigate to={"/users/sign_in"} />;
  } else if (
    isLoggedIn &&
    ["/users/sign_in", "/users/sign_up"].includes(window.location.pathname)
  ) {
    console.log("object :>> ");
    return <Navigate to={"/"} />;
  }

  return children;
};

function App() {
  return (
    <div>
      <ToastContainer autoClose={1000} position="top-right" />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute auth={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/sign_in"
          element={
            <ProtectedRoute>
              <Form isSignInPage={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/sign_up"
          element={
            <ProtectedRoute>
              <Form isSignInPage={false} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
