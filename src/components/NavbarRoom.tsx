import CopySection from "./CopySection";
import Logo from "./Logo";

export default function NavbarRoom() {
  return (
    <div className="flex border-b-2 border-lightgray md:px-10 px-4 items-center">
      <div className="border-r pr-10 py-2 border-gray-200">
        <Logo />
      </div>
      <div className="flex items-center flex-1 justify-between px-9">
        <div className="">
          <h1 className="text-xl font-semibold">
            [Internal] Weekly Report Marketing + Sales
          </h1>
          <p className="text-sm mt-1 text-graytext">
            Jan 12th, 2024 | 11:00 AM
          </p>
        </div>
        <CopySection roomId="12345" />
      </div>
    </div>
  );
}
