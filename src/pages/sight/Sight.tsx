import { getDatabase, onValue, ref } from "firebase/database";
import React from "react";
import { useParams } from "react-router-dom";
import FooterBottom from "../../components/layout/footer/FooterBottom";
import FooterLogo from "../../components/layout/footer/FooterLogo";
import app from "../../firebase";
import { type ISight } from "../sights/SightCard";
import Banner from "./Banner";
import Description from "./Description";
import RatingList from "./RatingList";

export interface IUserObject {
    name: string;
    likedSights: string[];
}

const Sight = () => {
    const { sightId } = useParams<{
        sightId: string;
    }>();
    const [sightData, setSightData] = React.useState<ISight>({} as ISight);
    const db = getDatabase(app);
    const sightRef = ref(db, `sights/${sightId}`);

    React.useEffect(() => {
        onValue(sightRef, (snapshot) => {
            const data = snapshot.val();
            // ? Convert ratings object to array
            const ratings = data?.ratings
                ? Object?.keys(data?.ratings)?.map((ratingKey) => {
                      return { ...data?.ratings[ratingKey], id: ratingKey };
                  })
                : [];
            data.ratings = ratings;
            setSightData(data);
        });
    }, [sightId]);

    return (
        <main>
            <Banner name={sightData.name} location={sightData.location} photoUrl={sightData.photoUrl} />
            <Description
                description={sightData.description}
                userId={sightData.userId}
                createdAt={sightData.createdAt}
                name={sightData.name}
                location={sightData.location}
                likes={sightData.likes}
            />
            <RatingList ratings={sightData.ratings} />
            <FooterLogo />
            <FooterBottom />
        </main>
    );
};

export default Sight;
