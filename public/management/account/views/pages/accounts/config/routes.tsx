import React from 'react';
import Layout from './Layout';
import Index from '../Index';
import Details from '../page/Details';
import Account from '../page/AccountCreate';
import AccountNumber from '../page/AccountNumber';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: 'accounts',
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
            path: 'create',
            element: <Account />,
        },
        {
            path: 'details/account-number',
            element: <AccountNumber />,
        },
    ],
};
