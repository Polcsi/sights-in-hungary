import Transition from "../../components/layout/Transition";
import { useAuthContext } from "../../features/auth/AuthContext";
import wave from "./wave.svg";
import google from "../../assets/icons/google.svg";

const Me = () => {
    const { currentUser } = useAuthContext();
    console.log(currentUser);
    const isGoogle: boolean = currentUser?.providerData[0]?.providerId === "google.com";

    if (isGoogle) {
        return (
            <main className="w-screen flex justify-center flex-col relative">
                <div className="PageContent self-center w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] pt-[95px]">
                    <section className="flex justify-center">
                        <header className="flex flex-col justify-center gap-3">
                            <div className="size-36 rounded-full bg-gray-light flex justify-center items-center self-center">
                                <img
                                    className="rounded-full size-32"
                                    src={currentUser?.photoURL ?? ""}
                                    alt="profile-img"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="text-center text-[50px] font-bold">{currentUser?.displayName}</h1>
                                <div className="flex flex-col gap-3">
                                    <p className="text-center text-[20px] font-medium text-gray-500">
                                        {currentUser?.email}
                                    </p>
                                    <hr />
                                    <div className="flex flex-col gap-2">
                                        <p className="text-center text-[18px] font-medium text-gray-500">
                                            Bejelentkezve, mint
                                        </p>
                                        <a className="self-center" href="https://google.com" target="_blank">
                                            <img className="size-6" src={google} alt="google" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </section>
                </div>
                <img className="absolute top-[25vh] left-0 -z-[1]" src={wave} alt="wave" />
            </main>
        );
    } else {
        return (
            <main className="w-screen flex justify-center flex-col relative">
                <div className="PageContent self-center w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] pt-[95px]"></div>
            </main>
        );
    }
};

export default Transition(Me);
