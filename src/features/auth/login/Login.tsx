import VerticalWaves from "../../../components/layout/waves/vertical/VerticalWaves";
import Button from "../../../components/Button";
import LoginForm from "./LoginForm";
import Transition from "../../../components/layout/Transition";

const Login = () => {
    return (
        <VerticalWaves
            content1={<LoginForm />}
            content2={
                <div className="text-white w-full flex gap-1 flex-col justify-center items-center">
                    <h1 className="text-[56px] 2xl:text-[64px] font-bold text-center">Új vagy itt?</h1>
                    <p className="text-[20px] lg:text-[24px] w-[500px] text-center">
                        Regisztrálj és fedezd fel Magyarország látnivalóit!
                    </p>
                    <Button
                        linkProps={{
                            href: "/register",
                            className: "mt-5 px-10",
                        }}
                    >
                        Regisztálok
                    </Button>
                </div>
            }
        />
    );
};

export default Transition(Login);
