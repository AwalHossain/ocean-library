import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <Header />
      <div className="py-16 md:container px-2">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
