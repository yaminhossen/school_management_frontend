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
import branch_class_routine_day_times_routes from "../views/pages/class_management/branch_class_routine_day_times/config/routes";
import branch_class_resources_routes from "../views/pages/class_management/branch_class_resources/config/routes";
import branch_class_subjects_routes from "../views/pages/class_management/branch_class_subjects/config/routes";
import meeting_agendas_routes from "../views/pages/meeting_management/meeting_agendas/config/routes";
import meetings_routes from "../views/pages/meeting_management/meetings/config/routes";
import fees_collections_routes from "../views/pages/account_management/fees_collection/config/routes";
import journals_routes from "../views/pages/account_management/journal/config/routes";
import debit_routes from "../views/pages/account_management/debit/config/routes";
import credit_routes from "../views/pages/account_management/credit/config/routes";
import profit_and_loss_routes from "../views/pages/account_management/profit_loss/config/routes";
import month_wise_statement_routes from "../views/pages/account_management/month_wise_statement/config/routes";
// import journals_routes from "../views/pages/account_management/journals/config/routes";
import loan_managements_routes from "../views/pages/account_management/loan_managements/config/routes";
import payrolls_routes from "../views/pages/account_management/payrolls/config/routes";
import salary_payments_routes from "../views/pages/account_management/salary_payments/config/routes";
import academic_calendars_routes from "../views/pages/calendar_management/academic_calendars/config/routes";
import academic_calendar_event_types_routes from "../views/pages/calendar_management/academic_calendar_event_types/config/routes";
import tasks_routes from "../views/pages/todo_management/tasks/config/routes";
import task_variants_routes from "../views/pages/todo_management/task_variants/config/routes";
import task_groups_routes from "../views/pages/todo_management/task_groups/config/routes";
import branch_class_sections_routes from "../views/pages/class_management/branch_class_sections/config/routes";
import accounts_routes from "../views/pages/account_management/account/config/routes";
import account_periods_routes from "../views/pages/account_management/account_periods/config/routes";
import account_categories_routes from "../views/pages/account_management/account_categories/config/routes";

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
            branch_class_routine_day_times_routes,
            branch_class_subjects_routes,
            branch_class_resources_routes,
            meeting_agendas_routes,
            meetings_routes,
            fees_collections_routes,
            // journals_routes,
            loan_managements_routes,
            payrolls_routes,
            salary_payments_routes,
            academic_calendars_routes,
            academic_calendar_event_types_routes,
            tasks_routes,
            task_variants_routes,
            task_groups_routes,
            branch_class_sections_routes,
            accounts_routes,
            account_periods_routes,
            account_categories_routes,
            journals_routes,
            debit_routes,
            credit_routes,
            profit_and_loss_routes,
            month_wise_statement_routes,
        ],
    },
];

export default router;
