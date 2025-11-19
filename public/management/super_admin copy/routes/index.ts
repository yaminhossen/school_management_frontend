import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import user_admins_routes from "../views/pages/user_management/user_admins/config/routes";
import user_staffs_routes from "../views/pages/user_management/user_staffs/config/routes";
import user_teachers_routes from "../views/pages/user_management/user_teachers/config/routes";
import user_students_routes from "../views/pages/user_management/user_students/config/routes";
import branches_routes from "../views/pages/branch_management/branches/config/routes";
import settings_routes from "../views/pages/settings/config/routes";

interface RouteTypes extends NonIndexRouteObject {
    
}
const router: RouteTypes[] = [
    {
        path: '/',
        element: <DashboardLayout/>,
        children: [
            {
                path: '',
                element: <T1/>
            },
            user_admins_routes,
            user_staffs_routes,
            user_teachers_routes,
            branches_routes,
            settings_routes,
            user_students_routes,
        ],
    },
];

export default router;
