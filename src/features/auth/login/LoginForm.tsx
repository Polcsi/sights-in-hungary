import { Form, Formik } from "formik";
import Button from "../../../components/Button";
import BasicInputField from "../../../components/BasicInputField";
import * as Yup from "yup";
import LoginFormHeader from "./LoginFormHeader";

const LoginForm = () => {
    return (
        <section className="flex flex-col gap-4">
            <LoginFormHeader />
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={() => {}}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email("Nem megfelelő email formátum").required("Kötelező mező"),
                    password: Yup.string()
                        .min(6, "A jelszónak legalább 6 karakternek kell lennie")
                        .required("Kötelező mező"),
                })}
            >
                <Form className="mx-auto">
                    <div className="grid gap-4">
                        <BasicInputField name="email" placeholder="Email" />
                        <BasicInputField name="password" placeholder="Jelszó" type="password" />
                        <Button className="bg-light-blue text-white font-medium" type="submit">
                            Bejelentkezés
                        </Button>
                    </div>
                </Form>
            </Formik>
        </section>
    );
};

export default LoginForm;
