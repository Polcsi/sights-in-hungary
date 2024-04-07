import React from "react";
import { twMerge } from "tailwind-merge";
import { motion, type MotionProps } from "framer-motion";
import loadingAnimation from "../assets/lotties/loading.json";
import Lottie from "react-lottie";

interface IButtonProps
    extends Omit<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            "children" | "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style"
        >,
        Omit<MotionProps, "children"> {
    children: React.ReactNode;
    isProcessing?: boolean;
    linkProps?: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & Omit<MotionProps, "children">;
}

const CLASSNAME =
    "cursor-pointer bg-white rounded-md text-black px-7 select-none outline-none focus-visible:ring-4 focus-visible:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center" as const;
const Button = (props: IButtonProps) => {
    const { children, className, linkProps, isProcessing, ...buttonProps } = props;

    const renderButton = () => {
        if (linkProps) {
            return (
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    {...linkProps}
                    className={twMerge(isProcessing ? CLASSNAME + " py-0" : CLASSNAME + " py-3", linkProps.className)}
                >
                    {isProcessing ? (
                        <div className="flex items-center">
                            <Lottie
                                height={50}
                                width={50}
                                options={{
                                    animationData: loadingAnimation,
                                    rendererSettings: {
                                        preserveAspectRatio: "xMidYMid slice",
                                    },
                                }}
                            />
                            {children}
                        </div>
                    ) : (
                        children
                    )}
                </motion.a>
            );
        }
        return (
            <motion.button
                whileHover={isProcessing ? {} : { scale: 1.05 }}
                whileTap={isProcessing ? {} : { scale: 0.95 }}
                type="button"
                disabled={isProcessing}
                {...buttonProps}
                className={twMerge(isProcessing ? CLASSNAME + " py-0" : CLASSNAME + " py-3", className)}
            >
                {isProcessing ? (
                    <div className="flex items-center">
                        <Lottie
                            height={50}
                            width={50}
                            options={{
                                animationData: loadingAnimation,
                                rendererSettings: {
                                    preserveAspectRatio: "xMidYMid slice",
                                },
                            }}
                        />
                        {children}
                    </div>
                ) : (
                    children
                )}
            </motion.button>
        );
    };

    return renderButton();
};

export default Button;
