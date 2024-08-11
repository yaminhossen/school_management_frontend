import React from 'react';
import Layout from './Layout';
import Index from '../Index';
import Details from '../page/Details';
import Student from '../page/studentDetails';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: 'students',
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
            path: 'single/student',
            element: <Student />,
        },
    ],
};
