import { FastifyInstance } from 'fastify';
const AutoLoad = require('@fastify/autoload');
import path from 'path';
let appDir: string = path.resolve(path.dirname(__dirname));

let routes: string[] = [
    'src/modules/academic_calendar_management/academic_calendars/routes.ts',
    'src/modules/academic_calendar_management/academic_calendar_event_types/routes.ts',

    'src/modules/accounts_management/accounts/routes.ts',
    'src/modules/accounts_management/account_categories/routes.ts',
    'src/modules/accounts_management/account_fees_collections/routes.ts',
    'src/modules/accounts_management/account_fees_collection_details/routes.ts',
    'src/modules/accounts_management/account_logs/routes.ts',
    'src/modules/accounts_management/account_money_transfer_to_user/routes.ts',
    'src/modules/accounts_management/account_periods/routes.ts',
    'src/modules/accounts_management/account_vouchers/routes.ts',
    'src/modules/accounts_management/budgets/routes.ts',
    'src/modules/accounts_management/investors/routes.ts',

    'src/modules/asset_management/assets/routes.ts',
    'src/modules/asset_management/asset_audits/routes.ts',
    'src/modules/asset_management/asset_audit_items/routes.ts',
    'src/modules/asset_management/asset_categories/routes.ts',
    'src/modules/asset_management/asset_depreciations/routes.ts',
    'src/modules/asset_management/asset_types/routes.ts',

    'src/modules/assignment_management/assignments/routes.ts',
    'src/modules/assignment_management/assignment_categorys/routes.ts',
    'src/modules/assignment_management/assignment_submission/routes.ts',
    'src/modules/attendance_management/leave_applications/routes.ts',
    'src/modules/attendance_management/leave_application_paids/routes.ts',
    'src/modules/attendance_management/leave_types/routes.ts',
    'src/modules/attendance_management/staff_attendances/routes.ts',
    'src/modules/attendance_management/student_attendances/routes.ts',
    'src/modules/attendance_management/teacher_attendances/routes.ts',

    'src/modules/auth_management/authetication/routes.ts',
    'src/modules/auth_management/user_management/routes.ts',

    'src/modules/branch_management/branches/routes.ts',
    'src/modules/branch_management/branch_admin/routes.ts',
    'src/modules/branch_management/branch_buildings/routes.ts',
    'src/modules/branch_management/branch_building_rooms/routes.ts',
    'src/modules/branch_management/branch_building_room_beds/routes.ts',
    'src/modules/branch_management/branch_contacts/routes.ts',
    'src/modules/branch_management/branch_informations/routes.ts',
    'src/modules/branch_management/branch_transports/routes.ts',
    'src/modules/branch_management/branch_transport_drivers/routes.ts',

    'src/modules/class_course_schedule_management/class_course_schedules/routes.ts',
    'src/modules/class_course_schedule_management/class_course_schedule_attachements/routes.ts',
    'src/modules/class_course_schedule_management/class_course_schedule_images/routes.ts',

    'src/modules/class_management/branch_classes/routes.ts',
    'src/modules/class_management/branch_class_fees/routes.ts',
    'src/modules/class_management/branch_class_fee_discounts/routes.ts',
    'src/modules/class_management/branch_class_fee_types/routes.ts',
    'src/modules/class_management/branch_class_fee_waivers/routes.ts',
    'src/modules/class_management/branch_class_resources/routes.ts',
    'src/modules/class_management/branch_class_routin_day_times/routes.ts',
    'src/modules/class_management/branch_class_sections/routes.ts',
    'src/modules/class_management/branch_class_subjects/routes.ts',

    'src/modules/employee_salary_management/branch_employee_job_pay_grades/routes.ts',
    'src/modules/employee_salary_management/branch_employee_job_positions/routes.ts',
    'src/modules/employee_salary_management/branch_employee_payroll_transactions/routes.ts',
    'src/modules/employee_salary_management/branch_employee_salaries/routes.ts',
    'src/modules/employee_salary_management/branch_employee_salary_types/routes.ts',

    'src/modules/exam_management/exams/routes.ts',
    'src/modules/exam_management/exam_attendent_students/routes.ts',
    'src/modules/exam_management/exam_equipments/routes.ts',
    'src/modules/exam_management/exam_equipment_selecteds/routes.ts',
    'src/modules/exam_management/exam_equipment_sent_to_branches/routes.ts',
    'src/modules/exam_management/exam_hall_guard_plans/routes.ts',
    'src/modules/exam_management/exam_preparation_reports/routes.ts',
    'src/modules/exam_management/exam_routines/routes.ts',
    'src/modules/exam_management/exam_seat_plans/routes.ts',
    'src/modules/exam_management/exam_students/routes.ts',
    'src/modules/exam_management/exam_student_marks/routes.ts',

    'src/modules/exam_paper_management/exam_paper_designs/routes.ts',
    'src/modules/exam_paper_management/exam_paper_design_orders/routes.ts',

    'src/modules/loan_management/loan_applications/routes.ts',
    'src/modules/loan_management/loan_payments/routes.ts',
    'src/modules/loan_management/loan_types/routes.ts',

    'src/modules/meeting_management/meetings/routes.ts',
    'src/modules/meeting_management/meeting_agendas/routes.ts',
    'src/modules/meeting_management/meeting_attachments/routes.ts',

    'src/modules/notice_management/notices/routes.ts',
    'src/modules/notice_management/notice_categorys/routes.ts',

    'src/modules/personal_calendar_schedule_management/personal_calendar_schedule/routes.ts',

    'src/modules/student_evaluation_management/student_evaluation/routes.ts',
    'src/modules/student_evaluation_management/student_evaluation_criterias/routes.ts',
    'src/modules/student_evaluation_management/student_overall_evaluations/routes.ts',

    'src/modules/teacher_evaluations/teacher_evaluations/routes.ts',
    'src/modules/teacher_evaluations/teacher_evaluation_criterias/routes.ts',
    'src/modules/teacher_evaluations/teacher_kpi_reports/routes.ts',
    'src/modules/teacher_evaluations/teacher_overall_evaluations/routes.ts',

    'src/modules/todo_management/tasks/routes.ts',
    'src/modules/todo_management/task_groups/routes.ts',
    'src/modules/todo_management/task_variants/routes.ts',
    'src/modules/user_management/user_admin/routes.ts',
    'src/modules/user_management/user_branch_admins/routes.ts',
    'src/modules/user_management/user_login_histories/routes.ts',
    'src/modules/user_management/user_parents/routes.ts',
    'src/modules/user_management/user_staffs/routes.ts',
    'src/modules/user_management/user_students/routes.ts',
    'src/modules/user_management/user_teachers/routes.ts',
];

function register_all_routes(fastify: FastifyInstance) {
    // require(path.resolve(appDir, routes)
    // fastify.register(AutoLoad, {
    fastify.register(
        require(
            path.resolve(
                appDir,
                'src/modules/user_management/user_students/routes.ts',
            ),
        ),
        {
            prefix: 'api/v1',
        },
    );
}

export default register_all_routes;