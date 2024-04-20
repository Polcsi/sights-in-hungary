import { Formik, Form, FormikHelpers } from "formik";
import BasicInputField from "../../components/BasicInputField";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { AuthCredential, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useAuthContext } from "../../features/auth/AuthContext";
import * as Yup from "yup";
import { FirebaseError } from "firebase/app";

interface IPassword {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}

const PasswordForm = () => {
    const { currentUser } = useAuthContext();
    const handlePasswordChange = async (values: IPassword, helpers: FormikHelpers<IPassword>) => {
        const { setSubmitting, resetForm, setFieldError } = helpers;

        try {
            if (currentUser) {
                const credential: AuthCredential = EmailAuthProvider.credential(
                    currentUser.email ?? "",
                    values.oldPassword
                );

                await reauthenticateWithCredential(currentUser, credential);
                await updatePassword(currentUser, values.newPassword);

                resetForm();
                toast.success("Sikeres jelszó módosítás");
            }
        } catch (error) {
            switch ((error as FirebaseError)?.code) {
                case "auth/invalid-credential":
                    setFieldError("oldPassword", "Hibás jelszó");
                    break;
                default:
                    setFieldError("oldPassword", "Hiba történt a jelszó módosítása során");
                    setFieldError("newPassword", "Hiba történt a jelszó módosítása során");
                    setFieldError("newPasswordConfirm", "Hiba történt a jelszó módosítása során");
                    toast.error("Hiba történt a jelszó módosítása során");
            }

            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik<IPassword>
            validateOnMount
            initialValues={{
                oldPassword: "",
                newPassword: "",
                newPasswordConfirm: "",
            }}
            onSubmit={handlePasswordChange}
            validationSchema={Yup.object().shape({
                oldPassword: Yup.string().required("Kötelező mező"),
                newPassword: Yup.string().required("Kötelező mező"),
                newPasswordConfirm: Yup.string()
                    .oneOf([Yup.ref("newPassword")], "A jelszavak nem egyeznek")
                    .required("Kötelező mező"),
            })}
        >
            {({ isSubmitting, isValid }) => (
                <Form className="flex flex-col gap-3">
                    <BasicInputField
                        type="password"
                        name="oldPassword"
                        placeholder="Régi Jelszó"
                        title="Régi Jelszó"
                        required
                        disabled={isSubmitting}
                    />
                    <BasicInputField
                        type="password"
                        name="newPassword"
                        placeholder="Új Jelszó"
                        title="Új Jelszó"
                        required
                        disabled={isSubmitting}
                    />
                    <BasicInputField
                        type="password"
                        name="newPasswordConfirm"
                        placeholder="Új Jelszó megerősítése"
                        title="Jelszó megerősítése"
                        required
                        disabled={isSubmitting}
                    />
                    <Button
                        type="submit"
                        className="bg-green-primary text-white font-medium px-10 py-0 h-[48px] w-[200px]"
                        disabled={!isValid}
                        isProcessing={isSubmitting}
                    >
                        Módosítás
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default PasswordForm;
