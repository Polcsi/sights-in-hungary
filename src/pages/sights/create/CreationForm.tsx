import { Form, Formik, FormikHelpers } from "formik";
import BasicInputField from "../../../components/BasicInputField";
import Button from "../../../components/Button";
import InputFileUpload from "../../../components/InputFileUpload";
import * as Yup from "yup";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { getDatabase, ref as databaseRef, set } from "firebase/database";
import app from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../features/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import MapCreation from "./MapCreation";

export interface ISightCreation {
    name: string;
    location: string;
    description: string;
    coverImg: File[];
    tags?: string[];
    latitude?: number;
    longitude?: number;
}

const CreationForm = () => {
    const storage = getStorage(app);
    const db = getDatabase(app);
    const { currentUser } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (values: ISightCreation, helpers: FormikHelpers<ISightCreation>) => {
        const { setSubmitting, resetForm } = helpers;

        try {
            console.table(values);
            // ? Upload image to storage
            const imageId = uuidv4();

            const imageRef = storageRef(
                storage,
                `sights/${imageId}/${values.name.toLocaleLowerCase().trim().replace(/\s/g, "-")}-image`
            );

            await uploadBytes(imageRef, values.coverImg[0], {
                customMetadata: {
                    location: values.location,
                    name: values.name,
                },
            });

            const imgUrl = await getDownloadURL(imageRef);
            console.log(imgUrl);
            // ? Set new sight to database
            const sightId = uuidv4();
            const sightRef = databaseRef(db, `sights/${sightId}`);
            const currentDate = new Date().toISOString();

            await set(sightRef, {
                name: values.name,
                location: values.location,
                description: values.description,
                photoUrl: imgUrl,
                photoId: imageId,
                userId: currentUser?.uid,
                createdAt: currentDate,
                updatedAt: currentDate,
                coordinates: {
                    lat: values.latitude,
                    lng: values.longitude,
                },
            });

            resetForm();
            toast.success("Látványosság sikeresen hozzáadva!");
            navigate("/sights#list");
        } catch (error) {
            console.error(error);
            toast.error("Hiba történt a látványosság hozzáadása során");
        } finally {
            setSubmitting(false);
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
                latitude: undefined,
                longitude: undefined,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
                name: Yup.string().required("A látványoság neve kötelező!"),
                location: Yup.string().required("A település neve kötelező!"),
                description: Yup.string().required("A leírás kötelező!"),
                coverImg: Yup.array()
                    .required("Borítókép feltöltése kötelező!")
                    .min(1, "Borítókép feltöltése kötelező!"),
                latitude: Yup.number().required("A látványosság helyének kiválasztása kötelező!"),
                longitude: Yup.number().required("A látványosság helyének kiválasztása kötelező!"),
            })}
        >
            {({ isSubmitting, isValid }) => {
                return (
                    <Form className="bg-[rgba(255,255,255,0.6)] rounded-lg ring-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-[6.4px] border-[2px] border-[rgba(0,0,0,0.1)] p-7 flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <h1 className="font-semibold text-3xl">Látványoság hozzáadása</h1>
                            <hr className="border-gray-primary" />
                        </div>
                        <div className="flex flex-col gap-3">
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
                            <div className="self-start flex flex-col gap-1">
                                <h1 className="text-2xl text-gray-primary font-medium text-left">Borítókép</h1>
                                <InputFileUpload
                                    name="coverImg"
                                    label="Kép feltöltése"
                                    required
                                    title="Borítókép feltöltése"
                                />
                            </div>
                            <MapCreation latName="latitude" lngName="longitude" />
                            <div className="flex flex-col gap-4 mt-1">
                                <hr className="border-gray-light" />
                                {/* // ? Submit button */}
                                <Button
                                    isProcessing={isSubmitting}
                                    disabled={!isValid}
                                    type="submit"
                                    className={`bg-green-primary text-white rounded-lg self-end ${isSubmitting ? "py-0" : "py-3"} px-5`}
                                >
                                    Hozzáadás
                                </Button>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default CreationForm;
