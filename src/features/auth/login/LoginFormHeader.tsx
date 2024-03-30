import RoundButton from "./RoundButton";
import google from "../../../assets/icons/google.svg";
import facebook from "../../../assets/icons/facebook.svg";

const LoginFormHeader = () => {
    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-center font-bold text-[50px]">Jelentkez Be a Profilodba</h1>
            <div className="flex flex-col justify-center gap-2">
                <p className="text-input-text text-center">Bejelentkezés másképp</p>
                <div className="flex gap-4 justify-center">
                    <RoundButton>
                        <img className="size-7 select-none" src={google} alt="google" />
                    </RoundButton>
                    <RoundButton>
                        <img className="size-7" src={facebook} alt="facebook" />
                    </RoundButton>
                </div>
            </div>
            <div className="self-center mt-4 text-input-text flex items-center gap-3">
                <hr className="w-[200px]" />
                <span>or</span>
                <hr className="w-[200px]" />
            </div>
        </div>
    );
};

export default LoginFormHeader;
