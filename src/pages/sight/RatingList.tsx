import { FaRegStar } from "react-icons/fa";
import calculateRating from "../../utils/calculateRating";
import { ISight } from "../sights/SightCard";
import RatingCard from "./RatingCard";
import RatingForm from "./RatingForm";

export interface IRatingListProps extends Pick<ISight, "ratings"> {}

const RatingList = ({ ratings }: IRatingListProps) => {
    const rating = calculateRating(ratings);

    return (
        <section className="flex justify-center">
            <div className="flex flex-col justify-between items-center w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] self-center gap-7 py-5">
                <div className="flex w-full justify-between">
                    <h1 className="w-full text-2xl font-medium">Értékelések</h1>
                    <div className="flex items-center gap-2">
                        <p className="text-lg text-gray-primary font-semibold">{rating}</p>
                        <FaRegStar className="text-red-heart text-3xl" />
                    </div>
                </div>
                <div className="w-full h-auto flex flex-col gap-5">
                    {Array.isArray(ratings) && ratings?.length > 0 ? (
                        ratings.map((rating) => {
                            return <RatingCard key={rating.id} {...rating} />;
                        })
                    ) : (
                        <p>Nincs értékelés!</p>
                    )}
                </div>
                <RatingForm />
            </div>
        </section>
    );
};

export default RatingList;
