import React from 'react';
import Layout from './Layout';
import Index from '../Index';
import Result from '../Result';
import AssginResult from '../pages/AssignResult';
import Section from '../pages/Section';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: 'result',
    element: <Layout />,
    children: [
        {
            path: '',
            index: true,
            element: <Index />,
        },
        {
            path: 'details/:id',
            element: <Result />,
        },
        {
            path: 'section/:id',
            element: <Section />,
        },
        {
            path: 'assign-result',
            element: <AssginResult />,
        },
    ],
};
