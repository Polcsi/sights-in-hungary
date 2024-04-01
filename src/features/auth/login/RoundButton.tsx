import React from "react";
import { motion, type MotionProps } from "framer-motion";

interface RoundButtonProps
    extends Omit<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            "children" | "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style"
        >,
        Omit<MotionProps, "children"> {
    children: React.ReactNode;
}

const RoundButton = (props: RoundButtonProps) => {
    return (
        <motion.button
            whileHover={{
                scale: 1.06,
            }}
            whileTap={{
                scale: 0.95,
            }}
            type="button"
            {...props}
            className="rounded-full ring-4 ring-light-blue p-2 select-none"
        >
            {props.children}
        </motion.button>
    );
};

export default RoundButton;
