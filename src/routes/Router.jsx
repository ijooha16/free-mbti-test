import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Layout from "../components/layout/Layout.jsx";
import Login from "../pages/Login.jsx";
import Profile from "../pages/Profile.jsx";
import ResultPage from "../pages/ResultPage.jsx";
import Signup from "../pages/Signup.jsx";
import TestPage from "../pages/TestPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/test" element={<TestPage />} />
            <Route path="/results" element={<ResultPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;