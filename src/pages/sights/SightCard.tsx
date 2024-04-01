import React from "react";
import Button from "../../components/Button";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import CustomRating from "../../components/CustomRating";

export interface ISight {
    id: number;
    name: string;
    description: string;
    rating: number;
    image: string;
    location: string;
    tags: string[];
    likes: number;
}

const SightCard = (props: ISight) => {
    const [isLiked, setIsLiked] = React.useState<boolean>(false);

    return (
        <article
            className="w-[400px] border-2 border-gray-primary grid grid-rows-[270px,1fr]"
            style={{
                borderRadius: "17px",
            }}
        >
            <div className="relative select-none">
                <img
                    src={props.image}
                    alt={`${props.name}-${props.location}`}
                    style={{
                        borderRadius: "15px 15px 0px 0px",
                        aspectRatio: "16/9",
                        objectFit: "cover",
                        height: "270px",
                    }}
                />
                <div
                    style={{
                        background: "rgba(0, 1, 1, 0.26)",
                        borderRadius: "15px 15px 0px 0px",
                    }}
                    className="Overlay absolute top-0 left-0 w-full h-full"
                />
                <h2 className="text-white font-extrabold text-[48px] absolute bottom-2 left-5">
                    {props.name} - {props.location}
                </h2>
            </div>
            <div className="p-5 grid justify-stretch gap-2 select-none">
                <p
                    className="line-clamp-4 text-base font-normal"
                    style={{
                        lineHeight: "2",
                    }}
                >
                    {props.description}
                </p>
                <div className="flex gap-1 items-center">
                    <CustomRating value={props.rating} readOnly />
                    <p className="text-lg">{props.rating}</p>
                </div>
                <div className="flex justify-between items-center">
                    <Button
                        linkProps={{
                            className: "bg-light-blue text-white py-1 px-6",
                            href: `/sights/${props.id}`,
                        }}
                    >
                        Megnézem
                    </Button>
                    <div className="flex items-center gap-1 select-none">
                        <p>{props.likes}</p>
                        <Button
                            className="px-0 py-0 bg-transparent"
                            onClick={() => {
                                setIsLiked((prev) => !prev);
                            }}
                        >
                            {isLiked ? (
                                <IoMdHeart className="text-3xl text-[#ff3d47]" />
                            ) : (
                                <IoMdHeartEmpty className="text-3xl" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default SightCard;
