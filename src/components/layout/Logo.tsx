import React from "react";
import logo from "../../assets/logo640x360.png";
import { twMerge } from "tailwind-merge";

interface ILogoProps {
    imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    text?: React.ReactNode;
    className?: string;
}

const Logo = ({ imageProps, text, className }: ILogoProps) => {
    return (
        <div className={twMerge("flex justify-center items-center text-inherit", className)}>
            <img {...imageProps} className={twMerge("w-[90px]", imageProps?.className)} src={logo} alt="logo" />
            {text ?? <span className="uppercase font-bold text-inherit">látnivalók magyarországon</span>}
        </div>
    );
};

export default Logo;
