import { AnimatePresence } from "framer-motion";
import { SliderContextProvider } from "./SliderContext";
import SliderIndicator from "./SliderIndicator";
import Step from "./Step";

export interface ISlider {
    id: number;
    author: string;
    title: string;
    location: string;
    image: string;
    description?: string;
}

interface ISliderProps {
    steps: ISlider[];
}

const Slider = ({ steps }: ISliderProps) => {
    return (
        <SliderContextProvider steps={steps}>
            <div className="bg-gray-primary w-[900px] h-[450px] rounded-3xl p-10 shadow-md shadow-gray-600 relative">
                <AnimatePresence mode="wait">
                    {steps.map((step, index) => (
                        <Step key={step.id} index={index} {...step} />
                    ))}
                </AnimatePresence>
                <SliderIndicator />
            </div>
        </SliderContextProvider>
    );
};

export default Slider;
