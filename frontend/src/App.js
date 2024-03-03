import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import Register from "./Pages/Register";
import Account from "./Pages/Account";
import Verification from "./Pages/Verification";
import SignUp from "./Pages/SignUp";
import { useAuth } from "./Contexts/Auth";

function App() {
  const { isAuthenticated, isNeedVerification, isVerified, isRegisterd } = useAuth();

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Navigate to="/signin" />}
        />
        <Route path="/verification" element={isNeedVerification ? <Verification /> : isVerified  ? <Navigate to="/signup" /> : <Navigate to="/register" />} />
        <Route path="/signup" element={isVerified && isRegisterd ? <SignUp /> : <Navigate to="/register" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
