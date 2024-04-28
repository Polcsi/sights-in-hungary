import { useFormikContext } from "formik";
import MapLayout from "../../../components/map/MapLayout";
import { ISightCreation } from "./CreationForm";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInOut } from "../../../components/BasicInputField";

interface IMapCreationProps {
    latName: string;
    lngName: string;
}

const MapCreation = ({ latName, lngName }: IMapCreationProps) => {
    const { errors, touched, setFieldValue, setFieldTouched } = useFormikContext<ISightCreation>();

    const isError = (errors.latitude && touched.latitude) || (errors.longitude && touched.longitude);

    return (
        <div className="flex flex-col gap-1">
            <h1 className="text-2xl text-gray-primary font-medium text-left">Helyszín kiválasztása</h1>
            <MapLayout
                className="h-[400px]"
                isSelect={true}
                markerChangedFunc={(lat, lng) => {
                    console.log(lat, lng);
                    setFieldValue(latName, lat);
                    setFieldValue(lngName, lng);
                    setFieldTouched(latName, true);
                    setFieldTouched(lngName, true);
                }}
            />
            <div className="mt-0 text-sm text-red-600 dark:text-red-500">
                <AnimatePresence initial={false}>
                    {isError ? (
                        <motion.div
                            initial="initial"
                            animate={"in"}
                            variants={fadeInOut}
                            exit={"out"}
                            data-testid="error-message"
                        >
                            {errors.longitude}
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MapCreation;
