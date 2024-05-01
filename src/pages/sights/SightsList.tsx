import { getDatabase, onValue, ref } from "firebase/database";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import { useAuthContext } from "../../features/auth/AuthContext";
import app from "../../firebase";
import SightCard, { type ISight } from "./SightCard";

const SightsList = () => {
    const { currentUser } = useAuthContext();

    const db = getDatabase(app);
    const sightsRef = ref(db, "sights");
    const userLikedSightsRef = ref(db, `users/${currentUser?.uid}/likedSights`);
    const [sightsData, setSightsData] = React.useState<ISight[]>([]);
    const [isSightsLoading, setIsSightsLoading] = React.useState<boolean>(true);
    const [likedSights, setLikedSights] = React.useState<string[]>([]);
    const [isLikedSightsLoading, setIsLikedSightsLoading] = React.useState<boolean>(true);

    const [searchParams, setSearchParams] = useSearchParams({ sort: "newest" });

    const renderCards = () => {
        const isLoading = currentUser ? !isLikedSightsLoading && !isSightsLoading : !isSightsLoading;

        switch (searchParams.get("sort")) {
            case "newest":
                sightsData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case "popular":
                sightsData.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
                break;
        }

        return (
            <>
                {Array.isArray(sightsData) && sightsData?.length > 0 && isLoading ? (
                    sightsData?.map((sight) => {
                        const isLiked = likedSights.includes(sight.id);

                        return <SightCard key={sight.id} {...sight} isLiked={isLiked} />;
                    })
                ) : (
                    <p>Nem található látnivaló!</p>
                )}
            </>
        );
    };

    React.useEffect(() => {
        onValue(sightsRef, (snapshot) => {
            // ? Convert object to array. Object keys are sight ids.
            const data = snapshot.val();
            const sights = data ? Object?.keys(data)?.map((key) => ({ ...data[key], id: key })) : [];
            setSightsData(sights);
            setIsSightsLoading(false);
        });

        return () => {
            setSightsData([]);
            setIsSightsLoading(true);
        };
    }, []);

    React.useEffect(() => {
        onValue(userLikedSightsRef, (snapshot) => {
            const data = snapshot.val();
            const likedSights = data ? Object?.keys(data) : [];
            setLikedSights(likedSights);
            setIsLikedSightsLoading(false);
        });

        return () => {
            setLikedSights([]);
            setIsLikedSightsLoading(true);
        };
    }, [currentUser]);

    return (
        <section className="flex flex-col gap-2" id="list">
            <div className="flex justify-between items-center py-3 border-b-2 border-b-gray-primary w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] self-center">
                <h1 className="text-3xl font-semibold">Látnivalók</h1>
                <div className="flex self-end gap-2">
                    <Button
                        className={`${searchParams.get("sort") === "newest" ? "bg-gray-primary" : "bg-light-blue"} text-white py-1 px-6`}
                        onClick={() => {
                            setSearchParams({ sort: "newest" });
                        }}
                    >
                        Legújabb
                    </Button>
                    <Button
                        className={`${searchParams.get("sort") === "popular" ? "bg-gray-primary" : "bg-light-blue"} text-white py-1 px-6`}
                        onClick={() => {
                            setSearchParams({ sort: "popular" });
                        }}
                    >
                        Legnépszerűbb
                    </Button>
                </div>
            </div>
            <div className="py-10 flex flex-wrap gap-10 justify-center w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] self-center">
                {renderCards()}
            </div>
        </section>
    );
};

export default SightsList;
