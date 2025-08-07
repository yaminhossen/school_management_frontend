import React from 'react';
import Layout from './Layout';
import Index from '../Index';
import Details from '../Details';
import Review from '../pages/Review';
import SubjectDetails from '../pages/SubjectDetails';
import Section from '../pages/Section';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: 'assignments-marking',
    element: <Layout />,
    children: [
        {
            path: '',
            index: true,
            element: <Index />,
        },
        {
            path: 'class-details/:id',
            element: <Details />,
        },
        {
            path: 'section/:id',
            element: <Section />,
        },
        {
            path: 'single-subject/:id',
            element: <SubjectDetails />,
        },
        {
            path: 'review',
            element: <Review />,
        },
    ],
};
