import VerticalWaves from "../../components/layout/waves/vertical/VerticalWaves";
import Button from "../../components/Button";
import error from "./4044.png";

const NotFound = () => {
    return (
        <VerticalWaves
            content1={
                <>
                    <img src={error} alt="404" className="hidden lg:block" />
                </>
            }
            content2={
                <div className="text-white w-full flex gap-1 flex-col justify-center items-center">
                    <h1 className="text-[56px] 2xl:text-[64px] font-bold text-center">Oldal nem található</h1>
                    <p className="text-[20px] lg:text-[24px] w-[500px] text-center">
                        Az oldal amit kereseel nem létezik vagy valamilyen más hiba történt.
                    </p>
                    <Button
                        linkProps={{
                            href: "/",
                            className: "mt-5",
                        }}
                    >
                        Vissza a főoldalra
                    </Button>
                </div>
            }
        />
    );
};

export default NotFound;
