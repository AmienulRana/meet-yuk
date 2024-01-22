import Logo from "../Logo";
import MenuSection from "./MenuSection";

const menuSections = [
  {
    title: "Products",
    items: ["Overview", "Integration"],
  },
  {
    title: "Company",
    items: ["About", "Mission and Values", "Pricing"],
  },
  {
    title: "Resources",
    items: ["Careers", "Contact Us", "Blog"],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#F4F7FB] mt-16 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <Logo />
            <p className="mt-3">
              With our advanced modern technology, your meetings are not just
              recorded - they&apos;re transformed into valuable insight and
              productivity boosters.
            </p>

            <h3 className="text-[90px] text-primary mt-3 opacity-20">
              CallYuk
            </h3>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              {menuSections.map((section, index) => (
                <MenuSection key={index} {...section} />
              ))}
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span>{new Date().getFullYear()}</span>
              
                {" "}
                by{" "}
              
              <span className="text-primary">Amienul Rana</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
