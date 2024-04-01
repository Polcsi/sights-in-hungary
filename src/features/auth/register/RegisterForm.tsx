import { Formik, Form } from "formik";
import BasicInputField from "../../../components/BasicInputField";
import Button from "../../../components/Button";
import RegisterFormHeader from "./RegisterFormHeader";
import * as Yup from "yup";

const RegisterForm = () => {
    return (
        <section className="flex flex-col gap-7">
            <RegisterFormHeader />
            <Formik
                initialValues={{ firstName: "", lastName: "", email: "", password: "", passwordConfirm: "" }}
                onSubmit={() => {}}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().required("Kötelező mező"),
                    lastName: Yup.string().required("Kötelező mező"),
                    email: Yup.string().email("Nem megfelelő email formátum").required("Kötelező mező"),
                    password: Yup.string()
                        .min(6, "A jelszónak legalább 6 karakternek kell lennie")
                        .required("Kötelező mező"),
                    passwordConfirm: Yup.string().oneOf([Yup.ref("password")], "A jelszavaknak egyezniük kell"),
                })}
            >
                <Form className="mx-auto">
                    <div className="grid gap-4">
                        <BasicInputField required title="Keresztné" name="firstName" placeholder="Keresztnév" />
                        <BasicInputField required title="Vezetéknév" name="lastName" placeholder="Vezetéknév" />
                        <BasicInputField required title="Email" name="email" placeholder="Email" />
                        <BasicInputField required title="Jelszó" name="password" placeholder="Jelszó" type="password" />
                        <BasicInputField
                            required
                            title="Jelszó megerősítése"
                            name="passwordConfirm"
                            placeholder="Jelszó megerősítése"
                            type="password"
                        />
                        <Button className="bg-light-blue text-white font-medium" type="submit">
                            Regisztráció
                        </Button>
                    </div>
                </Form>
            </Formik>
        </section>
    );
};

export default RegisterForm;
