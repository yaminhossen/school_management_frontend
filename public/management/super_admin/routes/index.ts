import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import user_admins_routes from "../views/pages/user_management/user_admins/config/routes";
import branches_routes from "../views/pages/branch_management/branches/config/routes";

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
            branches_routes,
        ],
    },
];

export default router;
