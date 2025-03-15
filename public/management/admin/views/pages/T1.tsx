import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}
const menuArray = [
    {
        group: 'User management',
        links: [
            {
                link: '/admin#/user-staffs',
                label: 'Employee',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/user-teachers',
                label: 'Teacher',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/user-parents',
                label: 'Parent',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/user-students',
                label: 'Student',
                icon: 'manage_accounts',
            },
        ],
    },
    {
        group: 'Todo management',
        links: [
            {
                link: '/admin#/tasks',
                label: 'Task',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/task-variants',
                label: 'Variant',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/task-groups',
                label: 'Group',
                icon: 'manage_accounts',
            },
        ],
    },
    {
        group: 'Branch management',
        links: [
            {
                link: '/admin#/staffs',
                label: 'Branch',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/staffs',
                label: 'Building',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/staffs',
                label: 'Room',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/staffs',
                label: 'Transport',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/staffs',
                label: 'Driver',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/staffs',
                label: 'Calendar',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/staffs',
                label: 'Event Type',
                icon: 'manage_accounts',
            },
        ],
    },
    {
        group: 'Academic management',
        links: [
            {
                link: '/admin#/branch-classes',
                label: 'Class',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/branch-class-sections',
                label: 'Sections',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/branch-class-subjects',
                label: 'Subject',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/branch-class-routine-day-times/class-routine',
                label: 'Routines',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/branch-class-resources',
                label: 'Resources',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/exams',
                label: 'Exam',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/exams-routines',
                label: 'Exam Routine',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/student-overall-evaluations',
                label: 'Student Evaluation',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/student-evaluation-criterias',
                label: 'Student Evaluation Criteria',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/teacher-overall-evaluations',
                label: 'Teacher Evaluation',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/teacher-evaluation-criterias',
                label: 'Teacher Evaluation Criteria',
                icon: 'manage_accounts',
            },
        ],
    },
    {
        group: 'Fees management',
        links: [
            {
                link: '/admin#/branch-class-fee-types',
                label: 'Fee Types',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/branch-class-fees',
                label: 'Fees',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/branch-class-fee-discounts',
                label: 'Discount',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/branch-class-fee-waivers',
                label: 'Waivers',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/fees-collection',
                label: 'Fee Collection',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/staffs',
                label: 'Due-list',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/staffs',
                label: 'Payment History',
                icon: 'manage_accounts',
            },
        ],
    },
    {
        group: 'Meeting management',
        links: [
            {
                link: '/admin#/meeting',
                label: 'Meetings',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/meeting-agendas',
                label: 'Agendas',
                icon: 'manage_accounts',
            },
        ],
    },
    {
        group: 'Account management',
        links: [
            {
                link: '/admin#/accounts',
                label: 'Account',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/account-periods',
                label: 'Period',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/account-categories',
                label: 'Category',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/leadger',
                label: 'Leadger',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/journal',
                label: 'Journal',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/debit',
                label: 'Debit',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/credit',
                label: 'Credit',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/profit-loss',
                label: 'Profit&Loss',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/month-wise-statement',
                label: 'Month wise',
                icon: 'manage_accounts',
            },
        ],
    },
    {
        group: 'HRM management',
        links: [
            {
                link: '/admin#/user-staffs',
                label: 'Employee',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/user-teachers',
                label: 'Teacher',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/attendances',
                label: 'Attendances',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/payrolls',
                label: 'Payroll',
                icon: 'manage_accounts',
            },
        ],
    },
    {
        group: 'Notice management',
        links: [
            {
                link: '/admin#/notices',
                label: 'Notice',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/notice-categorys',
                label: 'Category',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/faqs',
                label: 'FAQ',
                icon: 'manage_accounts',
            },
            {
                link: '/admin#/settings',
                label: 'Settings',
                icon: 'manage_accounts',
            },
            // {
            //     link: '/admin#/branch-class-fees',
            //     label: 'App',
            //     icon: 'manage_accounts',
            // },
        ],
    },
];

