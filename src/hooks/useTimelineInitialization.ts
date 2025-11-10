import { gsap } from 'gsap';
import { MutableRefObject } from 'react';

export const useTimelineInitialization = (
    pointsRef: MutableRefObject<SVGCircleElement[]>,
    numbersRef: MutableRefObject<SVGTextElement[]>,
    labelsRef: MutableRefObject<SVGTextElement[]>,
    getPointPosition: (index: number, targetActivePeriod: number, total: number) => { x: number; y: number },
    getTextPosition: (x: number, y: number) => { textX: number; textY: number }
) => {
    const initializePoints = (periods: any[], activePeriod: number, isMobile: boolean) => {
        if (pointsRef.current.length === 0) return;

        periods.forEach((_, index) => {
            const { x, y } = getPointPosition(index, activePeriod, periods.length);
            const isActive = index === activePeriod;
            const { textX, textY } = getTextPosition(x, y);

            const pointX = isMobile ? x : 268 + x;
            const pointY = isMobile ? y : 265 + y;

            const pointSize = isMobile ? 3 : (isActive ? 28 : 3);
            const fillColor = isMobile
                ? (isActive ? "#42567A" : "rgba(66,86,122, 0.5)")
                : (isActive ? "#F4F5F9" : "#42567A");

            gsap.set(pointsRef.current[index], {
                attr: {
                    cx: pointX,
                    cy: pointY,
                    r: pointSize
                },
                fill: fillColor,
                stroke: isActive ? "rgba(66, 86, 122, 0.5)" : "none",
                strokeWidth: isActive ? 1 : 0
            });

            if (numbersRef.current[index]) {
                gsap.set(numbersRef.current[index], {
                    attr: { x: pointX, y: pointY },
                    opacity: isActive ? 1 : 0
                });
            }

            if (labelsRef.current[index]) {
                gsap.set(labelsRef.current[index], {
                    attr: { x: textX, y: textY },
                    opacity: isActive ? 1 : 0
                });
            }
        });
    };

    return {
        initializePoints
    };
};