import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import user_branch_staff_routes from '../views/pages/users/config/routes';
import React from 'react';
import profile_routes from '../views/pages/profile/config/routes';
import childrens_routes from '../views/pages/childrens/config/routes';

interface RouteTypes extends NonIndexRouteObject {}
const router: RouteTypes[] = [
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            profile_routes,
            childrens_routes,
            {
                path: '',
                element: <T1 />,
            },
            user_branch_staff_routes,
        ],
    },
];

export default router;
