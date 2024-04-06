import Button from "../../components/Button";
import marker from "./images/marker.png";

const Card1 = () => {
    return (
        <section className="flex w-screen justify-center relative">
            <div className="absolute bg-light-blue h-[100%] w-[calc((100vw-1300px)/2)] left-0" />
            <div className="w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] flex">
                <div className="bg-light-blue text-white pl-10 py-10 flex flex-col gap-5 w-3/3">
                    <h1 className="font-bold text-[50px]">Tekintse meg Magyarország látványoságait</h1>
                    <hr className="border-[1.5px] w-[250px]" />
                    <p className="leading-[50px] text-xl">
                        Megtekintheti legnépszerűbb helyeket, ahová érdemes el látogatni. Használhatja a dinamikus
                        megjelinitőnket vagy egy egyszerű listán keresztül is tájékozodhat
                    </p>
                    <Button
                        linkProps={{
                            href: "/sights",
                            className: "w-[200px] text-center",
                        }}
                    >
                        Mutasd
                    </Button>
                </div>
                <div className="w-2/3 flex flex-col justify-center">
                    <img src={marker} className="w-[100%]" alt="marker" />
                </div>
            </div>
        </section>
    );
};

export default Card1;
