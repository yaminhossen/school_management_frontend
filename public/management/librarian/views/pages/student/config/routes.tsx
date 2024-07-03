import React from 'react';
import Layout from './Layout';
import Index from '../Index';
import Details from '../pages/Students';
import SingleStudent from '../pages/SingleStudent';
import Review from '../pages/Review';
import Complain from '../pages/Complain';

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
            path: 'details',
            element: <Details />,
        },
        {
            path: 'single-student',
            element: <SingleStudent />,
        },
        {
            path: 'review',
            element: <Review />,
        },
        {
            path: 'complain',
            element: <Complain />,
        },
    ],
};
