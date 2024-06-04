import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import user_branch_staff_routes from "../views/pages/user_management/user_branch_staff/config/routes";
import user_admins_routes from "../views/pages/user_management/user_admins/config/routes";
import user_staffs_routes from "../views/pages/user_management/user_staffs/config/routes";
import user_teachers_routes from "../views/pages/user_management/user_teachers/config/routes";
import user_parents_routes from "../views/pages/user_management/user_parents/config/routes";
import user_students_routes from "../views/pages/user_management/user_students/config/routes";
import user_branch_admins_routes from "../views/pages/user_management/user_branch_admins/config/routes";
import branches_routes from "../views/pages/branch_management/branches/config/routes";
import branch_buildings_routes from "../views/pages/branch_management/branch_buildings/config/routes";
import branch_building_rooms_routes from "../views/pages/branch_management/branch_building_rooms/config/routes";
import branch_transports_routes from "../views/pages/branch_management/branch_transports/config/routes";
import branch_transport_drivers_routes from "../views/pages/branch_management/branch_transport_drivers/config/routes";
import branch_classes_routes from "../views/pages/class_management/branch_classes/config/routes";
import branch_class_fee_types_routes from "../views/pages/class_management/branch_class_fee_types/config/routes";
import branch_class_fee_discounts_routes from "../views/pages/class_management/branch_class_fee_discounts/config/routes";
import branch_class_fee_waivers_routes from "../views/pages/class_management/branch_class_fee_waivers/config/routes";
import branch_class_fees_routes from "../views/pages/class_management/branch_class_fees/config/routes";

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
            user_parents_routes,
            user_students_routes,
            user_branch_admins_routes,
            branches_routes,
            branch_buildings_routes,
            branch_building_rooms_routes,
            branch_transports_routes,
            branch_transport_drivers_routes,
            branch_classes_routes,
            branch_class_fee_types_routes,
            branch_class_fee_discounts_routes,
            branch_class_fee_waivers_routes,
            branch_class_fees_routes,
        ],
    },
];

export default router;
