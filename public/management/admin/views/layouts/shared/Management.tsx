import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const Management: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const toggler = useRef(null);
    function active_row() {
        console.log(toggler);
        if (toggler && toggler.current) {
            (toggler.current as HTMLElement).classList.toggle('active');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await axios.post('/api/v1/auth/logout');
            console.log('response123', response);
            // if(response.status)
        } catch (error) {
            setError(error);
        }
    };
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
                    link: '/admin#/staffs',
                    label: 'Employee',
                    icon: 'manage_accounts',
                },
                {
                    link: '/admin#/staffs',
                    label: 'Employee',
                    icon: 'manage_accounts',
                },
            ],
        },
        {
            group: 'user_management',
            links: [
                {
                    link: '/admin#/staffs',
                    label: 'Employee',
                    icon: 'manage_accounts',
                },
                {
                    link: '/admin#/staffs',
                    label: 'Employee',
                    icon: 'manage_accounts',
                },
            ],
        },
        {
            group: 'user_management',
            links: [
                {
                    link: '/admin#/staffs',
                    label: 'Employee',
                    icon: 'manage_accounts',
                },
                {
                    link: '/admin#/staffs',
                    label: 'Employee',
                    icon: 'manage_accounts',
                },
            ],
        },
    ];

    return (
        <>
            <li
                ref={toggler}
                className="icon_link_li app_drawar_link_li"
                onClick={active_row}
            >
                <a
                    href="menu"
                    onClick={(e) => e.preventDefault()}
                    className="navigation_link"
                >
                    <span className="material-symbols-outlined fill">
                        dashboard_customize
                    </span>
                </a>

                <div className="apps_list_drawer">
                    <div className="content">
                        <div className="top">
                            <div className="profile">
                                <div className="img">
                                    <img
                                        src="/assets/dashboard/images/avatar.png"
                                        alt=""
                                    />
                                </div>
                                <div className="profile_info">
                                    <h2>mr admin</h2>
                                    <h3>
                                        <span>admin</span>
                                    </h3>
                                </div>
                            </div>
                            <div className="action">
                                <ul>
                                    <li>
                                        <a href="#dashboard#">
                                            <span className="material-symbols-outlined fill">
                                                manage_accounts
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#dashboard#">
                                            <span className="material-symbols-outlined fill">
                                                settings
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <Link
                                            onClick={handleSubmit}
                                            to=""
                                            className="sidebar-header"
                                        >
                                            <span className="material-symbols-outlined fill">
                                                power_settings_new
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="search">
                            <input type="search" placeholder="search.." />
                        </div>
                        <div className="menu_list custom_scroll">
                            {menuArray?.map((i: { [key: string]: any }) => {
                                return (
                                    <div className="menu_apart">
                                        <h4>{i.group}</h4>
                                        <ul>
                                            {i.links?.map(
                                                (link: {
                                                    [key: string]: any;
                                                }) => {
                                                    return (
                                                        <li>
                                                            <a
                                                                aria-current="page"
                                                                href={link.link}
                                                                className="router-link-active router-link-exact-active"
                                                            >
                                                                <div className="icon bg_color_1">
                                                                    <span className="material-symbols-outlined fill">
                                                                        {
                                                                            link.icon
                                                                        }
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
                            })}
                        </div>
                        {/* <div className="menu_list custom_scroll">
                            <div className="menu_apart">
                                <h4>User Management</h4>
                                <ul>
                                    <li>
                                        <a
                                            aria-current="page"
                                            href="/admin#/user-staffs"
                                            className="router-link-active router-link-exact-active"
                                        >
                                            <div className="icon bg_color_1">
                                                <span className="material-symbols-outlined fill">
                                                    group
                                                </span>
                                            </div>
                                            <div className="text">Employee</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/admin#/user-teachers"
                                            className=""
                                        >
                                            <div className="icon bg_color_2">
                                                <span className="material-symbols-outlined fill">
                                                    group
                                                </span>
                                            </div>
                                            <div className="text">Teachers</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/admin#/user-parents"
                                            className=""
                                        >
                                            <div className="icon bg_color_3">
                                                <span className="material-symbols-outlined fill">
                                                    group
                                                </span>
                                            </div>
                                            <div className="text">Parents</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/admin#/user-students"
                                            className=""
                                        >
                                            <div className="icon bg_color_4">
                                                <span className="material-symbols-outlined fill">
                                                    group
                                                </span>
                                            </div>
                                            <div className="text">Students</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="menu_apart">
                                <h4>Todo Management</h4>
                                <ul>
                                    <li>
                                        <a href="#dashboard#">
                                            <div className="icon bg_color_3">
                                                <span className="material-symbols-outlined fill">
                                                    fact_check
                                                </span>
                                            </div>
                                            <div className="text">Task</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#dashboard#">
                                            <div className="icon bg_color_4">
                                                <span className="material-symbols-outlined fill">
                                                    calendar_month
                                                </span>
                                            </div>
                                            <div className="text">Variant</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#dashboard#">
                                            <div className="icon bg_color_5">
                                                <span className="material-symbols-outlined fill">
                                                    calculate
                                                </span>
                                            </div>
                                            <div className="text">Group</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#dashboard#">
                                            <div className="icon bg_color_6">
                                                <span className="material-symbols-outlined fill">
                                                    email
                                                </span>
                                            </div>
                                            <div className="text">Messages</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="menu_apart">
                                <h4>Management</h4>
                                <ul>
                                    <li>
                                        <a href="#dashboard#">
                                            <div className="icon bg_color_7">
                                                <span className="material-symbols-outlined fill">
                                                    supervisor_account
                                                </span>
                                            </div>
                                            <div className="text">Users</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#dashboard#">
                                            <div className="icon bg_color_9">
                                                <span className="material-symbols-outlined fill">
                                                    news
                                                </span>
                                            </div>
                                            <div className="text">Blog</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#dashboard#">
                                            <div className="icon bg_color_8">
                                                <span className="material-symbols-outlined fill">
                                                    card_membership
                                                </span>
                                            </div>
                                            <div className="text">
                                                Subscribers
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#dashboard#">
                                            <div className="icon bg_color_10">
                                                <span className="material-symbols-outlined fill">
                                                    format_list_bulleted_add
                                                </span>
                                            </div>
                                            <div className="text">Contacts</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="menu_apart">
                                <h4>Frontend Management</h4>
                                <ul>
                                    <li>
                                        <a href="#dashboard#">
                                            <div className="icon bg_color_11">
                                                <span className="material-symbols-outlined fill">
                                                    image
                                                </span>
                                            </div>
                                            <div className="text">Banners</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#dashboard#">
                                            <div className="icon bg_color_1">
                                                <span className="material-symbols-outlined fill">
                                                    speaker_notes
                                                </span>
                                            </div>
                                            <div className="text">Notice</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div
                    className="backdrop"
                    onClick={(e) => {
                        e.stopPropagation();
                        active_row();
                    }}
                ></div>
            </li>
        </>
    );
};

export default Management;
