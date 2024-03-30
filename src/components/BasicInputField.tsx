import React from "react";
import { Field, FieldProps, useField } from "formik";
import { twMerge } from "tailwind-merge";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";

const fadeInOut = {
    initial: { opacity: 0, display: "none", height: 0 },
    in: {
        display: "flex",
        opacity: 1,
        height: "auto",
        transition: { duration: 0.3 },
    },
    out: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.3 },
        transitionEnd: { display: "none" },
    },
};

interface IBasicInputFieldProps extends Partial<FieldProps>, Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
    name: string;
}

const BasicInputField = (props: IBasicInputFieldProps) => {
    const [_, meta] = useField(props.name);
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const { className } = props;

    const { error, touched } = meta;

    return (
        <div className="grid gap-1">
            <div className="relative">
                <Field
                    {...props}
                    type={props.type === "password" ? (showPassword ? "text" : "password") : props.type}
                    className={twMerge(
                        "bg-input-background text-input-text rounded-md w-full outline-none focus-visible:ring-4 focus-visible:ring-blue-500 py-3 px-3 hover:ring-2 hover:ring-blue-500 transition-all duration-200 ease-in-out ring-1 ring-input-border",
                        className
                    )}
                />
                {props.type === "password" ? (
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-input-text text-xl focus-visible:ring-2 focus-visible:ring-blue-500 p-1 rounded-full"
                        onClick={() => {
                            setShowPassword((prev) => !prev);
                        }}
                    >
                        {showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
                    </button>
                ) : null}
            </div>
            <div className="mt-0 text-sm text-red-600 dark:text-red-500">
                <AnimatePresence initial={false}>
                    {error && touched ? (
                        // Apply the fadeInOut animation variants to the error message
                        <motion.div
                            initial="initial"
                            animate={"in"}
                            variants={fadeInOut}
                            exit={"out"}
                            data-testid="error-message"
                        >
                            {error}
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BasicInputField;
