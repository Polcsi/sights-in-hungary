import { getDatabase, ref, set } from "firebase/database";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useAuthContext } from "../../features/auth/AuthContext";
import app from "../../firebase";
import { type IRating } from "../../pages/sights/SightCard";
import BasicInputField from "../BasicInputField";
import Button from "../Button";
import CustomRating from "../CustomRating";

interface IRatingFormProps {
    id: string | undefined;
}

type IRatingFormValues = Pick<IRating, "comment" | "rating">;

const RatingForm = ({ id }: IRatingFormProps) => {
    const { currentUser } = useAuthContext();
    const db = getDatabase(app);
    const handleSubmit = async (values: IRatingFormValues, helpers: FormikHelpers<IRatingFormValues>) => {
        const { setSubmitting, resetForm } = helpers;
        const ratingId = uuidv4();
        const ratingRef = ref(db, `sights/${id}/ratings/${ratingId}`);

        try {
            if (!currentUser) {
                throw new Error("NoAuthUserError");
            }
            console.table(values);
            console.log({
                ...values,
                userId: currentUser?.uid,
                createdAt: new Date().toISOString(),
            });
            await set(ratingRef, {
                ...values,
                userId: currentUser?.uid,
                createdAt: new Date().toISOString(),
            });

            resetForm();
            toast.success("Értékelés elküldve!");
        } catch (error) {
            console.error(error);
            if ((error as Error).message === "NoAuthUserError") {
                toast.error("Jelenkezz be az értékelés elküldéséhez!");
            } else {
                toast.error("Hiba történt az értékelés elküldése közben!");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik<IRatingFormValues>
            initialValues={{
                comment: "",
                rating: 0,
            }}
            validationSchema={Yup.object({}).shape({
                comment: Yup.string()
                    .required("Az értékelés mező kitöltése kötelező!")
                    .min(10, "Minimum 10 karaktert kell tartalmaznia!"),
            })}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue, values }) => {
                return (
                    <Form>
                        <BasicInputField
                            name="comment"
                            placeholder="Értékelés"
                            as="textarea"
                            rows={5}
                            required
                            title="Értékelés helye"
                        />
                        <CustomRating
                            value={values.rating}
                            onChange={(_e, newValue) => {
                                setFieldValue("rating", newValue);
                            }}
                        />
                        <Button
                            isProcessing={isSubmitting}
                            type="submit"
                            className={`bg-light-blue text-white rounded-lg w-full ${isSubmitting ? "py-0" : "py-2"}`}
                        >
                            Küldés
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default RatingForm;
