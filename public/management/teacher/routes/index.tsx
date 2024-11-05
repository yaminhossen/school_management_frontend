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

import profile_routes from '../views/pages/profile/config/routes';
import class_routine_routes from '../views/pages/class_routine/config/routes';
import exam_routine_routes from '../views/pages/exam_routine/config/routes';
import result_routes from '../views/pages/result/config/routes';
import attendance_routes from '../views/pages/attendance/config/routes';
import leave_application_routes from '../views/pages/leave_application/config/routes';
import notices_routes from '../views/pages/notices/config/routes';
import academic_resources_routes from '../views/pages/academic_resources/config/routes';
import hall_guard_routine_routes from '../views/pages/hall_guard_routine/config/routes';
import class_attendance_routes from '../views/pages/class_attendance/config/routes';
import assignment_routes from '../views/pages/assignment/config/routes';
import assignment_marking_routes from '../views/pages/assignment_marking/config/routes';
import student_routes from '../views/pages/student/config/routes';
import course_materials_routes from '../views/pages/course_materials/config/routes';
import reports_routes from '../views/pages/teacher_reports/config/routes';

interface RouteTypes extends NonIndexRouteObject {}
const router: RouteTypes[] = [
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            profile_routes,
            class_routine_routes,
            exam_routine_routes,
            result_routes,
            attendance_routes,
            leave_application_routes,
            notices_routes,
            academic_resources_routes,
            hall_guard_routine_routes,
            class_attendance_routes,
            assignment_routes,
            assignment_marking_routes,
            student_routes,
            course_materials_routes,
            reports_routes,
            {
                path: '',
                element: <T1 />,
            },
            {
                path: 'classes',
                element: <Class />,
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
                path: 'my-activities',
                element: <MyActivities />,
            },
            user_branch_staff_routes,
        ],
    },
];

export default router;
