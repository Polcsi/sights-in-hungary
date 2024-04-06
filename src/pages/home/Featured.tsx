import React from "react";
import waves from "./images/wave.svg";
import Slider from "../../components/slider/Slider";

const Featured = () => {
    return (
        <React.Fragment>
            <section className="flex gap-14 flex-col justify-start items-center bg-light-blue pt-16 w-screen pb-3">
                <h1 className="text-center text-white text-[50px] font-bold">Kiemelt látnivalók</h1>
                <Slider
                    steps={[
                        {
                            id: 1,
                            title: "Parlament",
                            location: "Budapest",
                            description:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin neque augue, ullamcorper in justo eget, maximus sagittis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing",
                            author: "John Doe",
                            image: "https://st.depositphotos.com/1927453/1866/i/450/depositphotos_18666065-stock-photo-budapest-hungarian-parliament.jpg",
                        },
                        {
                            id: 2,
                            title: "Lánchíd",
                            location: "Budapest",
                            description:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin neque augue, ullamcorper in justo eget, maximus sagittis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing",
                            image: "https://csodalatosmagyarorszag.hu/wp-content/uploads/2020/03/budapest-lanchid-szechenyi-duna-diszkivilagitas-budaivar-csodalatosmagyarorszag.jpg",
                            author: "Jane Doe",
                        },
                        {
                            id: 3,
                            title: "Hősök tere",
                            location: "Budapest",
                            description:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin neque augue, ullamcorper in justo eget, maximus sagittis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing",
                            image: "https://www.mysteryhotelbudapest.com/wp-content/uploads/2018/10/Hosok-tere-Mystery-Hotel-Budapest.jpg",
                            author: "John Doe",
                        },
                    ]}
                />
            </section>
            <img className="relative" src={waves} alt="horizontal-wave" />
        </React.Fragment>
    );
};

export default Featured;
