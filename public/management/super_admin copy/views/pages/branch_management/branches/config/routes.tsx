import React from 'react';
import setup from './setup.ts';
import Layout from '../Layout.tsx';
import All from '../All.jsx';
import Create from '../Create.jsx';
import Details from '../Details.jsx';
import Edit from '../Edit.jsx';
// import Class from '../../../class_management/branch_classes/All.tsx';
import BranchInformation from '../pages/BranchInformation.tsx';

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
                    path: 'branch-informatin',
                    element: <BranchInformation />,
                },
                // {
                //     path: 'class',
                //     element: <Class />,
                // },
            ],
        },
    ],
};
