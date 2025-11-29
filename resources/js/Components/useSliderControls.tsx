import { useRef } from "react";
import Slider from "react-slick";

export function useSliderControls() {
    const sliderRef = useRef<Slider | null>(null);

    const handlePrev = () => sliderRef.current?.slickPrev();
    const handleNext = () => sliderRef.current?.slickNext();

    return {
        sliderRef,
        handlePrev,
        handleNext,
    };
}

