import { Form, Formik, FormikHelpers } from "formik";
import BasicInputField from "../../../components/BasicInputField";
import Button from "../../../components/Button";
import InputFileUpload from "../../../components/InputFileUpload";
import * as Yup from "yup";

interface ISightCreation {
    name: string;
    location: string;
    description: string;
    coverImg: File[];
    tags?: string[];
}

const CreationForm = () => {
    const handleSubmit = (values: ISightCreation, helpers: FormikHelpers<ISightCreation>) => {
        const { setSubmitting } = helpers;

        try {
            console.table(values);
            // ? Send the data to the server
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);
        }
    };

    return (
        <Formik<ISightCreation>
            validateOnMount
            initialValues={{
                name: "",
                location: "",
                description: "",
                coverImg: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
                name: Yup.string().required("A látványoság neve kötelező!"),
                location: Yup.string().required("A település neve kötelező!"),
                description: Yup.string().required("A leírás kötelező!"),
                coverImg: Yup.array().required("A borítókép kötelező!").min(1, "A borítókép kötelező!"),
            })}
        >
            {({ isSubmitting, isValid }) => {
                return (
                    <Form className="bg-[rgba(255,255,255,0.6)] rounded-lg ring-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-[6.4px] border-[2px] border-[rgba(0,0,0,0.1)] p-7 flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <h1 className="font-semibold text-3xl">Látványoság hozzáadása</h1>
                            <hr className="border-gray-primary" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <BasicInputField
                                    name="name"
                                    label="Látványoság neve:"
                                    placeholder="Lánchíd"
                                    required
                                    title="Látványoság neve"
                                />
                                <BasicInputField
                                    name="location"
                                    label="Település neve:"
                                    placeholder="Budapest"
                                    required
                                    title="Település neve"
                                />
                            </div>
                            <BasicInputField
                                name="description"
                                label="Leírás:"
                                rows={10}
                                placeholder="A Lánchíd a Duna felett átívelő híd Budapesten."
                                as="textarea"
                                required
                                title="Leírás"
                            />
                            <div className="self-start">
                                <InputFileUpload name="coverImg" label="Upload Image" />
                            </div>

                            <hr className="border-gray-light" />
                            {/* // ? Submit button */}
                            <Button
                                isProcessing={isSubmitting}
                                disabled={!isValid}
                                type="submit"
                                className="bg-green-primary text-white py-2 rounded-lg self-end"
                            >
                                Hozzáadás
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default CreationForm;
