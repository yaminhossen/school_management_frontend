import React from 'react';
import Layout from './Layout';
import Index from '../Index';
import Resources from '../pages/Resources';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: 'academic-resources',
    element: <Layout />,
    children: [
        {
            path: '',
            index: true,
            element: <Index />,
        },
        {
            path: 'details/:id',
            element: <Resources />,
        },
    ],
};
