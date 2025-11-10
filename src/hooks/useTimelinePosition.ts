import { getCirclePointPosition } from '../utils/circleGeometry';

export const useTimelinePosition = (isMobile: boolean) => {
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

    return {
        getPointPosition,
        getTextPosition
    };
};