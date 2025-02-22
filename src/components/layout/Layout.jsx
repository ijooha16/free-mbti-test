import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Navi from "./Navi";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
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
        // transition={Bounce}
      />
      <Header />
      <Navi />
      <div className="mt-[180px] md:mt-[300px] min-h-[calc(100vh-300px)] w-screen flex flex-col gap-[80px] justify-between items-center">
        <Outlet className="flex-grow pt-[200px] md:pt-[250px] lg:pt-[300px] flex flex-col items-center gap-[80px] w-full" />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
