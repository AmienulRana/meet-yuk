import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link2 } from "lucide-react";

import styles from "@/component/CopySection/index.module.css";
import { ICopySection } from "@/libs/interface";
import { IoLink } from "react-icons/io5";

const CopySection = (props: ICopySection) => {
  const { roomId } = props;

  return (
    <CopyToClipboard text={roomId as string}>
      <div className="flex md:max-w-[200px] w-max text-primary items-center gap-4 bg-lightblue rounded-full justify-center cursor-pointer p-2 px-3">
        <IoLink className="min-w-max min-h-max text-lg" />
        <span className="text-sm border-l-2 border-primary pl-3 truncate">1231-31321-3132</span>
      </div>
    </CopyToClipboard>
  );
};

export default CopySection;
