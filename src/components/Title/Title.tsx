import React from 'react';
import './Title.scss';

export const Title: React.FC = () => {
    return (
        <div className={`title`}>
            <h1 className="title__text">Исторические даты</h1>
        </div>
    );
};