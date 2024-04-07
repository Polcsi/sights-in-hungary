import { Formik, Form, type FormikHelpers } from "formik";
import BasicInputField from "../../../components/BasicInputField";
import Button from "../../../components/Button";
import RegisterFormHeader from "./RegisterFormHeader";
import * as Yup from "yup";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IRegister {
    email: string;
    password: string;
    passwordConfirm: string;
}

const RegisterForm = () => {
    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleRegister = (values: IRegister, helpers: FormikHelpers<IRegister>) => {
        const { setFieldError, setSubmitting } = helpers;

        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((_userCredential) => {
                // Signed up
                setSubmitting(false);
                toast.success("Sikeres regisztráció");
                navigate("/login");
            })
            .catch((error) => {
                setSubmitting(false);
                const errorCode = error.code;
                const errorMessage = error.message;

                switch (errorCode) {
                    case "auth/email-already-in-use":
                        setFieldError("email", "Ez az email cím már használatban van");
                        break;
                    default:
                        setFieldError("email", "Hiba történt a regisztráció során");
                        setFieldError("password", "Hiba történt a regisztráció során");
                        setFieldError("passwordConfirm", "Hiba történt a regisztráció során");
                        break;
                }

                console.error(errorCode, errorMessage);
            });
    };

    return (
        <section className="flex flex-col gap-7">
            <RegisterFormHeader />
            <Formik<IRegister>
                initialValues={{ email: "", password: "", passwordConfirm: "" }}
                onSubmit={handleRegister}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email("Nem megfelelő email formátum").required("Kötelező mező"),
                    password: Yup.string()
                        .min(6, "A jelszónak legalább 6 karakternek kell lennie")
                        .required("Kötelező mező"),
                    passwordConfirm: Yup.string().oneOf([Yup.ref("password")], "A jelszavaknak egyezniük kell"),
                })}
            >
                {({ isSubmitting }) => {
                    return (
                        <Form className="mx-auto">
                            <div className="grid gap-4">
                                <BasicInputField
                                    required
                                    title="Email"
                                    name="email"
                                    placeholder="Email"
                                    disabled={isSubmitting}
                                />
                                <BasicInputField
                                    required
                                    title="Jelszó"
                                    name="password"
                                    placeholder="Jelszó"
                                    type="password"
                                    disabled={isSubmitting}
                                />
                                <BasicInputField
                                    required
                                    title="Jelszó megerősítése"
                                    name="passwordConfirm"
                                    placeholder="Jelszó megerősítése"
                                    type="password"
                                    disabled={isSubmitting}
                                />
                                <Button
                                    isProcessing={isSubmitting}
                                    className="bg-light-blue text-white font-medium"
                                    type="submit"
                                >
                                    Regisztráció
                                </Button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </section>
    );
};

export default RegisterForm;
