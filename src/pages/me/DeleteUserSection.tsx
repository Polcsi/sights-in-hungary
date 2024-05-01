import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy";
import { FirebaseError } from "firebase/app";
import {
    AuthCredential,
    deleteUser,
    EmailAuthProvider,
    getAuth,
    GoogleAuthProvider,
    reauthenticateWithCredential,
    reauthenticateWithPopup,
    signInWithPopup,
} from "firebase/auth";
import { ref as databaseRef, getDatabase, remove } from "firebase/database";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { IoIosWarning } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import * as Yup from "yup";
import BasicInputField from "../../components/BasicInputField";
import Button2 from "../../components/Button";
import { useAuthContext } from "../../features/auth/AuthContext";
import app from "../../firebase";

interface IPassword {
    password: string;
}

const DeleteUserSection = () => {
    const storage = getStorage(app);
    const db = getDatabase(app);
    const auth = getAuth(app);
    const { currentUser, setIsAuthUpdated, isGoogle } = useAuthContext();

    const [open, setOpen] = React.useState<boolean>(false);
    const formikRef = React.useRef<FormikProps<IPassword>>(null);

    const handleDeletion = async (type: "GOOGLE" | "EMAIL", values?: IPassword) => {
        try {
            if (currentUser) {
                if (type === "EMAIL" && values) {
                    const credential: AuthCredential = EmailAuthProvider.credential(
                        currentUser.email ?? "",
                        values.password
                    );

                    await reauthenticateWithCredential(currentUser, credential);

                    // Delete user profile image from storage if exists
                    const imageRef = ref(storage, `users/${currentUser?.uid}/profile-image`);

                    // check if image exists
                    try {
                        await deleteObject(imageRef);
                    } catch (error) {
                        console.error("Image not found");
                    }
                } else if (type === "GOOGLE") {
                    const provider = new GoogleAuthProvider();
                    await signInWithPopup(auth, provider);
                    await reauthenticateWithPopup(currentUser, provider);
                }

                const userRef = databaseRef(db, `users/${currentUser.uid}`);

                await remove(userRef);

                await deleteUser(currentUser);

                toast.success("Fiók sikeresen törölve");
                setOpen(false);
                setIsAuthUpdated((prev) => !prev);
            }
        } catch (error) {
            switch ((error as FirebaseError).code) {
                case "auth/requires-recent-login":
                    toast.error("A fiók törléséhez újra be kell jelentkezned");
                    break;
                case "auth/missing-password":
                    toast.error("A jelszó hiányzik");
                    break;
                case "auth/invalid-credential":
                    toast.error("Hibás jelszó");
                    break;
                default:
                    console.error(error);
                    toast.error("Hiba történt a fiók törlése során");
            }
        }
    };

    return (
        <React.Fragment>
            <section className="flex flex-row self-center gap-5 justify-between p-4 w-full bg-[rgba(255,228,228,0.76)] backdrop-blur-[6.4px] ring-2 ring-red-600 rounded-lg text-red-600">
                <div className="flex flex-col">
                    <h1 className="font-bold text-xl">Fiók törlése</h1>
                    <p className="text-red-500 italic">
                        A fiók törlésével az összes adat véglegesen elveszik és nem állítható vissza.
                    </p>
                </div>
                <div className="self-center">
                    <Button2
                        className="bg-red-600 px-4 gap-2 text-white font-medium rounded-lg"
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        Törlés <MdDeleteForever className="text-2xl" />
                    </Button2>
                </div>
            </section>

            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>
                        <IoIosWarning className="text-2xl text-red-600" />
                        Fiók törlése
                    </DialogTitle>
                    <Divider />
                    <DialogContent
                        sx={{
                            padding: "5px",
                        }}
                    >
                        Biztosan törölni szeretnéd a fiókodat?
                        {!isGoogle ? (
                            <Formik<IPassword>
                                innerRef={formikRef}
                                initialValues={{
                                    password: "",
                                }}
                                validationSchema={Yup.object().shape({
                                    password: Yup.string().required("Kötelező mező"),
                                })}
                                onSubmit={(values) => {
                                    handleDeletion("EMAIL", values);
                                }}
                            >
                                <Form>
                                    <BasicInputField
                                        className="px-2 py-2 text-sm"
                                        type="password"
                                        name="password"
                                        placeholder="Jelszó"
                                        title="Jelszó"
                                        required
                                    />
                                </Form>
                            </Formik>
                        ) : null}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="solid"
                            color="danger"
                            onClick={() => {
                                if (isGoogle) {
                                    handleDeletion("GOOGLE");
                                } else {
                                    formikRef.current?.submitForm();
                                }
                            }}
                        >
                            Megerősítés
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            Mégse
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
};

export default DeleteUserSection;
