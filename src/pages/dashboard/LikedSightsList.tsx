import { getDatabase, onValue, ref } from "firebase/database";
import React from "react";
import { useAuthContext } from "../../features/auth/AuthContext";
import app from "../../firebase";
import LikedSightCard from "./LikedSightCard";

const LikedSightsList = () => {
    const { currentUser } = useAuthContext();
    const db = getDatabase(app);
    const userLikedSightsRef = ref(db, `users/${currentUser?.uid}/likedSights`);

    const [likedSights, setLikedSights] = React.useState<string[]>([]);

    React.useEffect(() => {
        onValue(userLikedSightsRef, (snapshot) => {
            const data = snapshot.val();
            const likedSights = data ? Object.keys(data) : [];
            setLikedSights(likedSights);
        });
    }, []);

    return (
        <section className="flex flex-col gap-1">
            <h1 className="pl-2 text-lg font-medium">Kedvelt látnivalók</h1>
            <div className="flex flex-col gap-3 border-2 border-gray-primary rounded-xl w-[350px] h-[calc(100vh-160px)] p-4 overflow-auto">
                {likedSights?.map((sightId) => {
                    return <LikedSightCard key={sightId} sightId={sightId} />;
                })}
            </div>
        </section>
    );
};

export default LikedSightsList;
