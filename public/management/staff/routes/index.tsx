import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import React from 'react';

import profile_routes from '../views/pages/profile/config/routes';
import attendance_routes from '../views/pages/attendance/config/routes';
import leave_application_routes from '../views/pages/leave_application/config/routes';
import notices_routes from '../views/pages/notices/config/routes';
import reports_routes from '../views/pages/teacher_reports/config/routes';

interface RouteTypes extends NonIndexRouteObject {}
const router: RouteTypes[] = [
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            profile_routes,
            attendance_routes,
            leave_application_routes,
            notices_routes,
            reports_routes,
            {
                path: '',
                element: <T1 />,
            },
        ],
    },
];

export default router;
