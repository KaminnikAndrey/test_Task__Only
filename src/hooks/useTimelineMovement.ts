import { gsap } from 'gsap';
import { MutableRefObject } from 'react';
import { getPositionFromAngle } from '../utils/circleGeometry';

export const useTimelineMovement = (
    periods: any[],
    pointsRef: MutableRefObject<SVGCircleElement[]>,
    numbersRef: MutableRefObject<SVGTextElement[]>,
    labelsRef: MutableRefObject<SVGTextElement[]>,
    getTextPosition: (x: number, y: number) => { textX: number; textY: number },
    animateCounter: (element: HTMLElement, from: number, to: number, duration: number) => void
) => {
    const calculateAngles = (activePeriod: number, targetPeriod: number, totalPeriods: number) => {
        const startAngles = periods.map((_, index) => {
            const relativeIndex = (index - 2 - activePeriod + totalPeriods) % totalPeriods;
            return 60 + (relativeIndex * (360 / totalPeriods));
        });

        const endAngles = periods.map((_, index) => {
            const relativeIndex = (index - 2 - targetPeriod + totalPeriods) % totalPeriods;
            return 60 + (relativeIndex * (360 / totalPeriods));
        });

        return { startAngles, endAngles };
    };

    const animatePoints = (
        startAngles: number[],
        endAngles: number[],
        newActivePeriod: number,
        stepCallback?: (progress: number) => void
    ) => {
        const steps = 20;
        const stepDuration = 600 / steps;
        let currentStep = 0;

        const animateStep = () => {
            if (currentStep > steps) return;

            const progress = currentStep / steps;

            periods.forEach((_, index) => {
                const isActive = index === newActivePeriod;
                let angleDiff = endAngles[index] - startAngles[index];

                if (Math.abs(angleDiff) > 180) {
                    angleDiff = angleDiff - 360 * Math.sign(angleDiff);
                }

                const currentAngle = startAngles[index] + angleDiff * progress;
                const { x, y } = getPositionFromAngle(currentAngle);
                const { textX, textY } = getTextPosition(x, y);

                updatePointPosition(index, x, y, textX, textY, isActive, progress);
            });

            if (stepCallback) {
                stepCallback(progress);
            }

            currentStep++;
            setTimeout(animateStep, stepDuration);
        };

        animateStep();
    };

    const updatePointPosition = (
        index: number,
        x: number,
        y: number,
        textX: number,
        textY: number,
        isActive: boolean,
        progress: number
    ) => {
        gsap.set(pointsRef.current[index], {
            attr: { cx: 268 + x, cy: 265 + y }
        });

        if (numbersRef.current[index]) {
            gsap.set(numbersRef.current[index], {
                attr: { x: 268 + x, y: 265 + y }
            });
        }

        if (labelsRef.current[index]) {
            gsap.set(labelsRef.current[index], {
                attr: { x: textX, y: textY }
            });
        }

        if (progress > 0.5) {
            animatePointStyle(index, isActive);
        }
    };

    const animatePointStyle = (index: number, isActive: boolean) => {
        gsap.to(pointsRef.current[index], {
            duration: 0.15,
            attr: { r: isActive ? 28 : 3 },
            fill: isActive ? "#F4F5F9" : "#42567A",
            stroke: isActive ? "rgba(66, 86, 122, 0.5)" : "none",
            strokeWidth: isActive ? 1 : 0,
            overwrite: true
        });

        if (numbersRef.current[index]) {
            gsap.to(numbersRef.current[index], {
                duration: 0.15,
                opacity: isActive ? 1 : 0,
                overwrite: true
            });
        }

        if (labelsRef.current[index]) {
            gsap.to(labelsRef.current[index], {
                duration: 0.15,
                opacity: isActive ? 1 : 0,
                overwrite: true
            });
        }
    };

    return {
        calculateAngles,
        animatePoints,
        animatePointStyle
    };
};