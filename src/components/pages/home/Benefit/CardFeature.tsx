import { ICardFeature } from "@/libs/interface";
import { BsCameraVideoFill } from "react-icons/bs";

export const background = {
    purple: 'bg-purple-300',
    orange: 'bg-[#FF8742]',
    blue: 'bg-[#A2CCF0]',
    green: 'bg-[#B3FFD1]',
};

const border = {
    purple: 'border-purple-300',
    orange: 'border-[#FF8742]',
    blue: 'border-[#A2CCF0]',
    green: 'border-[#B3FFD1]',
}

export default function CardFeature({
  title,
  desc,
  color,
  Icon,
}: ICardFeature) {
  return (
    <div className={`px-5 bg-white py-6 border-t-2 shadow-xl h-[230px] ${border[color]}`}>
      <div
        className={`w-10 h-10 rounded-full  flex items-center justify-center ${background[color]}`}
      >
        <Icon />
      </div>
      <p className="text-xl mt-4 font-semibold">{title}</p>
      <p className="text-gray-400 mt-4">{desc}</p>
    </div>
  );
}
