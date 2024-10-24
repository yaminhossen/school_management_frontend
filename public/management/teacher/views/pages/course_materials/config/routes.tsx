import React from 'react';
import Layout from './Layout';
import Index from '../Index';
import Materials from '../pages/Materials';
import CreateMaterials from '../pages/CreateMaterials';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: 'course-materials',
    element: <Layout />,
    children: [
        {
            path: '',
            index: true,
            element: <Index />,
        },
        {
            path: 'details',
            element: <Materials />,
        },
        {
            path: 'create-materials',
            element: <CreateMaterials />,
        },
    ],
};
