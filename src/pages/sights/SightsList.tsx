import React from "react";
import Button from "../../components/Button";
import app from "../../firebase";
import SightCard, { type ISight } from "./SightCard";
import { getDatabase, ref, onValue } from "firebase/database";

const SightsList = () => {
    const db = getDatabase(app);
    const sightsRef = ref(db, "sights");
    const [sightsData, setSightsData] = React.useState<ISight[]>([]);

    React.useEffect(() => {
        onValue(sightsRef, (snapshot) => {
            // ? Convert object to array. Object keys are sight ids.
            const data = snapshot.val();
            const sights = Object.keys(data).map((key) => ({ ...data[key], id: key }));
            setSightsData(sights);
        });
    }, []);

    return (
        <section className="flex flex-col gap-2" id="list">
            <div className="flex justify-between items-center py-3 border-b-2 border-b-gray-primary w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] self-center">
                <h1 className="text-3xl font-semibold">Látnivalók</h1>
                <div className="flex self-end gap-2">
                    <Button className="bg-light-blue text-white py-1 px-6">Legújabb</Button>
                    <Button className="bg-light-blue text-white py-1 px-6">Legnépszerűbb</Button>
                </div>
            </div>
            <div className="py-10 flex flex-wrap gap-10 justify-center w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] self-center">
                {sightsData?.map((sight) => <SightCard key={sight.id} {...sight} />)}
            </div>
        </section>
    );
};

export default SightsList;