const T1: React.FC<Props> = (props: Props) => {
    return (
        <div className="admin_dashboard">
            <h1>Nurul Hiqamah Model Madrasa</h1>
            <h2>Admin Dashboard</h2>
            <div className="menu_list custom_scroll">
                {/* {menuArray?.map((i: { [key: string]: any }) => {
                    return (
                        <div className="menu_apart">
                            <h4>{i.group}</h4>
                            <ul>
                                {i.links?.map(
                                    (
                                        link: {
                                            [key: string]: any;
                                        },
                                        index,
                                    ) => {
                                        return (
                                            <li>
                                                <a
                                                    aria-current="page"
                                                    href={link.link}
                                                    className="router-link-active router-link-exact-active"
                                                >
                                                    <div
                                                        className={`icon bg_color_${index + 1}`}
                                                    >
                                                        <span className="material-symbols-outlined fill">
                                                            {link.icon}
                                                        </span>
                                                    </div>
                                                    <div className="text">
                                                        {link.label}
                                                    </div>
                                                </a>
                                            </li>
                                        );
                                    },
                                )}
                            </ul>
                        </div>
                    );
                })} */}
                <h3 className="mt-4 ms-0">User management</h3>
                <ul className="dashboard_links ">
                    <li>
                        <Link to="/user-staffs">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Employee Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/user-teachers">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Teachers Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/user-parents">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Parents Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/user-students">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Students Management
                        </Link>
                    </li>
                </ul>

                <h3 className="mt-4 ms-0">Todo management</h3>
                <ul className="dashboard_links ">
                    <li>
                        <Link to="/tasks">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Tasks Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/task-variants">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Task Variants Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/task-groups">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Task Groups Management
                        </Link>
                    </li>
                </ul>

                <h3 className="mt-4 ms-0">Branch management</h3>
                <ul className="dashboard_links ">
                    <li>
                        <Link to="/branches">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            branches Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-buildings">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            branch Buildings Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-building-rooms">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Branch Building Rooms Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-transports">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Branch Transports Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-transport-drivers">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Branch Transport Drivers Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/academic-calendars">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Academic Calendars Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/academic-calendar-event-types">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Academic Calendar Event Type Management
                        </Link>
                    </li>
                </ul>

                <h3 className="mt-4 ms-0">Academic management</h3>
                <ul className="dashboard_links ">
                    <li>
                        <Link to="/branch-classes">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Classes
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-sections">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Class Section
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-subjects">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Class Subjects
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-routine-day-times/class-routine">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Class Routine At A Glanc
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-resources">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Class Resources
                        </Link>
                    </li>
                    <li>
                        <Link to="/exams">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Exam Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/exam-routines">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Exam Routine Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/student-overall-evaluations">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Student Overall Evaluation
                        </Link>
                    </li>
                    <li>
                        <Link to="/student-evaluation-criterias">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Student Evaluation Criteria
                        </Link>
                    </li>
                    <li>
                        <Link to="/teacher-overall-evaluations">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Teacher Overall Evaluation
                        </Link>
                    </li>
                    <li>
                        <Link to="/teacher-evaluation-criterias">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Teacher Evaluation Criteria
                        </Link>
                    </li>
                </ul>

                <h3 className="mt-4 ms-0">Fees management</h3>
                <ul className="dashboard_links ">
                    <li>
                        <Link to="/branch-class-fee-types">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Class Fee types
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-fees">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Class Fees
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-fee-discounts">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Class Fee Discounts
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-fee-waivers">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Class Fee Waivers
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/fees-collection">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Fees Collections
                        </Link>
                    </li> */}
                    <li>
                        <Link to="/user-students">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Due List
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-fee-types">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Payment History
                        </Link>
                    </li>
                </ul>

                <h3 className="mt-4 ms-0">Meeting management</h3>
                <ul className="dashboard_links ">
                    <li>
                        <Link to="/meeting">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Meetings Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/meeting-agendas">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Meeting Agendas Management
                        </Link>
                    </li>
                </ul>

                <h3 className="mt-4 ms-0">Account management</h3>
                <ul className="dashboard_links ">
                    <li>
                        <Link to="/accounts">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Accoutn Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/account-periods">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Account period Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/account-categories">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Account category Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/leadger">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Leadger
                        </Link>
                    </li>
                    <li>
                        <Link to="/journal">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Journal
                        </Link>
                    </li>
                    <li>
                        <Link to="/debit">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Debit
                        </Link>
                    </li>
                    <li>
                        <Link to="/credit">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Credit
                        </Link>
                    </li>
                    <li>
                        <Link to="/profit-loss">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Profit And Loss
                        </Link>
                    </li>
                    <li>
                        <Link to="/month-wise-statement">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Month Wise Statement
                        </Link>
                    </li>
                </ul>

                <h3 className="mt-4 ms-0">HRM management</h3>
                <ul className="dashboard_links ">
                    <li>
                        <Link to="/user-staffs">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Employee Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/user-teachers">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Teachers Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/fees-collections">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Attendances Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/journals">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Payroll Management
                        </Link>
                    </li>
                </ul>

                <h3 className="mt-4 ms-0">Notice management</h3>
                <ul className="dashboard_links ">
                    <li>
                        <Link to="/notices">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Notice Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/notice-categorys">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Notice Category Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/faqs">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            FAQ Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/policies">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Policy Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Settings Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/app-settings">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            App Management
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default T1;
