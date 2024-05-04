import { FaUser } from "react-icons/fa6";
import CustomRating from "../../components/CustomRating";
import { type IRating } from "../sights/SightCard";

const RatingCard = (props: IRating) => {
    return (
        <article className="w-full flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
                <div className="size-[50px] bg-gray-light rounded-full flex justify-center items-center">
                    <FaUser className="text-2xl text-input-text" />
                </div>
                <div className="flex flex-col gap-1">
                    <p>{props.comment}</p>
                    <p className="text-input-text text-sm">{new Date(props.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <CustomRating value={props.rating} readOnly />
        </article>
    );
};

export default RatingCard;
