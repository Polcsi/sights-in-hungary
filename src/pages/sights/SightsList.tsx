import Button from "../../components/Button";
import SightCard, { type ISight } from "./SightCard";

const data: ISight[] = [
    {
        id: 1,
        name: "Lánchíd",
        description:
            "A Széchenyi Lánchíd Budapest egyik jelképe, a Duna két partját köti össze. A híd 1849-ben készült el, és a magyar függetlenség 100. évfordulóján adták át az embereknek.",
        rating: 3.8,
        image: "https://szechenyinyomda.hu/wp-content/uploads/2021/05/vaszonkepem-lanchid.jpg",
        location: "Budapest",
        tags: ["híd", "látnivaló", "történelem"],
        likes: 1000,
    },
    {
        id: 2,
        name: "Parlament",
        location: "Budapest",
        description: "A magyar Országház, amely a Duna partján található, a magyar törvényhozás székhelye.",
        rating: 2.9,
        image: "https://kep.index.hu/1/0/4873/48732/487325/48732542_3715074_4f6f0a3fdb8896f32f40289251af2ee9_wm.jpg",
        tags: ["épület", "történelem", "látnivaló"],
        likes: 1000,
    },
    {
        id: 3,
        name: "Hősök tere",
        location: "Budapest",
        description: "A Hősök tere Budapest egyik legismertebb tere, amely a városközponttól keletre található.",
        rating: 4.7,
        image: "https://www.mysteryhotelbudapest.com/wp-content/uploads/2018/10/Hosok-tere-Mystery-Hotel-Budapest.jpg",
        tags: ["tér", "szobor", "történelem"],
        likes: 1000,
    },
    {
        id: 4,
        name: "Halászbástya",
        location: "Budapest",
        description: "A Halászbástya Budapest egyik legismertebb épülete, amely a Budai Várnegyedben található.",
        rating: 1.9,
        image: "https://turizmus.com/html/data/cikk/118/5824/cikk_1185824/Halaszbastya_123rf_monticello.jpg",
        tags: ["épület", "kilátó", "történelem"],
        likes: 40,
    },
    {
        id: 5,
        name: "Citadella",
        location: "Budapest",
        description: "A Citadella Budapest egyik legismertebb kilátója, amely a Gellért-hegyen található.",
        rating: 3.9,
        image: "https://budapest.kornyeke.hu/fotok/tartalom/10/9200-230314105704964813.jpg",
        tags: [""],
        likes: 1000,
    },
];

const SightsList = () => {
    return (
        <section className="flex flex-col gap-2">
            <div className="flex justify-between items-center py-3 border-b-2 border-b-gray-primary w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] self-center">
                <h1 className="text-3xl font-semibold">Látnivalók</h1>
                <div className="flex self-end gap-2">
                    <Button className="bg-light-blue text-white py-1 px-6">Legújabb</Button>
                    <Button className="bg-light-blue text-white py-1 px-6">Legnépszerűbb</Button>
                </div>
            </div>
            <div className="py-10 flex flex-wrap gap-10 justify-center w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] self-center">
                {data.map((sight) => (
                    <SightCard key={sight.id} {...sight} />
                ))}
            </div>
        </section>
    );
};

export default SightsList;
