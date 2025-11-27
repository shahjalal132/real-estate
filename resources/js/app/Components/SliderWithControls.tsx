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
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
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

