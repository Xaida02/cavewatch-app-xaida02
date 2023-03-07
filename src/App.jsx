import React from "react";
import { Navbar, ScrollTop } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp, Account } from "./pages";
import { ProtectedRoute } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ScrollTop />
    </BrowserRouter>
  );
};

export default App;
