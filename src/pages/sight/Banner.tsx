import { ISight } from "../sights/SightCard";

interface IBannerProps extends Pick<ISight, "name" | "location" | "photoUrl"> {}

const Banner = ({ name, location, photoUrl }: IBannerProps) => {
    return (
        <header>
            <div className="w-screen h-screen relative">
                <div
                    style={{
                        background: "rgba(0, 1, 1, 0.40)",
                    }}
                    className="Overlay absolute top-0 left-0 w-full h-full"
                />

                <img className="w-full h-full object-cover" src={photoUrl} alt={`${name}-image`} />

                <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] text-white flex flex-col gap-1 justify-center">
                    <h1 className="text-[100px] font-extrabold text-center">{name}</h1>
                    <div className="w-1/3 h-[7px] bg-white self-center" />
                    <h2 className="text-center font-extrabold text-4xl mt-5">{location}</h2>
                </div>
            </div>
        </header>
    );
};

export default Banner;
