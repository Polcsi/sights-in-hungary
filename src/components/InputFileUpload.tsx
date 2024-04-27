import React from "react";
import Button from "@mui/joy/Button";
import { useField } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInOut } from "./BasicInputField";
// Importing the icons
import SvgIcon from "@mui/joy/SvgIcon";
import { CiImageOn } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export interface IInputFileUpload extends React.InputHTMLAttributes<HTMLInputElement> {
    label: React.ReactNode;
    name: string;
}

const InputFileUpload = (props: IInputFileUpload) => {
    const { label, ...otherProps } = props;
    const [_, meta, helper] = useField(props.name);
    const { error, touched, value } = meta;
    const { setValue, setTouched } = helper;

    const file = Array.isArray(value) ? (value.at(0) ? URL.createObjectURL(value.at(0)) : null) : null;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTouched(true);
        if (event.target.files) {
            setValue([event.target.files[0]]);
        }
    };

    return (
        <React.Fragment>
            <div className="grid grid-cols-[minmax(200px,calc(calc(var(--page-content-max-width)/4)-27px)),minmax(200px,calc(calc(var(--page-content-max-width)/1)-27px))] gap-3.5">
                <div>
                    <Button
                        onClick={() => {
                            setTouched(true);
                        }}
                        className="w-full h-full flex flex-col justify-center items-center"
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        variant="outlined"
                        color={error && touched ? "danger" : "neutral"}
                        startDecorator={
                            <SvgIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>
                            </SvgIcon>
                        }
                    >
                        {label}
                        <div className="mt-0 text-sm text-red-600 dark:text-red-500">
                            <AnimatePresence initial={false}>
                                {error && touched ? (
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
                        <input
                            style={{
                                clip: "rect(0 0 0 0)",
                                clipPath: "inset(50%)",
                                height: "1px",
                                overflow: "hidden",
                                position: "absolute",
                                bottom: "0",
                                left: "0",
                                whiteSpace: "nowrap",
                                width: "1px",
                            }}
                            {...otherProps}
                            type="file"
                            accept="image/png, image/jpeg, image/webp, image/svg+xml"
                            onChange={handleChange}
                        />
                    </Button>
                </div>
                <div
                    className={`Preview-Image ${error ? "border-red-400 text-red-500" : "border-input-border text-gray-500"} border-[1px] rounded-lg flex justify-center items-center min-h-[300px] ${file ? "group" : ""} relative `}
                >
                    {file ? (
                        <img className="min-h-[300px] rounded-md" src={file} alt="selected-img" />
                    ) : (
                        <div>
                            <CiImageOn className="size-[100px] " />
                            <p className="">Kép előnézet</p>
                        </div>
                    )}
                    {/* // Overlay for the delete button */}
                    <div className="overlay hidden group-hover:flex justify-center items-center bg-[rgba(0,0,0,0.7)] w-full h-full absolute top-0 left-0 rounded-lg transition-all ease-in-out duration-200">
                        <button
                            type="button"
                            className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setValue([]);
                            }}
                        >
                            <MdDeleteOutline className="text-red-600 size-[120px]" />
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default InputFileUpload;
