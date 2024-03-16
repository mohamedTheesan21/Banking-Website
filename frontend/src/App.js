import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import Register from "./Pages/Register";
import Account from "./Pages/Account";
import Verification from "./Pages/Verification";
import SignUp from "./Pages/SignUp";
import AccountDetails from "./Pages/AccountDetails";
import Transfer from "./Pages/Transfer";
import TransferDetails from "./Pages/TransferDetails";
import VerifyTransfer from "./Pages/VerifyTransfer";
import AboutUs from "./Pages/Home/AboutUs";
import ContactUs from "./Pages/Home/ContactUs";
import FAQ from "./Pages/Home/FAQ";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account/details" element={<AccountDetails />} />
        <Route path="/account/transfer" element={<Transfer /> }/>
        <Route path="/account/transfer/details" element={<TransferDetails />} />
        <Route path="/account/transfer/verify" element={<VerifyTransfer />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
