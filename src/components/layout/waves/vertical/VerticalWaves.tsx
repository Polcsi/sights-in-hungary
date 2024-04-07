import React from "react";
import vertical from "./vertical.svg";

interface IVerticalWavesProps {
    content1?: React.ReactNode;
    content2?: React.ReactNode;
}

const VerticalWaves = ({ content1, content2 }: IVerticalWavesProps) => {
    return (
        <div className="flex justify-between w-screen overflow-hidden h-screen">
            <section className="flex justify-center items-center w-[50%]">{content1}</section>
            <section className="absolute top-0 right-0 flex">
                <div className="absolute top-[50%] left-[100%] translate-x-[-100%] translate-y-[-50%] w-[90%]">
                    {content2}
                </div>
                <img className="h-screen relative -right-[1px] -z-[1]" src={vertical} alt="wave" />
                <div className="bg-light-blue w-[400px] 2xl:w-[500px] h-screen" />
            </section>
        </div>
    );
};

export default VerticalWaves;
