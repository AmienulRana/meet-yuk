import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "lucide-react";

import styles from "@/component/CopySection/index.module.css";
import { ICopySection } from "@/libs/interface";

const CopySection = (props: ICopySection) => {
  const { roomId } = props;

  return (
    <div className="flex flex-col absolute text-white border border-white rounded p-2 left-[30px] bottom-[100px]">
      <div className="text-base">Copy Room ID:</div>
      <hr className="my-1" />
      <div className=" flex items-center text-sm">
        <span>{roomId}</span>
        <CopyToClipboard text={roomId as string}>
          <Copy className="ml-3 cursor-pointer" />
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default CopySection;