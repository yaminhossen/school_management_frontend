import React from 'react';
import Layout from './Layout';
import Index from '../Index';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: 'income-entry',
    element: <Layout />,
    children: [
        {
            path: '',
            index: true,
            element: <Index />,
        },
    ],
};
