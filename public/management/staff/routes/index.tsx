import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import React from 'react';

import profile_routes from '../views/pages/profile/config/routes';
import attendance_routes from '../views/pages/attendance/config/routes';
import leave_applications_routes from '../views/pages/leave_applications/config/routes';
import salary_report_routes from '../views/pages/salary_report/config/routes';
import reports_routes from '../views/pages/reports/config/routes';
import settings_routes from '../views/pages/settings/config/routes';
import tasks_routes from '../views/pages/tasks/config/routes';
import meeting_agendas_routes from '../views/pages/meeting_agendas/config/routes';
import notices_routes from '../views/pages/notices/config/routes';

interface RouteTypes extends NonIndexRouteObject {}
const router: RouteTypes[] = [
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            profile_routes,
            attendance_routes,
            leave_applications_routes,
            notices_routes,
            reports_routes,
            salary_report_routes,
            settings_routes,
            tasks_routes,
            meeting_agendas_routes,
            {
                path: '',
                element: <T1 />,
            },
        ],
    },
];

export default router;
