import { Inter } from "next/font/google";
import { useEffect } from "react";
import NavbarHome from "@/components/NavbarHome";
import {
  Benefits,
  CompanyUsage,
  Faq,
  Feature,
  Hero,
  Invitation,
  Review,
} from "@/components/pages/home";
import { Footer } from "@/components/footer";
import { ModalCreateRoom } from "@/components/modal";
import ModalJoinRoom from "@/components/modal/ModalJoinRoom";
import { Toaster } from "react-hot-toast";
import Accordion from "@/components/Accordion";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    localStorage.removeItem("refresh");
  }, []);

  return (
    <div className="overflow-hidden">
      <NavbarHome />
      <Hero />
      <CompanyUsage />
      <Feature />
      <Benefits />
      <Review />
      <Invitation />
      <Faq />
      <Footer />
      <ModalJoinRoom />
      <ModalCreateRoom />
      <Toaster />
    </div>
  );
}
