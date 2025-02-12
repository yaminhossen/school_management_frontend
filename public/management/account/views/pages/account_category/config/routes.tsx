import React from 'react';
import Layout from './Layout';
import Index from '../Index';
import Create from '../page/CategoryCreate';
import Details from '../page/Details';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: 'account-category',
    element: <Layout />,
    children: [
        {
            path: '',
            index: true,
            element: <Index />,
        },
        {
            path: 'create',
            element: <Create />,
        },
        {
            path: 'details/:id',
            element: <Details />,
        },
    ],
};
