import { useAnimate, useInView } from "framer-motion";
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

    return (
        <aside
            ref={scope}
            className="absolute right-10 top-[50%] -translate-y-[50%] bg-white rounded-2xl py-6 px-7 flex flex-col gap-3 w-[350px] 2xl:w-[370px] shadow-2xl ring-1 ring-gray-light"
        >
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl 2xl:text-4xl font-semibold leading-10 2xl:leading-[46px]">
                    Kiválasztott látnivaló
                </h1>
                <hr className="border-gray-primary border-[1.5px]" />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-1 font-semibold text-xl">
                    <span>{sightData?.name}</span>
                    <span>-</span>
                    <span>{sightData?.location}</span>
                </div>
                <div className="flex gap-2 text-input-text font-medium items-center">
                    <span className="font-semibold text-xl">{rating}.0</span>
                    <span>értékelés</span>
                </div>
                <p className="text-justify text-base font-normal line-clamp-4 2xl:line-clamp-6">
                    {sightData?.description}
                </p>
                <RatingForm id={sightData?.id} />
            </div>
        </aside>
    );
};

export default WriteRating;
