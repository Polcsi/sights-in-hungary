import React from "react";
import Button from "../Button";
import { type ISlider } from "./Slider";
import { useAnimate } from "framer-motion";
import { useSliderContext } from "./SliderContext";

const Step = (props: ISlider & { index: number }) => {
    const { id, author, title, location, image, description } = props;
    const [scope, animate] = useAnimate();
    const { activeIndex } = useSliderContext();

    React.useEffect(() => {
        const element = scope?.current;

        if (element) {
            element.style.display = "block";
            animate(
                element,
                {
                    opacity: 1,
                },
                {
                    delay: 0.1,
                }
            );
            // Reset the image position
            animate(
                "img",
                {
                    x: 0,
                    y: 0,
                },
                {
                    damping: 30,
                }
            );
            animate(".SliderHeader", { opacity: 1, y: 0 }, { delay: 0.3 });
            animate(".SliderAuthor", { opacity: 1, y: 0 }, { delay: 0.4 });
            animate("p", { opacity: 1, y: 0 }, { delay: 0.5 });
            animate("a", { opacity: 1, y: 0 }, { delay: 0.6 });

            if (activeIndex !== props.index) {
                animate(
                    element,
                    { opacity: 0 },
                    {
                        onComplete: () => {
                            element.style.display = "none";
                        },
                    }
                );
                animate("img", { x: 0, y: 20 });
                animate(".SliderHeader", { opacity: 0, y: 5 }, { delay: 0.1 });
                animate(
                    ".SliderAuthor",
                    { opacity: 0, y: 5 },
                    {
                        delay: 0.2,
                    }
                );
                animate("p", { opacity: 0, y: 5 }, { delay: 0.3 });
                animate("a", { opacity: 0, y: 5 }, { delay: 0.4 });
            }
        }

        return () => {
            animate(element, { opacity: 0 });
        };
    }, [activeIndex]);

    return (
        <article ref={scope} className="absolute w-[800px]">
            <img
                src={image}
                alt={title?.toLowerCase().trim().replace(/\s/g, "-")}
                className="absolute -left-[230px] top-2 object-cover w-[400px] h-[350px] rounded-3xl shadow-xl shadow-gray-700"
            />
            <div className="grid gap-4 pt-5 ml-[220px]">
                <div className="flex flex-col gap-0 text-white">
                    <div className="SliderHeader flex flex-row gap-4 items-center">
                        <h1 className="text-[35px] font-bold">{title}</h1>
                        <span className="font-black">-</span>
                        <h2 className="text-[22px]">{location}</h2>
                    </div>
                    <span className="SliderAuthor text-input-text text-base">{author}</span>
                </div>
                <p className="text-white leading-[45px] text-lg">{description}</p>
                <Button
                    linkProps={{
                        href: `/sights/${id}`,
                        className: "text-center w-[180px] py-2 mt-4",
                    }}
                >
                    Megtekintés
                </Button>
            </div>
        </article>
    );
};

export default Step;
