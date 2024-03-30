import React from "react";
import { twMerge } from "tailwind-merge";
import { motion, type MotionProps } from "framer-motion";

interface IButtonProps
    extends Omit<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            "children" | "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style"
        >,
        Omit<MotionProps, "children"> {
    children: React.ReactNode;
    linkProps?: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & Omit<MotionProps, "children">;
}

const CLASSNAME =
    "cursor-pointer bg-white rounded-md text-black px-7 py-3 select-none outline-none focus-visible:ring-4 focus-visible:ring-blue-500" as const;
const Button = (props: IButtonProps) => {
    const { children, className, linkProps, ...buttonProps } = props;

    const renderButton = () => {
        if (linkProps) {
            return (
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    {...linkProps}
                    className={twMerge(CLASSNAME, linkProps.className)}
                >
                    {children}
                </motion.a>
            );
        }
        return (
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                {...buttonProps}
                className={twMerge(CLASSNAME, className)}
            >
                {children}
            </motion.button>
        );
    };

    return renderButton();
};

export default Button;
