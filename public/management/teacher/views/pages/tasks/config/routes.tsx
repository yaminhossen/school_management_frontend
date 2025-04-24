import React, { Children } from 'react';
import Layout from './Layout';
import Index from '../Index';
import Completed from '../page/Completed';
import Pending from '../page/Pending';
import Details from '../page/Details';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: 'tasks',
    element: <Layout />,
    children: [
        {
            path: '',
            element: <Index />,
            children: [
                {
                    index: true,
                    path: 'pending',
                    element: <Pending />,
                },
                {
                    path: 'completed',
                    element: <Completed />,
                },
            ],
        },
        {
            path: 'details/:id',
            element: <Details />,
        },
    ],
};
