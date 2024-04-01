import { Form, Formik } from "formik";
import BasicInputField from "../../components/BasicInputField";
import Button from "../../components/Button";
import * as Yup from "yup";

// Icons
import { IoMdPerson, IoIosMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";

const ContactForm = () => {
    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                message: "",
            }}
            validationSchema={Yup.object().shape({
                firstName: Yup.string().required("Keresztnév megadása kötelező"),
                lastName: Yup.string().required("Vezetéknév megadása kötelező"),
                phoneNumber: Yup.string().required("Telefonszám megadása kötelező"),
                email: Yup.string().email("Helytelen email formátum").required("Email megadása kötelező"),
                message: Yup.string().min(100, "Az üzenetnek legalább 100 karakter hosszúnak kell lennie"),
            })}
            onSubmit={() => {}}
        >
            <Form className="grid gap-2 bg-white px-5 py-7 shadow-md w-[450px] rounded-xl">
                <BasicInputField
                    required
                    title="Keresztnév"
                    name="firstName"
                    placeholder="Keresztnév"
                    icon={<IoMdPerson className="text-input-text text-xl" />}
                />
                <BasicInputField
                    required
                    title="Vezetéknév"
                    name="lastName"
                    placeholder="Vezetéknév"
                    icon={<IoMdPerson className="text-input-text text-xl" />}
                />
                <BasicInputField
                    required
                    title="Telefonszám"
                    name="phoneNumber"
                    placeholder="Telefonszám"
                    icon={<FaPhone className="text-input-text text-xl" />}
                />
                <BasicInputField
                    required
                    title="Email"
                    name="email"
                    placeholder="Email"
                    icon={<IoIosMail className="text-input-text text-xl" />}
                />
                <BasicInputField name="message" placeholder="Üzenet" as="textarea" rows={6} />
                <Button type="submit" className="bg-light-blue text-white">
                    Üzenet küldése
                </Button>
            </Form>
        </Formik>
    );
};

export default ContactForm;
