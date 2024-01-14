import { IAvatar } from "@/libs/interface";
import cx from 'classnames';

export default function Avatar({text, className}:IAvatar){
    return (
        <div className={cx("flex items-center bg-primary justify-center min-w-[40px] min-h-[40px] rounded-full", className)}>
        <p className="text-white">{text?.split('')?.[0]}</p>
    </div>
    )
}