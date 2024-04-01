import horizontal from "./horizontal.svg";

const HorizontalWaves = () => {
    return (
        <div className="absolute left-0 top-0 flex -z-[1] flex-col">
            <div className="bg-light-blue w-screen h-[180px]" />
            <img className="w-screen" src={horizontal} alt="wave" />
        </div>
    );
};

export default HorizontalWaves;
