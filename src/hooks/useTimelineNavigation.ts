import { useRef, useState } from 'react';
import { TimePeriod } from '../types';

export const useTimelineNavigation = (
    periods: TimePeriod[],
    onPeriodChange: (periodIndex: number) => void
) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
    const previousStartYear = useRef(periods[0].startYear);
    const previousEndYear = useRef(periods[0].endYear);

    const handlePointMouseEnter = (index: number, activePeriod: number) => {
        if (index !== activePeriod) {
            setHoveredPoint(index);
        }
    };

    const handlePointMouseLeave = () => {
        setHoveredPoint(null);
    };

    const startAnimation = () => {
        setIsAnimating(true);
    };

    const endAnimation = (newStartYear: number, newEndYear: number) => {
        setIsAnimating(false);
        previousStartYear.current = newStartYear;
        previousEndYear.current = newEndYear;
    };

    return {
        isAnimating,
        hoveredPoint,
        previousStartYear,
        previousEndYear,
        handlePointMouseEnter,
        handlePointMouseLeave,
        startAnimation,
        endAnimation
    };
};