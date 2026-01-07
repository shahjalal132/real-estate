import { useEffect, useRef, RefObject } from "react";

interface SectionRef<T extends string> {
    ref: RefObject<HTMLDivElement>;
    name: T;
}

/**
 * Custom hook to track which section is currently visible in a scrollable container
 * and update the active tab accordingly.
 */
export function useScrollTracking<T extends string>(
    sections: SectionRef<T>[],
    containerRef: RefObject<HTMLDivElement>,
    activeTab: T,
    setActiveTab: (tab: T) => void,
    isActive: boolean
) {
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !isActive) return;

        const handleScroll = () => {
            const containerRect = container.getBoundingClientRect();
            const containerTop = containerRect.top;
            const containerBottom = containerRect.bottom;

            // Find which section is most visible in the viewport
            let mostVisibleSection = sections[0];
            let maxVisibility = 0;

            for (const section of sections) {
                if (section.ref.current) {
                    const sectionRect = section.ref.current.getBoundingClientRect();
                    const sectionTop = sectionRect.top;
                    const sectionBottom = sectionRect.bottom;
                    const sectionHeight = sectionRect.height;

                    // Calculate how much of the section is visible
                    const visibleTop = Math.max(sectionTop, containerTop);
                    const visibleBottom = Math.min(sectionBottom, containerBottom);
                    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                    const visibilityRatio = visibleHeight / sectionHeight;

                    // Also check if section is near the top of the container
                    const distanceFromTop = Math.abs(sectionTop - containerTop);

                    // Prefer sections that are more visible and closer to the top
                    const score = visibilityRatio * 100 - distanceFromTop * 0.1;

                    if (score > maxVisibility) {
                        maxVisibility = score;
                        mostVisibleSection = section;
                    }
                }
            }

            if (mostVisibleSection && mostVisibleSection.name !== activeTab) {
                setActiveTab(mostVisibleSection.name);
            }
        };

        // Use throttling to improve performance
        let ticking = false;
        const throttledHandleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        container.addEventListener("scroll", throttledHandleScroll, {
            passive: true,
        });
        handleScroll();
        const timeoutId = setTimeout(handleScroll, 100);

        return () => {
            container.removeEventListener("scroll", throttledHandleScroll);
            clearTimeout(timeoutId);
        };
    }, [sections, containerRef, activeTab, setActiveTab, isActive]);
}

/**
 * Helper function to scroll to a section
 */
export function scrollToSection<T extends string>(
    section: T,
    refs: Record<T, RefObject<HTMLDivElement>>,
    containerRef: RefObject<HTMLDivElement>
) {
    const targetRef = refs[section];
    if (targetRef?.current && containerRef.current) {
        targetRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}

