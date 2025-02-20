import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Navi from "./Navi";

const Layout = () => {
  return (
    <>
      <Header />
      <Navi />
      <div className="mt-[180px] w-screen flex flex-col gap-[80px] justify-center items-center">
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
