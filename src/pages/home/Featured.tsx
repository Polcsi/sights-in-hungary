import React from "react";
import horizontal from "../../components/layout/waves/horizontal/horizontal.svg";

const Featured = () => {
    return (
        <React.Fragment>
            <section className="flex gap-10 flex-col justify-center bg-light-blue py-10 w-screen">
                <h1 className="text-center text-white text-[50px] font-bold">Kiemelt látnivalók</h1>
                <div className=""></div>
            </section>
            <img className="" src={horizontal} alt="horizontal-wave" />
        </React.Fragment>
    );
};

export default Featured;
