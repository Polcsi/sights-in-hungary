import React from "react";
import logo from "../../assets/logo640x360.png";
import { twMerge } from "tailwind-merge";

interface ILogoProps {
    imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    text?: React.ReactNode;
}

const Logo = ({ imageProps, text }: ILogoProps) => {
    return (
        <div className="flex justify-center items-center text-inherit">
            <img {...imageProps} className={twMerge("w-[90px]", imageProps?.className)} src={logo} alt="logo" />
            {text ?? <span className="uppercase font-bold text-inherit">látnivalók magyarországon</span>}
        </div>
    );
};

export default Logo;
