export interface TimelineEvent {
    id: number;
    year?: number;
    content: string;
    periodId: number;
}

export interface TimePeriod {
    id: number;
    name: string;
    startYear: number;
    endYear: number;
    events: TimelineEvent[];
}

export interface TimelineProps {
    periods: TimePeriod[];
    className?: string;
    activePeriod: number;
    onPeriodChange: (periodIndex: number) => void;
    isMobile: boolean
}