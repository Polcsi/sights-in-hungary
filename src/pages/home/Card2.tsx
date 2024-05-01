import Button from "../../components/Button";
import MapDemo from "../../components/map/MapDemo";

const Card2 = () => {
    return (
        <section className="flex w-screen justify-center relative">
            <div className="absolute bg-gray-primary h-[100%] w-[calc((100vw-1300px)/2)] right-0" />
            <div className="w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] flex">
                <div className="relative flex justify-center items-center  w-1/3">
                    <div className="absolute w-[calc(100%+calc((100vw-1300px)/2))] h-full -left-[calc((100vw-1300px)/2)]">
                        <MapDemo />
                    </div>
                </div>
                <div className="bg-gray-primary text-white pr-10 py-10 flex flex-col gap-5 w-2/3">
                    <h1 className="font-bold text-[50px] text-right">Térkép megjelenítő</h1>
                    <hr className="border-[1.5px] w-[250px] self-end" />
                    <p className="leading-[50px] text-xl text-right">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin neque augue, ullamcorper in justo
                        eget, maximus sagittis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing
                    </p>
                    <Button className="w-[200px] self-end">Mutasd</Button>
                </div>
            </div>
        </section>
    );
};

export default Card2;
