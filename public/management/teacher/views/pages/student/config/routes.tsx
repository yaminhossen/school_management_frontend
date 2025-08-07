import React from 'react';
import Layout from './Layout';
import Index from '../Index';
import Details from '../pages/Students';
import SingleStudent from '../pages/SingleStudent';
import Review from '../pages/Review';
import Complain from '../pages/Complain';
import Section from '../pages/Section';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: 'student',
    element: <Layout />,
    children: [
        {
            path: '',
            index: true,
            element: <Index />,
        },
        {
            path: 'details/:id',
            element: <Details />,
        },
        {
            path: 'section/:id',
            element: <Section />,
        },
        {
            path: 'single-student/:id',
            element: <SingleStudent />,
        },
        {
            path: 'review/:id',
            element: <Review />,
        },
        {
            path: 'complain/:id',
            element: <Complain />,
        },
    ],
};
