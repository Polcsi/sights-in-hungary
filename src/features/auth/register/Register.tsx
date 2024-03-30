import Button from "../../../components/Button";
import VerticalWaves from "../../../components/layout/waves/vertical/VerticalWaves";
import RegisterForm from "./RegisterForm";

const Register = () => {
    return (
        <VerticalWaves
            content1={<RegisterForm />}
            content2={
                <div className="text-white w-full flex gap-1 flex-col justify-center items-center">
                    <h1 className="text-[56px] 2xl:text-[64px] font-bold text-center">Már regisztráltál?</h1>
                    <p className="text-[20px] lg:text-[24px] w-[500px] text-center">
                        Jelentkezz be és fedezd fel Magyarország látnivalóit!
                    </p>
                    <Button
                        linkProps={{
                            href: "/login",
                            className: "mt-5 px-10",
                        }}
                    >
                        Bejelentkezés
                    </Button>
                </div>
            }
        />
    );
};

export default Register;
