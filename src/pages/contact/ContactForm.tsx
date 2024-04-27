import { Form, Formik, type FormikHelpers } from "formik";
import BasicInputField from "../../components/BasicInputField";
import Button from "../../components/Button";
import * as Yup from "yup";
import { getDatabase, ref, set } from "firebase/database";
import { toast } from "react-toastify";
import app from "../../firebase";
import { v4 as uuidv4 } from "uuid";

// Icons
import { IoMdPerson, IoIosMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";

interface IConctactForm {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    message: string;
}

const ContactForm = () => {
    const handleSubmit = async (values: IConctactForm, helpers: FormikHelpers<IConctactForm>) => {
        try {
            const db = getDatabase(app);

            await set(ref(db, `messages/${uuidv4()}`), {
                ...values,
                createdAt: new Date().toISOString(),
            });

            helpers.resetForm();

            toast.success("Az üzenetet sikeresen elküldtük!");
        } catch (error) {
            console.error(error);
            toast.error("Hiba történt az üzenet elküldése közben!");
        } finally {
            helpers.setSubmitting(false);
        }
    };

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
                message: Yup.string()
                    .min(100, "Az üzenetnek legalább 100 karakter hosszúnak kell lennie")
                    .required("Az üzenet megadása kötelező"),
            })}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="grid gap-2 bg-white px-5 py-7 shadow-md w-[450px] rounded-xl">
                    <BasicInputField
                        required
                        title="Keresztnév"
                        name="firstName"
                        placeholder="Keresztnév"
                        icon={<IoMdPerson className="text-input-text text-xl" />}
                        disabled={isSubmitting}
                    />
                    <BasicInputField
                        required
                        title="Vezetéknév"
                        name="lastName"
                        placeholder="Vezetéknév"
                        icon={<IoMdPerson className="text-input-text text-xl" />}
                        disabled={isSubmitting}
                    />
                    <BasicInputField
                        required
                        title="Telefonszám"
                        name="phoneNumber"
                        placeholder="Telefonszám"
                        icon={<FaPhone className="text-input-text text-xl" />}
                        disabled={isSubmitting}
                    />
                    <BasicInputField
                        required
                        title="Email"
                        name="email"
                        placeholder="Email"
                        icon={<IoIosMail className="text-input-text text-xl" />}
                        disabled={isSubmitting}
                    />
                    <BasicInputField
                        name="message"
                        placeholder="Üzenet"
                        as="textarea"
                        rows={6}
                        disabled={isSubmitting}
                    />
                    <Button isProcessing={isSubmitting} type="submit" className="bg-light-blue text-white">
                        Üzenet küldése
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default ContactForm;
