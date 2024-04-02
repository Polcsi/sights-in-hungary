import React from "react";
import { motion } from "framer-motion";

const Transition = (Component: React.FC) => {
    return () => {
        return (
            <React.Fragment>
                <Component />
                <motion.div
                    className="fixed top-0 left-0 w-full h-screen bg-gray-primary z-[100]"
                    style={{
                        transformOrigin: "bottom",
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                    className="fixed top-0 left-0 w-full h-screen bg-gray-primary z-[100]"
                    style={{
                        transformOrigin: "top",
                    }}
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
            </React.Fragment>
        );
    };
};

export default Transition;
