import React from "react";
import { useAuthContext } from "../../features/auth/AuthContext";
import { FaUser } from "react-icons/fa6";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";

const ProfileImage = () => {
    const storage = getStorage(app);

    const { currentUser, setIsAuthUpdated, isGoogle } = useAuthContext();
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (currentUser) {
                const imageRef = ref(storage, `users/${currentUser?.uid}/profile-image`);
                // Upload image to storage
                await uploadBytes(imageRef, e.target.files?.[0] ?? new Blob());

                const imgUrl = await getDownloadURL(imageRef);
                // Update profile image with https url
                await updateProfile(currentUser, {
                    photoURL: imgUrl,
                });

                await currentUser.reload();
                setIsAuthUpdated((prev) => !prev);
                toast.success("Sikeres kép feltöltés");
            } else {
                throw new Error("Nincs bejelentkezve felhasználó");
            }
        } catch (error) {
            console.error(error);
            toast.error("Hiba történt a kép feltöltése során");
        }
    };

    return (
        <React.Fragment>
            <button
                disabled={isGoogle}
                type="button"
                className="self-center focus-visible:ring-4 focus-visible:ring-blue-500 rounded-full hover:ring-2 hover:ring-blue-500 transition-all duration-200 ease-in-out disabled:hover:ring-0"
                onClick={() => {
                    if (fileInputRef.current) {
                        fileInputRef.current.click();
                    }
                }}
            >
                <div className="size-36 rounded-full bg-gray-light flex justify-center items-center self-center">
                    {currentUser?.photoURL ? (
                        <img className="rounded-full size-32" src={currentUser?.photoURL ?? ""} alt="profile-img" />
                    ) : (
                        <FaUser className="text-white size-24" />
                    )}
                </div>
            </button>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
            />
        </React.Fragment>
    );
};

export default ProfileImage;
