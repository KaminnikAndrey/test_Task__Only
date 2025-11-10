import React from 'react';
import { Timeline } from './components/Timeline/Timeline';
import { EventsSlider } from './components/EventsSlider/EventsSlider';
import { Title } from './components/Title/Title';
import { timelineData } from './data/timelineData';
import './styles/globals.scss';

const AppContent: React.FC = () => {
    const [activePeriod, setActivePeriod] = React.useState<number>(5);
    const [isMobile, setIsMobile] = React.useState<boolean>(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 970);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handlePeriodChange = (periodIndex: number) => {
        setActivePeriod(periodIndex);
    };

    const currentPeriod = timelineData[activePeriod];

    return (
        <div className="container">
            <Title/>
            <Timeline
                periods={timelineData}
                onPeriodChange={handlePeriodChange}
                activePeriod={activePeriod}
                isMobile={isMobile}
            />
            <EventsSlider
                events={currentPeriod.events}
                isMobile={isMobile}
            />
        </div>
    );
};

export const App: React.FC = () => {
    return (
        <div className="app">
            <AppContent />
        </div>
    );
};