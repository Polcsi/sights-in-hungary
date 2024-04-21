import React from "react";
import Transition from "../../components/layout/Transition";
import { useAuthContext } from "../../features/auth/AuthContext";
import wave from "./wave.svg";
import google from "../../assets/icons/google.svg";
import PasswordForm from "./PasswordForm";
import BasicInformationForm from "./BasicInformationForm";
import ProfileImage from "./ProfileImage";
import DeleteUserSection from "./DeleteUserSection";

const Me = () => {
    const { currentUser, isGoogle } = useAuthContext();

    return (
        <main className="w-screen flex justify-center flex-col relative">
            <div className="PageContent self-center w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] pt-[95px] flex flex-col gap-5">
                <section className="flex justify-center">
                    <header className="flex flex-col justify-center gap-3">
                        <ProfileImage />
                        <div className="flex flex-col gap-1">
                            <h1 className="text-center text-[50px] font-bold">{currentUser?.displayName}</h1>
                            <div className="flex flex-col gap-3">
                                <p className="text-center text-[20px] font-medium text-gray-500">
                                    {currentUser?.email}
                                </p>
                                {isGoogle ? (
                                    <React.Fragment>
                                        <hr />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-center text-[18px] font-medium text-gray-500">
                                                Bejelentkezve, mint
                                            </p>
                                            <a className="self-center" href="https://google.com" target="_blank">
                                                <img className="size-6" src={google} alt="google" />
                                            </a>
                                        </div>
                                    </React.Fragment>
                                ) : null}
                            </div>
                        </div>
                    </header>
                </section>
                {!isGoogle ? (
                    <div className="flex flex-wrap self-center gap-5 justify-center">
                        <section
                            className="flex justify-center relative px-5 py-3"
                            style={{
                                width: "calc(calc(var(--page-content-max-width) / 2) - 10px)",
                            }}
                        >
                            <div className="absolute top-0 left-0 w-full h-full -z-[1] bg-[rgba(255,255,255,0.8)] rounded-lg ring-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-[6.4px] border-[2px] border-[rgba(0,0,0,0.1)]" />
                            <div className="self-start w-full flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-2xl text-gray-primary font-medium text-left">
                                        Adatok módosítása
                                    </h1>
                                    <hr className="border-gray-light" />
                                </div>
                                <BasicInformationForm />
                            </div>
                        </section>
                        <section
                            className="flex justify-center relative px-5 py-3"
                            style={{
                                width: "calc(calc(var(--page-content-max-width) / 2) - 10px)",
                            }}
                        >
                            <div className="absolute top-0 left-0 w-full h-full -z-[1] bg-[rgba(255,255,255,0.8)] rounded-lg ring-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-[6.4px] border-[2px] border-[rgba(0,0,0,0.1)]" />
                            <div className="self-start w-full flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-2xl text-gray-primary font-medium text-left">
                                        Jelszó módosítása
                                    </h1>
                                    <hr className="border-gray-light" />
                                </div>
                                <PasswordForm />
                            </div>
                        </section>
                    </div>
                ) : null}
                <DeleteUserSection />
            </div>
            <img className="absolute top-[25vh] left-0 -z-[2]" src={wave} alt="wave" />
        </main>
    );
};

export default Transition(Me);
