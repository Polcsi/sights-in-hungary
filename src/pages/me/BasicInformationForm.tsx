import { updateProfile } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import BasicInputField from "../../components/BasicInputField";
import Button from "../../components/Button";
import { useAuthContext } from "../../features/auth/AuthContext";
import app from "../../firebase";

interface IBasicInformation {
    firstName: string;
    lastName: string;
}

// TODO: After first name and last name are updated, the name should be updated on the UI as well
const BasicInformationForm = () => {
    const { currentUser, setIsAuthUpdated } = useAuthContext();
    const db = getDatabase(app);
    const userRef = ref(db, `users/${currentUser?.uid}`);
    const names: string[] = currentUser?.displayName?.split(" ") ?? [];
    const lastName: string = names.at(-1) ?? "";
    const firstName: string = names.slice(0, -1).join(" ");

    const handleBasicInformation = async (
        values: IBasicInformation,
        formikHelpers: FormikHelpers<IBasicInformation>
    ) => {
        const { setSubmitting } = formikHelpers;

        try {
            console.table(values);
            if (currentUser) {
                await updateProfile(currentUser, {
                    displayName: `${values.firstName} ${values.lastName}`,
                });

                await update(userRef, {
                    name: `${values.firstName} ${values.lastName}`,
                });

                await currentUser.reload();

                setIsAuthUpdated((prev) => !prev);

                toast.success("Sikeres módosítás");
            }
        } catch (error) {
            console.error(error);
            toast.error("Hiba történt a mentés során");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik<IBasicInformation>
            enableReinitialize
            validateOnMount
            initialValues={{
                firstName: firstName,
                lastName: lastName,
            }}
            validationSchema={Yup.object().shape({
                firstName: Yup.string().required("Keresztnév megadása kötelező"),
                lastName: Yup.string().required("Vezetéknév megadása kötelező"),
            })}
            onSubmit={handleBasicInformation}
        >
            {({ isSubmitting, isValid }) => (
                <Form className="flex flex-col gap-3">
                    <BasicInputField
                        name="firstName"
                        placeholder="Keresztnév"
                        title="Keresztnév"
                        required
                        disabled={isSubmitting}
                    />
                    <BasicInputField
                        name="lastName"
                        placeholder="Vezetéknév"
                        title="Vezetéknév"
                        required
                        disabled={isSubmitting}
                    />
                    <Button
                        type="submit"
                        className="bg-green-primary text-white font-medium px-10 py-0 h-[48px] w-[200px]"
                        isProcessing={isSubmitting}
                        disabled={!isValid}
                    >
                        Módosítás
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default BasicInformationForm;
