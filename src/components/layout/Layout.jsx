import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Navi from "./Navi";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <Header />
      <Navi />
      <div className="mt-[180px] md:mt-[240px] w-screen flex flex-col gap-[80px] justify-between items-center">
        <Outlet className="flex-grow pt-[200px] md:pt-[250px] lg:pt-[300px] flex flex-col items-center gap-[80px] w-full" />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;


//h-[140px] md:h-[200px]