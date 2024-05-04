import { type FirebaseError } from "firebase/app";
import { ref as databaseRef, getDatabase, update } from "firebase/database";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import CustomRating from "../../components/CustomRating";
import { useAuthContext } from "../../features/auth/AuthContext";
import app from "../../firebase";
import calculateRating from "../../utils/calculateRating";

export interface ISight {
    id: string;
    name: string;
    description: string;
    rating?: number;
    photoUrl: string;
    photoId: string;
    location: string;
    tags: string[];
    likes?: number;
    createdAt: string;
    updatedAt: string;
    userId: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    ratings: IRating[];
}
export interface IRating {
    comment: string;
    rating: number;
    userId: string;
    createdAt: string;
    id: string;
}

interface ISightCardProps extends ISight {
    isLiked: boolean;
}

const SightCard = (props: ISightCardProps) => {
    const { id, name, description, photoUrl, location, likes = 0, isLiked } = props;
    const { currentUser } = useAuthContext();

    const db = getDatabase(app);
    const userLikedSightsRef = databaseRef(db, `users/${currentUser?.uid}/likedSights`);
    const sightRef = databaseRef(db, `sights/${id}`);

    const rating = calculateRating(props.ratings);

    const handleLikeButtonClicked = async () => {
        if (isLiked) {
            try {
                // ? Decrease the likes count
                await update(sightRef, {
                    likes: likes - 1,
                });
                await update(userLikedSightsRef, {
                    [id]: null,
                });
            } catch (error) {
                switch ((error as FirebaseError).code) {
                    case "PERMISSION_DENIED":
                        toast.error("Jelenkezz be a látnivaló kedveléséhez!");
                        break;
                    default:
                        toast.error("Hiba történt a látnivaló kedvelése közben!");
                        break;
                }
            }
        } else {
            try {
                // ? Increase the likes count
                await update(sightRef, {
                    likes: likes + 1,
                });
                await update(userLikedSightsRef, {
                    [id]: true,
                });
            } catch (error) {
                console.error(error);
                switch ((error as FirebaseError).code) {
                    case "PERMISSION_DENIED":
                        toast.error("Jelentkezz be a látnivaló kedveléséhez!");
                        break;
                    default:
                        toast.error("Hiba történt a látnivaló kedvelése közben!");
                        break;
                }
            }
        }
    };

    return (
        <article
            className="w-[400px] border-2 border-gray-primary grid grid-rows-[270px,1fr]"
            style={{
                borderRadius: "17px",
            }}
        >
            <div className="relative select-none">
                <img
                    src={photoUrl}
                    alt={`${name}-${location}`}
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
                    {name} - {location}
                </h2>
            </div>
            <div className="p-5 grid justify-stretch gap-2 select-none">
                <p
                    className="line-clamp-4 text-base font-normal"
                    style={{
                        lineHeight: "2",
                    }}
                >
                    {description}
                </p>
                <div className="flex gap-1 items-center">
                    <CustomRating value={rating} readOnly />
                    <p className="text-lg">{rating}</p>
                </div>
                <div className="flex justify-between items-center">
                    <Button
                        linkProps={{
                            className: "bg-light-blue text-white py-1 px-6",
                            href: `/sights/${id}`,
                        }}
                    >
                        Megnézem
                    </Button>
                    <div className="flex items-center gap-1 select-none">
                        <p>{likes}</p>
                        <Button className="px-0 py-0 bg-transparent" onClick={handleLikeButtonClicked}>
                            {isLiked ? (
                                <IoMdHeart className="text-3xl text-red-heart" />
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
