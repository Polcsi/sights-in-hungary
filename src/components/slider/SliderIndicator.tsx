import { useSliderContext } from "./SliderContext";

const SliderIndicator = () => {
    const { activeIndex, setActiveIndex, numberOfSteps } = useSliderContext();

    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="absolute right-5 grid gap-2 top-[50%] -translate-y-[50%]">
            {Array.from({ length: numberOfSteps })?.map((_, index) => {
                return (
                    <button
                        key={index}
                        type="button"
                        className={`size-5 ${activeIndex === index ? "bg-input-text cursor-not-allowed" : "bg-gray-light cursor-pointer"} rounded-full transition-background duration-150`}
                        onClick={() => {
                            if (activeIndex !== index) {
                                handleClick(index);
                            }
                        }}
                    />
                );
            })}
        </div>
    );
};

export default SliderIndicator;
