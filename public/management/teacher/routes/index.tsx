import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import user_branch_staff_routes from '../views/pages/users/config/routes';
import React from 'react';
import Class from '../views/menu_pages/Class';
import ClassRoutine from '../views/menu_pages/ClassRoutine';
import Profile from '../views/menu_pages/Profile';
import ExamRoutine from '../views/menu_pages/ExamRoutine';
import MarkSheet from '../views/menu_pages/MarkSheet';
import Attendance from '../views/menu_pages/Attendance';
import Students from '../views/menu_pages/Students';
import Assignment from '../views/menu_pages/Assignment';
import CourseMaterial from '../views/menu_pages/CourseMaterial';
import Assesment from '../views/menu_pages/Assesment';
import Reports from '../views/menu_pages/reports';
import Settings from '../views/menu_pages/Settings';
import Analytics from '../views/menu_pages/Analytics';
import LeaveApplications from '../views/menu_pages/LeaveApplications';
import AcademicResources from '../views/menu_pages/AcademicResources';
import MyActivities from '../views/menu_pages/MyActivities';
import Notice from '../views/menu_pages/Notices';

interface RouteTypes extends NonIndexRouteObject {}
const router: RouteTypes[] = [
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: '',
                element: <T1 />,
            },
            {
                path: 'classes',
                element: <Class />,
            },
            {
                path: 'class-routine',
                element: <ClassRoutine />,
            },
            {
                path: 'exam-routines',
                element: <ExamRoutine />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'mark-sheet',
                element: <MarkSheet />,
            },
            {
                path: 'attendance',
                element: <Attendance />,
            },
            {
                path: 'students',
                element: <Students />,
            },
            {
                path: 'assignments',
                element: <Assignment />,
            },
            {
                path: 'course-materials',
                element: <CourseMaterial />,
            },
            {
                path: 'assesments',
                element: <Assesment />,
            },
            {
                path: 'reports',
                element: <Reports />,
            },
            {
                path: 'settings',
                element: <Settings />,
            },
            {
                path: 'analytics',
                element: <Analytics />,
            },
            {
                path: 'leave-applications',
                element: <LeaveApplications />,
            },
            {
                path: 'academic-resources',
                element: <AcademicResources />,
            },
            {
                path: 'my-activities',
                element: <MyActivities />,
            },
            {
                path: 'notices',
                element: <Notice />,
            },
            user_branch_staff_routes,
        ],
    },
];

export default router;
