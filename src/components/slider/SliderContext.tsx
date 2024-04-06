import React, { ReactElement, createContext, useContext } from "react";
import { type ISlider } from "./Slider";

type ProviderParams = {
    children?: ReactElement[] | ReactElement | undefined;
};

type SliderContextType = {
    steps: ISlider[];
};

const useContextFunc = ({ steps }: SliderContextType) => {
    const [activeIndex, setActiveIndex] = React.useState<number>(0);

    const numberOfSteps = steps?.length;

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => {
                if (prev === numberOfSteps - 1) {
                    return 0;
                }
                return prev + 1;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [steps]);

    return { activeIndex, setActiveIndex, numberOfSteps };
};

type UseSliderContextType = ReturnType<typeof useContextFunc>;

const initContextState: UseSliderContextType = {
    activeIndex: 0,
    setActiveIndex: () => {},
    numberOfSteps: 0,
};

const SliderContext = createContext<UseSliderContextType>(initContextState);

const SliderContextProvider = ({ children, steps }: ProviderParams & SliderContextType) => {
    return <SliderContext.Provider value={useContextFunc({ steps })}>{children}</SliderContext.Provider>;
};

export const useSliderContext = () => {
    return useContext(SliderContext);
};

export { SliderContext, SliderContextProvider };
