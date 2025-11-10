export const getCirclePointPosition = (
    index: number,
    targetActivePeriod: number,
    total: number,
    radius: number
) => {
    const relativeIndex = (index - 2 - targetActivePeriod + total) % total;
    const angle = 60 + (relativeIndex * (360 / total));
    return getPositionFromAngle(angle, radius);
};

export const getPositionFromAngle = (angle: number, radius: number = 200) => {
    const rad = (angle * Math.PI) / 180;
    const x = radius * Math.cos(rad);
    const y = radius * Math.sin(rad);
    return { x, y };
};

export const getTextPosition = (x: number, y: number) => {
    const textX = 268 + x + 30;
    const textY = 265 + y;
    return { textX, textY };
};

