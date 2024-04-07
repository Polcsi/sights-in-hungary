import Transition from "../../components/layout/Transition";
import { useAuthContext } from "../../features/auth/AuthContext";
import wave from "./wave.svg";

const Me = () => {
    const { currentUser } = useAuthContext();
    console.log(currentUser);
    const isGoogle: boolean = currentUser?.providerData[0]?.providerId === "google.com";

    return (
        <main className="w-screen">
            <h1>{currentUser?.displayName}</h1>
            <div className="size-36 rounded-full bg-gray-light flex justify-center items-center">
                <img className="rounded-full size-32" src={currentUser?.photoURL ?? ""} alt="profile-img" />
            </div>
            <img src={wave} alt="wave" />
            <svg
                width="100%"
                height="100%"
                id="svg"
                viewBox="0 0 1440 690"
                xmlns="http://www.w3.org/2000/svg"
                className="transition duration-300 ease-in-out delay-150"
            >
                <path
                    d="M 0,700 L 0,0 C 162,118.53333333333333 324,237.06666666666666 468,314 C 612,390.93333333333334 738,426.2666666666667 897,367 C 1056,307.7333333333333 1248,153.86666666666665 1440,0 L 1440,700 L 0,700 Z"
                    stroke="none"
                    stroke-width="0"
                    fill="#a9bcd0"
                    fill-opacity="1"
                    className="transition-all duration-300 ease-in-out delay-150 path-0"
                ></path>
            </svg>
        </main>
    );
};

export default Transition(Me);
