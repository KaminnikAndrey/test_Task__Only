import { TimePeriod } from '../types';

// Функция для вычисления min и max годов событий
const calculateEventYears = (events: { year: number }[]) => {
    const years = events.map(event => event.year);
    return {
        minEventYear: Math.min(...years),
        maxEventYear: Math.max(...years)
    };
};

export const timelineData: TimePeriod[] = [
    {
        id: 1,
        name: 'ПК',
        startYear: 1981,
        endYear: 1989,
        events: [
            {
                id: 1,
                year: 1981,
                content: 'IBM выпускает IBM PC, который становится стандартом для персональных компьютеров',
                periodId: 1,
            },
            {
                id: 2,
                year: 1982,
                content: 'Time magazine называет компьютер "Машиной года"',
                periodId: 1,
            },
            {
                id: 3,
                year: 1984,
                content: 'Apple представляет Macintosh с графическим интерфейсом',
                periodId: 1,
            },
            {
                id: 4,
                year: 1985,
                content: 'Microsoft выпускает Windows 1.0',
                periodId: 1,
            },
            {
                id: 5,
                year: 1987,
                content: 'Появление технологии CD-ROM',
                periodId: 1,
            },
            {
                id: 6,
                year: 1989,
                content: 'Тим Бернерс-Ли предлагает концепцию Всемирной паутины',
                periodId: 1,
            },
        ],
        ...calculateEventYears([
            { year: 1981 }, { year: 1982 }, { year: 1984 },
            { year: 1985 }, { year: 1987 }, { year: 1989 }
        ])
    },
    {
        id: 2,
        name: 'Интернет',
        startYear: 1991,
        endYear: 1999,
        events: [
            {
                id: 7,
                year: 1991,
                content: 'Запуск первого в мире веб-сайта info.cern.ch',
                periodId: 2,
            },
            {
                id: 8,
                year: 1993,
                content: 'Выпуск первого графического браузера Mosaic',
                periodId: 2,
            },
            {
                id: 9,
                year: 1994,
                content: 'Основание компании Amazon Джеффом Безосом',
                periodId: 2,
            },
            {
                id: 10,
                year: 1995,
                content: 'Microsoft выпускает Windows 95 с браузером Internet Explorer',
                periodId: 2,
            },
            {
                id: 11,
                year: 1998,
                content: 'Основание Google Ларри Пейджем и Сергеем Брином',
                periodId: 2,
            },
            {
                id: 12,
                year: 1999,
                content: 'Появление Wi-Fi технологии и основание Napster',
                periodId: 2,
            },
        ],
        ...calculateEventYears([
            { year: 1991 }, { year: 1993 }, { year: 1994 },
            { year: 1995 }, { year: 1998 }, { year: 1999 }
        ])
    },
    {
        id: 3,
        name: 'Мобильные',
        startYear: 2001,
        endYear: 2009,
        events: [
            {
                id: 13,
                year: 2001,
                content: 'Запуск свободной энциклопедии Wikipedia',
                periodId: 3,
            },
            {
                id: 14,
                year: 2003,
                content: 'Запуск Skype для голосовой связи через интернет',
                periodId: 3,
            },
            {
                id: 15,
                year: 2004,
                content: 'Марк Цукерберг запускает Facebook в Гарварде',
                periodId: 3,
            },
            {
                id: 16,
                year: 2005,
                content: 'Создание YouTube и запуск Reddit',
                periodId: 3,
            },
            {
                id: 17,
                year: 2007,
                content: 'Apple представляет первый iPhone, меняя индустрию смартфонов',
                periodId: 3,
            },
            {
                id: 18,
                year: 2009,
                content: 'Запуск Bitcoin - первой криптовалюты',
                periodId: 3,
            },
        ],
        ...calculateEventYears([
            { year: 2001 }, { year: 2003 }, { year: 2004 },
            { year: 2005 }, { year: 2007 }, { year: 2009 }
        ])
    },
    {
        id: 4,
        name: 'Соцсети',
        startYear: 2010,
        endYear: 2014,
        events: [
            {
                id: 19,
                year: 2010,
                content: 'Запуск Instagram, платформы для обмена фото и видео',
                periodId: 4,
            },
            {
                id: 20,
                year: 2011,
                content: 'Появление Snapchat с исчезающими сообщениями',
                periodId: 4,
            },
            {
                id: 21,
                year: 2012,
                content: 'Facebook выпускает библиотеку React.js',
                periodId: 4,
            },
            {
                id: 22,
                year: 2013,
                content: 'Запуск Telegram мессенджера и Pokemon Go',
                periodId: 4,
            },
            {
                id: 23,
                year: 2014,
                content: 'Microsoft приобретает Minecraft за 2.5 миллиарда долларов',
                periodId: 4,
            },
            {
                id: 24,
                year: 2014,
                content: 'Apple представляет Apple Pay систему мобильных платежей',
                periodId: 4,
            },
        ],
        ...calculateEventYears([
            { year: 2010 }, { year: 2011 }, { year: 2012 },
            { year: 2013 }, { year: 2014 }, { year: 2014 }
        ])
    },
    {
        id: 5,
        name: 'ИИ',
        startYear: 2014,
        endYear: 2019,
        events: [
            {
                id: 25,
                year: 2015,
                content: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
                periodId: 5,
            },
            {
                id: 26,
                year: 2016,
                content: 'ИИ AlphaGo побеждает чемпиона мира в игре Го',
                periodId: 5,
            },
            {
                id: 27,
                year: 2017,
                content: 'Google представляет архитектуру Transformer, основу для современных языковых моделей',
                periodId: 5,
            },
            {
                id: 28,
                year: 2018,
                content: 'OpenAI выпускает первую версию GPT (Generative Pre-trained Transformer)',
                periodId: 5,
            },
            {
                id: 29,
                year: 2018,
                content: 'Европейский Союз вводит GDPR - защиту персональных данных',
                periodId: 5,
            },
            {
                id: 30,
                year: 2019,
                content: 'DeepMind создает AlphaStar, ИИ для игры в StarCraft II',
                periodId: 5,
            },
        ],
        ...calculateEventYears([
            { year: 2015 }, { year: 2016 }, { year: 2017 },
            { year: 2018 }, { year: 2018 }, { year: 2019 }
        ])
    },
    {
        id: 6,
        name: 'Наука',
        startYear: 2015,
        endYear: 2022,
        events: [
            {
                id: 31,
                year: 2015,
                content: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
                periodId: 6,
            },
            {
                id: 32,
                year: 2016,
                content: 'Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11',
                periodId: 6,
            },
            {
                id: 33,
                year: 2017,
                content: 'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
                periodId: 6,
            },
            {
                id: 34,
                year: 2018,
                content: 'ИИ DALL-E 2 создает изображения по текстовым описаниям',
                periodId: 6,
            },
            {
                id: 35,
                year: 2019,
                content: 'Выпуск GPT-4 с улучшенными возможностями и мультимодальностью',
                periodId: 6,
            },
            {
                id: 36,
                year: 2021,
                content: 'Развитие квантовых вычислений и ИИ в научных исследованиях',
                periodId: 6,
            },
        ],
        ...calculateEventYears([
            { year: 2020 }, { year: 2021 }, { year: 2022 },
            { year: 2022 }, { year: 2023 }, { year: 2024 }
        ])
    },
];