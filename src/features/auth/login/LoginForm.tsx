import { Form, Formik, type FormikHelpers } from "formik";
import Button from "../../../components/Button";
import BasicInputField from "../../../components/BasicInputField";
import * as Yup from "yup";
import LoginFormHeader from "./LoginFormHeader";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import app from "../../../firebase";
import { toast } from "react-toastify";

interface ILogin {
    email: string;
    password: string;
}

const LoginForm = () => {
    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleLogin = (values: ILogin, helpers: FormikHelpers<ILogin>) => {
        const { setFieldError, setSubmitting } = helpers;
        const { email, password } = values;

        setPersistence(auth, browserSessionPersistence)
            .then(async () => {
                return signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        // Signed in
                        setSubmitting(false);
                        toast.success("Sikeres bejelentkezés");
                        navigate("/dashboard");
                    })
                    .catch((error) => {
                        setSubmitting(false);
                        const errorCode = error.code;
                        const errorMessage = error.message;

                        switch (errorCode) {
                            case "auth/user-not-found":
                                setFieldError("email", "Nem található felhasználó ezzel az email címmel");
                                break;
                            case "auth/invalid-credential":
                                setFieldError("email", "Hibás email cím vagy jelszó");
                                setFieldError("password", "Hibás email cím vagy jelszó");
                                break;
                            case "auth/wrong-password":
                                setFieldError("password", "Hibás jelszó");
                                break;
                            default:
                                setFieldError("email", "Hiba történt a bejelentkezés során");
                                setFieldError("password", "Hiba történt a bejelentkezés során");
                                break;
                        }

                        console.error(errorCode, errorMessage);
                    });
            })
            .catch((error) => {
                toast.error("Hiba történt a bejelentkezés során");
                console.error(error.code, error.message);
            });
    };

    return (
        <section className="flex flex-col gap-4">
            <LoginFormHeader />
            <Formik<ILogin>
                initialValues={{ email: "", password: "" }}
                onSubmit={handleLogin}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email("Nem megfelelő email formátum").required("Kötelező mező"),
                    password: Yup.string()
                        .min(6, "A jelszónak legalább 6 karakternek kell lennie")
                        .required("Kötelező mező"),
                })}
            >
                {({ isSubmitting }) => {
                    return (
                        <Form className="mx-auto">
                            <div className="grid gap-4">
                                <BasicInputField
                                    name="email"
                                    placeholder="Email"
                                    required
                                    title="Email"
                                    disabled={isSubmitting}
                                />
                                <BasicInputField
                                    name="password"
                                    placeholder="Jelszó"
                                    type="password"
                                    required
                                    title="Jelszó"
                                    disabled={isSubmitting}
                                />
                                <Button
                                    isProcessing={isSubmitting}
                                    className="bg-light-blue text-white font-medium"
                                    type="submit"
                                >
                                    Bejelentkezés
                                </Button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </section>
    );
};

export default LoginForm;
