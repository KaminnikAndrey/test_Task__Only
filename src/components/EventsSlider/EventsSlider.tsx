import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Swiper as SwiperType } from 'swiper';
import { TimelineEvent } from '../../types';

import 'swiper/css';
import 'swiper/css/navigation';
import './EventsSlider.scss';

interface EventsSliderProps {
    events: TimelineEvent[];
    className?: string;
    isMobile: boolean;
}

export const EventsSlider: React.FC<EventsSliderProps> = ({
                                                              events,
                                                              className = '',
                                                              isMobile
                                                          }) => {
    const swiperRef = useRef<SwiperType>();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        setIsBeginning(true);
        setIsEnd(isMobile ? events.length <= 1 : events.length <= 3);
    }, [events, isMobile]);

    const updateNavigationState = (swiper: SwiperType) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const swiperConfig = isMobile ? {
        spaceBetween: 20,
        slidesPerView: 1.2,
        centeredSlides: false,
        navigation: false,
    } : {
        spaceBetween: 30,
        slidesPerView: 3,
        centeredSlides: false,
        navigation: false,
    };

    if (!events || events.length === 0) {
        return (
            <div className={`events-slider ${className}`}>
                <div className="events-slider__debug">
                    No events available
                </div>
            </div>
        );
    }

    return (
        <div className={`events-slider ${className} ${isMobile ? 'events-slider--mobile' : ''}`}>
            <div className="events-slider__container">
                {!isMobile && (
                    <>
                        <button
                            className={`events-slider__arrow events-slider__arrow--prev ${
                                isBeginning ? 'events-slider__arrow--hidden' : ''
                            }`}
                            onClick={() => swiperRef.current?.slidePrev()}
                            disabled={isBeginning}
                        >
                        </button>

                        <button
                            className={`events-slider__arrow events-slider__arrow--next ${
                                isEnd ? 'events-slider__arrow--hidden' : ''
                            }`}
                            onClick={() => swiperRef.current?.slideNext()}
                            disabled={isEnd}
                        >
                        </button>
                    </>
                )}

                <div className="events-slider__wrapper">
                    <Swiper
                        modules={[Navigation]}
                        {...swiperConfig}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            updateNavigationState(swiper);
                        }}
                        onSlideChange={(swiper) => {
                            updateNavigationState(swiper);
                        }}
                        onReachBeginning={() => setIsBeginning(true)}
                        onReachEnd={() => setIsEnd(true)}
                        onFromEdge={() => {
                            setIsBeginning(false);
                            setIsEnd(false);
                        }}
                    >
                        {events.map((event) => (
                            <SwiperSlide key={event.id}>
                                <div className="event-card">
                                    <div className="event-card__year">{event.year}</div>
                                    <div className="event-card__content">{event.content}</div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};