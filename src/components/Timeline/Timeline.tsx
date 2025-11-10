import React, { useRef, useEffect, useState } from 'react';
import { TimelineProps } from "../../types";
import { useTimelineAnimation } from '../../hooks/useTimelineAnimation';
import { useTimelineNavigation } from '../../hooks/useTimelineNavigation';
import { useTimelinePosition } from '../../hooks/useTimelinePosition';
import { useTimelineInteractions } from '../../hooks/useTimelineInteractions';
import { useTimelineMovement } from '../../hooks/useTimelineMovement';
import { useTimelineInitialization } from '../../hooks/useTimelineInitialization';
import { TimelinePoint } from '../TimelinePoint/TimelinePoint';
import './Timeline.scss';

export const Timeline: React.FC<TimelineProps> = ({
                                                      periods,
                                                      className = '',
                                                      activePeriod,
                                                      onPeriodChange,
                                                  }) => {
    const totalPeriods = periods.length;
    const startYearRef = useRef<HTMLSpanElement>(null);
    const endYearRef = useRef<HTMLSpanElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    const {
        pointsRef,
        numbersRef,
        labelsRef,
        setPointRef,
        setNumberRef,
        setLabelRef,
        animateCounter
    } = useTimelineAnimation();

    const {
        isAnimating,
        hoveredPoint,
        previousStartYear,
        previousEndYear,
        handlePointMouseEnter,
        handlePointMouseLeave,
        startAnimation,
        endAnimation
    } = useTimelineNavigation(periods, onPeriodChange);

    const { getPointPosition, getTextPosition } = useTimelinePosition(isMobile);
    const { handlePointHover, handlePointLeave } = useTimelineInteractions(
        pointsRef, numbersRef, isMobile, isAnimating, activePeriod
    );
    const { calculateAngles, animatePoints } = useTimelineMovement(
        periods, pointsRef, numbersRef, labelsRef, getTextPosition, animateCounter
    );
    const { initializePoints } = useTimelineInitialization(
        pointsRef, numbersRef, labelsRef, getPointPosition, getTextPosition
    );

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 970);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        initializePoints(periods, activePeriod, isMobile);
    }, [periods, activePeriod, isMobile]);

    const animateToPeriod = (newActivePeriod: number) => {
        if (isMobile) {
            onPeriodChange(newActivePeriod);
            return;
        }

        if (isAnimating || newActivePeriod === activePeriod) return;

        startAnimation();
        const newStartYear = periods[newActivePeriod].startYear;
        const newEndYear = periods[newActivePeriod].endYear;

        const { startAngles, endAngles } = calculateAngles(activePeriod, newActivePeriod, totalPeriods);

        animatePoints(startAngles, endAngles, newActivePeriod, (progress) => {
            if (progress === 0.5 && startYearRef.current && endYearRef.current) {
                animateCounter(startYearRef.current, previousStartYear.current, newStartYear, 0.8);
                animateCounter(endYearRef.current, previousEndYear.current, newEndYear, 0.8);
            }
        });

        setTimeout(() => {
            endAnimation(newStartYear, newEndYear);
            onPeriodChange(newActivePeriod);
        }, 600);
    };

    const nextSlide = () => {
        if (isMobile) {
            if (activePeriod < totalPeriods - 1) onPeriodChange(activePeriod + 1);
        } else if (activePeriod < totalPeriods - 1 && !isAnimating) {
            animateToPeriod(activePeriod + 1);
        }
    };

    const prevSlide = () => {
        if (isMobile) {
            if (activePeriod > 0) onPeriodChange(activePeriod - 1);
        } else if (activePeriod > 0 && !isAnimating) {
            animateToPeriod(activePeriod - 1);
        }
    };

    const handlePointClick = (index: number) => {
        if (isMobile) {
            if (index !== activePeriod) onPeriodChange(index);
        } else if (!isAnimating && index !== activePeriod) {
            animateToPeriod(index);
        }
    };

    const getCurrentPosition = (index: number) => {
        return getPointPosition(index, activePeriod, totalPeriods);
    };

    return (
        <div className={`timeline ${className} ${isMobile ? 'timeline--mobile' : ''}`}>
            <div className="timeline__header">
                <div className="timeline__progress">
                    <svg width={isMobile ? "200" : "536"} height={isMobile ? "80" : "530"} viewBox={isMobile ? "0 0 200 80" : "0 0 536 530"}>
                        {!isMobile && <circle cx="268" cy="265" r="200" fill="none" stroke="rgba(128, 128, 128, 0.1)" strokeWidth="2" />}
                        {periods.map((period, index) => {
                            const { x, y } = getCurrentPosition(index);
                            const isActive = index === activePeriod;
                            const isHovered = hoveredPoint === index;

                            return (
                                <TimelinePoint
                                    key={index}
                                    index={index}
                                    period={period}
                                    isActive={isActive}
                                    isHovered={isHovered}
                                    isAnimating={isAnimating}
                                    position={{ x, y: isMobile ? 40 : y }}
                                    onPointClick={handlePointClick}
                                    onPointHover={(index) => {
                                        handlePointMouseEnter(index, activePeriod);
                                        if (!isMobile) handlePointHover(index);
                                    }}
                                    onPointLeave={() => {
                                        handlePointMouseLeave();
                                        if (!isMobile && hoveredPoint !== null) handlePointLeave(hoveredPoint);
                                    }}
                                    setPointRef={setPointRef}
                                    setNumberRef={setNumberRef}
                                    setLabelRef={setLabelRef}
                                    isMobile={isMobile}
                                />
                            );
                        })}
                    </svg>
                </div>
            </div>
            <div className="timeline__date">
                <span ref={startYearRef} className="timeline__date-start">{periods[activePeriod].startYear}</span>
                <span ref={endYearRef} className="timeline__date-end">{periods[activePeriod].endYear}</span>
            </div>
            <div className="timeline__arrows">
                <div className="timeline__info">
                    <div className="timeline__numbers">
                        <span className="timeline__current">0{activePeriod + 1}</span>
                        <span className="timeline__divider">/</span>
                        <span className="timeline__total">0{totalPeriods}</span>
                    </div>
                </div>
                <div className="timeline__navigation">
                    <button className="timeline__arrow timeline__arrow--prev" onClick={prevSlide} disabled={activePeriod === 0 || (isAnimating && !isMobile)} />
                    <button className="timeline__arrow timeline__arrow--next" onClick={nextSlide} disabled={activePeriod === totalPeriods - 1 || (isAnimating && !isMobile)} />
                </div>
            </div>
        </div>
    );
};