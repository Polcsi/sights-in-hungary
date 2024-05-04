import { getDatabase, onValue, ref, remove } from "firebase/database";
import React from "react";
import { IoMdHeart } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { useAuthContext } from "../../features/auth/AuthContext";
import app from "../../firebase";
import { type ISight } from "../sights/SightCard";

interface ILikedSightCardProps {
    sightId: string;
}

const LikedSightCard = ({ sightId }: ILikedSightCardProps) => {
    const { currentUser } = useAuthContext();
    const db = getDatabase(app);
    const sightsRef = ref(db, `sights/${sightId}`);
    const userRef = ref(db, `users/${currentUser?.uid}/likedSights/${sightId}`);

    const [sightData, setSightData] = React.useState<ISight | null>(null);

    const removeLikedSight = async () => {
        try {
            await remove(userRef);
        } catch (error) {
            toast.error("Hiba történt a látnivaló eltávolítása közben!");
            console.error(error);
        }
    };

    React.useEffect(() => {
        onValue(sightsRef, (snapshot) => {
            const data = snapshot.val();
            setSightData(data);
        });
    }, []);

    return sightData ? (
        <article className="border-b-[1.5px] border-b-gray-primary pb-2 flex flex-row gap-3 items-center justify-between">
            <Link className="flex gap-3 items-center" to={`/sights/${sightId}`}>
                <img
                    className="size-[65px] rounded-full object-fill"
                    src={sightData.photoUrl}
                    alt={sightData.name + "-image"}
                />
                <div className="flex flex-col text-gray-primary">
                    <h1 className="text-xl font-bold line-clamp-2">{sightData.name}</h1>
                    <h2 className="text-base font-medium line-clamp-1">{sightData.location}</h2>
                </div>
            </Link>
            <div>
                <Button className="py-0 px-1" onClick={removeLikedSight}>
                    <IoMdHeart className="text-3xl text-red-heart" />
                </Button>
            </div>
        </article>
    ) : (
        <div>Loading...</div>
    );
};

export default LikedSightCard;
