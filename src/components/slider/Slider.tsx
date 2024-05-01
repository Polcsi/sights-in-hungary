import { AnimatePresence } from "framer-motion";
import { ISight } from "../../pages/sights/SightCard";
import { SliderContextProvider } from "./SliderContext";
import SliderIndicator from "./SliderIndicator";
import Step from "./Step";

export type ISlider = Pick<ISight, "id" | "name" | "description" | "location" | "photoUrl">;

interface ISliderProps {
    steps: ISlider[];
}

const Slider = ({ steps }: ISliderProps) => {
    return (
        <SliderContextProvider steps={steps}>
            <div className="bg-gray-primary w-[900px] h-[450px] rounded-3xl p-10 shadow-md shadow-gray-600 relative">
                <AnimatePresence mode="wait">
                    {steps?.map((step, index) => <Step key={step.id} index={index} {...step} />)}
                </AnimatePresence>
                <SliderIndicator />
            </div>
        </SliderContextProvider>
    );
};

export default Slider;
