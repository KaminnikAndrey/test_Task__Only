import { useRef } from 'react';
import { gsap } from 'gsap';

export const useTimelineAnimation = () => {
    const pointsRef = useRef<SVGCircleElement[]>([]);
    const numbersRef = useRef<SVGTextElement[]>([]);
    const labelsRef = useRef<SVGTextElement[]>([]);

    const setPointRef = (index: number) => (el: SVGCircleElement | null) => {
        if (el) {
            pointsRef.current[index] = el;
        }
    };

    const setNumberRef = (index: number) => (el: SVGTextElement | null) => {
        if (el) {
            numbersRef.current[index] = el;
        }
    };

    const setLabelRef = (index: number) => (el: SVGTextElement | null) => {
        if (el) {
            labelsRef.current[index] = el;
        }
    };

    const animateCounter = (element: HTMLElement, from: number, to: number, duration: number) => {
        gsap.fromTo(element, {
            textContent: from
        }, {
            textContent: to,
            duration,
            snap: { textContent: 1 },
            onUpdate: function() {
                if (element.textContent !== null) {
                    element.textContent = Math.floor(Number(this.targets()[0].textContent)).toString();
                }
            }
        });
    };

    return {
        pointsRef,
        numbersRef,
        labelsRef,
        setPointRef,
        setNumberRef,
        setLabelRef,
        animateCounter
    };
};