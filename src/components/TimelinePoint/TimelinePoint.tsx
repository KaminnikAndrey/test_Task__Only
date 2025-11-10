import React from 'react';
import { TimePeriod } from '../../types';
import { getTextPosition } from '../../utils/circleGeometry';

interface TimelinePointProps {
    index: number;
    period: TimePeriod;
    isActive: boolean;
    isHovered: boolean;
    isAnimating: boolean;
    position: { x: number; y: number };
    onPointClick: (index: number) => void;
    onPointHover: (index: number) => void;
    onPointLeave: () => void;
    setPointRef: (index: number) => (el: SVGCircleElement | null) => void;
    setNumberRef: (index: number) => (el: SVGTextElement | null) => void;
    setLabelRef: (index: number) => (el: SVGTextElement | null) => void;
    isMobile?: boolean;
}

export const TimelinePoint: React.FC<TimelinePointProps> = ({
                                                                index,
                                                                period,
                                                                isActive,
                                                                isHovered,
                                                                isAnimating,
                                                                position,
                                                                onPointClick,
                                                                onPointHover,
                                                                onPointLeave,
                                                                setPointRef,
                                                                setNumberRef,
                                                                setLabelRef,
                                                                isMobile = false
                                                            }) => {
    const { x, y } = position;
    const { textX, textY } = getTextPosition(x, y);

    const pointSize = isMobile ? "3" : (isActive ? "28" : "3");
    const fillColor = isMobile
        ? (isActive ? "#42567A" : "rgba(66,86,122, 0.5)")
        : (isActive ? "#F4F5F9" : "#42567A");

    return (
        <g className={isMobile ? 'timeline-point--mobile' : ''}>
            <circle
                ref={setPointRef(index)}
                cx={isMobile ? x : 268 + x}
                cy={isMobile ? y : 265 + y}
                r={pointSize}
                fill={fillColor}
                stroke={isActive ? "rgba(66, 86, 122, 0.5)" : "none"}
                strokeWidth={isActive ? "1" : "0"}
                className="timeline__point"
                style={{ cursor: isAnimating ? 'default' : 'pointer' }}
                onClick={() => onPointClick(index)}
                onMouseEnter={() => onPointHover(index)}
                onMouseLeave={onPointLeave}
            />
            <text
                ref={setNumberRef(index)}
                x={isMobile ? x : 268 + x}
                y={isMobile ? y : 265 + y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#42567A"
                fontSize="16"
                fontWeight="700"
                fontFamily="'PT Sans', sans-serif"
                style={{
                    pointerEvents: 'none',
                    opacity: isActive ? 1 : 0
                }}
            >
                {!isMobile && index + 1}
            </text>
            {(isActive && !isMobile) && (
                <text
                    ref={setLabelRef(index)}
                    x={textX}
                    y={textY}
                    textAnchor={isMobile ? "middle" : "start"}
                    dominantBaseline="middle"
                    className="timeline__text"
                    fill="#42567A"
                    fontSize={isMobile ? "16" : "14"}
                    fontWeight="400"
                    fontFamily="'PT Sans', sans-serif"
                    style={{ pointerEvents: 'none' }}
                >
                    {period.name}
                </text>
            )}
        </g>
    );
};