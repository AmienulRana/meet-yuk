import { IAvatar } from "@/libs/interface";
import { getRandomBrightColor } from "@/libs/utils";
import cx from 'classnames';
import React from 'react';

const Avatar = ({text, className, color}:IAvatar) => {
    return (
        <div className={cx("flex items-center justify-center min-w-[40px] min-h-[40px] rounded-full", className)} style={{background: color || getRandomBrightColor()}}>
        <p className="text-white">{text?.split('')?.[0]}</p>
    </div>
    )
}
export default React.memo(Avatar)