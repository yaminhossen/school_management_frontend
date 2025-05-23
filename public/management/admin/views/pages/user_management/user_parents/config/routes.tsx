import React from 'react';
import setup from './setup.ts';
import Layout from '../Layout.tsx';
import All from '../All.jsx';
import Create from '../Create.jsx';
import Details from '../Details.jsx';
import Edit from '../Edit.jsx';
import BasicInformation from '../pages/BasicInformation.tsx';
import Payments from '../pages/Payments.tsx';
import Dues from '../pages/Dues.tsx';
import AllChildren from '../pages/AllChildren.tsx';
import Children from '../pages/Children.tsx';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: setup.route_prefix,
    element: <Layout />,
    children: [
        {
            path: '',
            element: <All />,
        },
        {
            path: 'create',
            element: <Create />,
        },
        {
            path: 'edit/:id',
            element: <Edit />,
        },
        {
            path: 'details/:id',
            element: <Details />,
            children: [
                {
                    path: '',
                    element: <BasicInformation />,
                },
                {
                    path: 'information',
                    element: <BasicInformation />,
                },
                // {
                //     path: 'payment',
                //     element: <Payments />,
                // },
                {
                    path: 'childrens',
                    element: <AllChildren />,
                },
                // {
                //     path: 'children',
                //     element: <Children />,
                // },
                // {
                //     path: 'due',
                //     element: <Dues />,
                // },
            ],
        },
    ],
};
