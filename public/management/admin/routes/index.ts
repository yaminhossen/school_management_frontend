import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import user_branch_staff_routes from "../views/pages/user_branch_staff/config/routes";
import user_admins_routes from "../views/pages/user_admins/config/routes";
import user_staffs_routes from "../views/pages/user_staffs/config/routes";
import user_teachers_routes from "../views/pages/user_teachers/config/routes";

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
            user_branch_staff_routes,
            user_admins_routes,
            user_staffs_routes,
            user_teachers_routes,
        ],
    },
];

export default router;
