import { getDatabase, onValue, ref } from "firebase/database";
import React from "react";
import Slider from "../../components/slider/Slider";
import app from "../../firebase";
import type { ISight } from "../sights/SightCard";
import waves from "./images/wave.svg";

const Featured = () => {
    const db = getDatabase(app);
    const sightsRef = ref(db, "sights");

    const [sightsData, setSightsData] = React.useState<ISight[]>([]);

    React.useEffect(() => {
        onValue(sightsRef, (snapshot) => {
            // ? Convert object to array. Object keys are sight ids.
            const data = snapshot.val();
            const sights = data ? Object?.keys(data)?.map((key) => ({ ...data[key], id: key })) : [];

            // ? Sort by likes
            sights.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));

            setSightsData(sights.slice(0, 3));
        });

        return () => {
            setSightsData([]);
        };
    }, []);

    return (
        <React.Fragment>
            <section className="flex gap-14 flex-col justify-start items-center bg-light-blue pt-16 w-screen pb-3">
                <h1 className="text-center text-white text-[50px] font-bold">Kiemelt látnivalók</h1>
                <Slider steps={sightsData} />
            </section>
            <img className="relative" src={waves} alt="horizontal-wave" />
        </React.Fragment>
    );
};

export default Featured;
