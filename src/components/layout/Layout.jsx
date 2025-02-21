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
      <div className="mt-[300px] min-h-[calc(100vh-300px)] w-screen flex flex-col gap-[80px] justify-between items-center">
        <Outlet className="w-screen flex-grow flex flex-col gap-[80px] justify-center items-center" />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
