import { motion, useAnimate, useInView, type Variants } from "framer-motion";
import React from "react";
import { type ISight } from "../../pages/sights/SightCard";
import calculateRating from "../../utils/calculateRating";
import RatingForm from "./RatingForm";

interface IWriteRatingProps {
    sightData: ISight | null;
}

const WriteRating = ({ sightData }: IWriteRatingProps) => {
    const [scope, animate] = useAnimate();
    const isInView = useInView(scope, { margin: "-200px" });
    const rating = calculateRating(sightData?.ratings);

    React.useEffect(() => {
        if (isInView) {
            animate(
                scope.current,
                {
                    opacity: 1,
                    right: 40,
                },
                {
                    delay: 0.5,
                    duration: 1,
                    damping: 5,
                }
            );
        } else {
            animate(
                scope.current,
                {
                    opacity: 0,
                    right: -50,
                },
                {
                    duration: 0.5,
                }
            );
        }
    }, [isInView]);

    const variant: Variants = {
        hidden: {
            opacity: 0,
            right: -50,
        },
        visible: {
            opacity: 1,
            right: 40,
            transition: {
                delay: 0.5,
            },
        },
        hiddenDOM: {
            opacity: 0,
            transitionEnd: {
                display: "none",
            },
        },
        visibleDOM: {
            display: "flex",
            opacity: 1,
        },
    };

    return (
        <aside
            ref={scope}
            className="absolute right-10 top-[50%] -translate-y-[50%] bg-white rounded-2xl py-6 px-7 flex flex-col gap-3 w-[350px] 2xl:w-[370px] shadow-2xl ring-1 ring-gray-light"
        >
            <motion.div
                variants={variant}
                initial={"hidden"}
                animate={!sightData ? "visibleDOM" : "hiddenDOM"}
                className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-center w-full h-full  flex justify-center items-center z-10"
            >
                <p className="text-lg font-normal">Válassz egy látnivalót a térképről!</p>
            </motion.div>
            <motion.div
                variants={variant}
                initial={"hidden"}
                animate={sightData ? "visible" : "hidden"}
                className="flex flex-col gap-3"
            >
                <h1 className="text-3xl 2xl:text-4xl font-semibold leading-10 2xl:leading-[46px]">
                    Kiválasztott látnivaló
                </h1>
                <hr className="border-gray-primary border-[1.5px]" />
            </motion.div>
            <motion.div
                variants={variant}
                initial={"hidden"}
                animate={sightData ? "visible" : "hidden"}
                className="flex flex-col gap-2"
            >
                <div className="flex gap-1 font-semibold text-xl">
                    <span>{sightData?.name}</span>
                    <span>-</span>
                    <span>{sightData?.location}</span>
                </div>
                <div className="flex gap-2 text-input-text font-medium items-center">
                    <span className="font-semibold text-xl">{rating}</span>
                    <span>értékelés</span>
                </div>
                <p className="text-justify text-base font-normal line-clamp-4 2xl:line-clamp-6">
                    {sightData?.description}
                </p>
                <RatingForm id={sightData?.id} />
            </motion.div>
        </aside>
    );
};

export default WriteRating;
