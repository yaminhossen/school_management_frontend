import React from 'react';
import Layout from './Layout';
import Index from '../Index';
import Details from '../Details';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: 'month-wise-statement',
    element: <Layout />,
    children: [
        {
            path: '',
            index: true,
            element: <Index />,
        },
        {
            path: 'details/:month',
            element: <Details />,
        },
    ],
};
