import React, { useRef, useEffect, useState } from 'react';
import { TimelineProps } from "../../types";
import { gsap } from 'gsap';
import { useTimelineAnimation } from '../../hooks/useTimelineAnimation';
import { useTimelineNavigation } from '../../hooks/useTimelineNavigation';
import { getCirclePointPosition, getPositionFromAngle } from '../../utils/circleGeometry';
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

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 970);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const getPointPosition = (index: number, targetActivePeriod: number, total: number) => {
        if (isMobile) {
            const pointRadius = 3;
            const spacing = 10;
            const totalWidth = (total * (pointRadius * 2)) + ((total - 1) * spacing);
            const startX = (200 - totalWidth) / 2 + pointRadius;
            const position = startX + (index * (pointRadius * 2 + spacing));
            return { x: position, y: 40 };
        } else {
            return getCirclePointPosition(index, targetActivePeriod, total, 200);
        }
    };

    const getTextPosition = (x: number, y: number) => {
        if (isMobile) {
            const textX = x + 3;
            const textY = y - 15;
            return { textX, textY };
        } else {
            const textX = 268 + x + 30;
            const textY = 265 + y;
            return { textX, textY };
        }
    };

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

    const animateToPeriod = (newActivePeriod: number) => {
        if (isMobile) {
            onPeriodChange(newActivePeriod);
            return;
        }

        if (isAnimating || newActivePeriod === activePeriod) return;

        startAnimation();
        const newStartYear = periods[newActivePeriod].startYear;
        const newEndYear = periods[newActivePeriod].endYear;

        const startAngles = periods.map((_, index) => {
            const relativeIndex = (index - 2 - activePeriod + totalPeriods) % totalPeriods;
            return 60 + (relativeIndex * (360 / totalPeriods));
        });

        const endAngles = periods.map((_, index) => {
            const relativeIndex = (index - 2 - newActivePeriod + totalPeriods) % totalPeriods;
            return 60 + (relativeIndex * (360 / totalPeriods));
        });

        const steps = 20;
        const stepDuration = 600 / steps;
        let currentStep = 0;

        const animateStep = () => {
            if (currentStep > steps) {
                endAnimation(newStartYear, newEndYear);
                onPeriodChange(newActivePeriod);
                return;
            }

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
                }
            });

            if (currentStep === Math.floor(steps / 2) && startYearRef.current && endYearRef.current) {
                animateCounter(startYearRef.current, previousStartYear.current, newStartYear, 0.8);
                animateCounter(endYearRef.current, previousEndYear.current, newEndYear, 0.8);
            }

            currentStep++;
            setTimeout(animateStep, stepDuration);
        };

        animateStep();
    };

    useEffect(() => {
        if (pointsRef.current.length > 0) {
            periods.forEach((_, index) => {
                const { x, y } = getPointPosition(index, activePeriod, totalPeriods);
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
        }
    }, [periods, activePeriod, isMobile]);

    const nextSlide = () => {
        if (isMobile) {
            if (activePeriod < totalPeriods - 1) {
                onPeriodChange(activePeriod + 1);
            }
            return;
        }

        if (activePeriod < totalPeriods - 1 && !isAnimating) {
            animateToPeriod(activePeriod + 1);
        }
    };

    const prevSlide = () => {
        if (isMobile) {
            if (activePeriod > 0) {
                onPeriodChange(activePeriod - 1);
            }
            return;
        }

        if (activePeriod > 0 && !isAnimating) {
            animateToPeriod(activePeriod - 1);
        }
    };

    const handlePointClick = (index: number) => {
        if (isMobile) {
            if (index !== activePeriod) {
                onPeriodChange(index);
            }
            return;
        }

        if (!isAnimating && index !== activePeriod) {
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
                    <svg
                        width={isMobile ? "200" : "536"}
                        height={isMobile ? "80" : "530"}
                        viewBox={isMobile ? "0 0 200 80" : "0 0 536 530"}
                    >
                        {!isMobile && (
                            <circle
                                cx="268"
                                cy="265"
                                r="200"
                                fill="none"
                                stroke="rgba(128, 128, 128, 0.1)"
                                strokeWidth="2"
                            />
                        )}
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
                                        if (!isMobile) {
                                            handlePointHover(index);
                                        }
                                    }}
                                    onPointLeave={() => {
                                        handlePointMouseLeave();
                                        if (!isMobile && hoveredPoint !== null) {
                                            handlePointLeave(hoveredPoint);
                                        }
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
                <span
                    ref={startYearRef}
                    className="timeline__date-start"
                >
                    {periods[activePeriod].startYear}
                </span>
                <span
                    ref={endYearRef}
                    className="timeline__date-end"
                >
                    {periods[activePeriod].endYear}
                </span>
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
                    <button
                        className="timeline__arrow timeline__arrow--prev"
                        onClick={prevSlide}
                        disabled={activePeriod === 0 || (isAnimating && !isMobile)}
                    >
                    </button>
                    <button
                        className="timeline__arrow timeline__arrow--next"
                        onClick={nextSlide}
                        disabled={activePeriod === totalPeriods - 1 || (isAnimating && !isMobile)}
                    >
                    </button>
                </div>
            </div>
        </div>
    );
};