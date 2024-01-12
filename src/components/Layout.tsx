import { ILayout } from "@/libs/interface";
import Logo from "./Logo";
import CopySection from "./CopySection";
import NavbarRoom from "./NavbarRoom";

export default function Layout({ children }: ILayout) {
  return (
    <div className="mx-auto min-h-screen max-w-[1500px]">
      <NavbarRoom />
      {children}
    </div>
  );
}
