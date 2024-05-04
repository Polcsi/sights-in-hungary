import { FirebaseError } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";
import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { useAuthContext } from "../../features/auth/AuthContext";
import app from "../../firebase";
import { type ISight } from "../sights/SightCard";
import { type IUserObject } from "./Sight";

interface IDescriptionProps
    extends Pick<ISight, "description" | "userId" | "createdAt" | "likes" | "name" | "location"> {}
const Description = ({ description, userId, createdAt, name, location, likes = 0 }: IDescriptionProps) => {
    const { sightId } = useParams<{ sightId: string }>();
    const { currentUser } = useAuthContext();
    const [author, setAuthor] = React.useState<IUserObject>({} as IUserObject);
    const [userData, setUserData] = React.useState<IUserObject>({} as IUserObject);
    const db = getDatabase(app);
    const sightRef = ref(db, `sights/${sightId}`);
    const authorRef = ref(db, `users/${userId}`);
    const userRef = ref(db, `users/${currentUser?.uid}`);
    const userLikedSightsRef = ref(db, `users/${currentUser?.uid}/likedSights`);

    const isLiked = userData?.likedSights?.includes(sightId ?? "");

    React.useEffect(() => {
        onValue(authorRef, (snapshot) => {
            const data = snapshot.val();
            setAuthor(data);
        });
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            // ? Convert ratings object to array
            const likedSights = data?.likedSights ? Object?.keys(data?.likedSights) : [];
            if (data?.likedSights) {
                data.likedSights = likedSights;
            }
            setUserData(data);
        });
    }, [userId]);

    const handleLikeButtonClicked = async () => {
        if (isLiked) {
            try {
                // ? Decrease the likes count
                await update(sightRef, {
                    likes: likes - 1,
                });
                await update(userLikedSightsRef, {
                    [sightId ?? ""]: null,
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
                    [sightId ?? ""]: true,
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
        <section className="flex justify-center my-7">
            <div className="flex flex-col justify-between items-center w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] self-center gap-7 py-5 border-b-2 border-b-gray-primary">
                <div className="flex w-full text-gray-primary font-bold border-b-2 border-gray-primary pb-3 justify-between items-center">
                    <div className="flex items-center gap-5">
                        <h1 className="text-5xl">{name}</h1>
                        <span className="text-3xl">-</span>
                        <h2 className="text-4xl font-semibold">{location}</h2>
                    </div>
                    <div>
                        <p className="flex items-center gap-2">
                            {likes}
                            <Button className="text-4xl bg-transparent py-0 px-0" onClick={handleLikeButtonClicked}>
                                {isLiked ? <IoMdHeart className="text-red-heart" /> : <IoMdHeartEmpty />}
                            </Button>
                        </p>
                    </div>
                </div>
                <p className="w-full">{description}</p>
                <div className="flex justify-between w-full">
                    <p>{author?.name}</p>
                    <p>{new Date(createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </section>
    );
};

export default Description;
