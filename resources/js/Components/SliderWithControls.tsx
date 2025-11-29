import { ReactNode, RefObject } from "react";
import Slider, { Settings } from "react-slick";
import SliderControls from "./SliderControls";

interface SliderWithControlsProps {
    children: ReactNode;
    settings?: Settings;
    prevButtonLabel?: string;
    nextButtonLabel?: string;
    className?: string;
    sliderRef: RefObject<Slider | null>;
    onPrev: () => void;
    onNext: () => void;
    hideControls?: boolean;
}

export default function SliderWithControls({
    children,
    settings = {},
    prevButtonLabel = "Previous",
    nextButtonLabel = "Next",
    className = "",
    sliderRef,
    onPrev,
    onNext,
    hideControls = false,
}: SliderWithControlsProps) {
    const defaultSettings: Settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1920,
                settings: { slidesToShow: 5, slidesToScroll: 2 },
            },
            {
                breakpoint: 1536,
                settings: { slidesToShow: 4, slidesToScroll: 2 },
            },
            {
                breakpoint: 1280,
                settings: { slidesToShow: 3, slidesToScroll: 1 },
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
        ],
        ...settings,
    };

    const defaultControls = (
        <div className="mb-2 flex items-center justify-end">
            <SliderControls
                onPrev={onPrev}
                onNext={onNext}
                prevButtonLabel={prevButtonLabel}
                nextButtonLabel={nextButtonLabel}
            />
        </div>
    );

    return (
        <div className={className}>
            {!hideControls && defaultControls}
            <Slider ref={sliderRef} {...defaultSettings}>
                {children}
            </Slider>
        </div>
    );
}
