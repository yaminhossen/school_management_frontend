import React from 'react';
import Layout from './Layout';
import Index from '../Index';
import SingleStudent from '../pages/SingleStudent';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: 'childrens',
    element: <Layout />,
    children: [
        {
            path: '',
            index: true,
            element: <Index />,
        },
        {
            path: 'details',
            element: <SingleStudent />,
        },
    ],
};
