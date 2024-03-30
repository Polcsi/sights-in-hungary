import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    linkProps?: LinkProps;
}

const Button = (props: IButton) => {
    const { children, className, linkProps, ...buttonProps } = props;

    const buttonElement = () => {
        return (
            <button
                type="button"
                {...buttonProps}
                className={twMerge("bg-white rounded-md text-black px-7 py-3", className)}
            >
                {children}
            </button>
        );
    };

    if (linkProps) {
        return <Link {...linkProps}>{buttonElement()}</Link>;
    }

    return buttonElement();
};

export default Button;
