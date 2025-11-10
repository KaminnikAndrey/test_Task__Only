import { gsap } from 'gsap';
import { MutableRefObject } from 'react';

export const useTimelineInteractions = (
    pointsRef: MutableRefObject<SVGCircleElement[]>,
    numbersRef: MutableRefObject<SVGTextElement[]>,
    isMobile: boolean,
    isAnimating: boolean,
    activePeriod: number
) => {
    const handlePointHover = (index: number) => {
        if (isMobile || isAnimating || index === activePeriod) return;

        gsap.to(pointsRef.current[index], {
            duration: 0.6,
            attr: { r: 28 },
            fill: "#F4F5F9",
            stroke: "rgba(66, 86, 122, 0.5)",
            strokeWidth: 1,
            ease: "power2.out"
        });

        if (numbersRef.current[index]) {
            gsap.to(numbersRef.current[index], {
                duration: 0.6,
                opacity: 1,
                ease: "power2.out"
            });
        }
    };

    const handlePointLeave = (index: number) => {
        if (isMobile || isAnimating || index === activePeriod) return;

        gsap.to(pointsRef.current[index], {
            duration: 0.6,
            attr: { r: 3 },
            fill: "#42567A",
            stroke: "none",
            strokeWidth: 0,
            ease: "power2.out"
        });

        if (numbersRef.current[index]) {
            gsap.to(numbersRef.current[index], {
                duration: 0.6,
                opacity: 0,
                ease: "power2.out"
            });
        }
    };

    return {
        handlePointHover,
        handlePointLeave
    };
};