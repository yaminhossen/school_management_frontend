import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { anyObject } from '../../../common_types/object';

export interface Props {}

const NavigationList: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>();
    const [isActive, setIsActive] = useState(false); // Track drawer state
    const toggler = useRef<HTMLLIElement>(null);

    // Toggle drawer manually
    const active_row = () => {
        setIsActive((prev) => !prev);
    };

    // Detect outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isActive &&
                toggler.current &&
                !toggler.current.contains(event.target as Node)
            ) {
                setIsActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [isActive]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let confirm = await (window as anyObject).s_confirm('Logout');
            if (confirm) {
                await axios.post('/api/v1/auth/logout');
            }
        } catch (error) {
            setError(error);
        }
    };
    const fetchData = async () => {
        try {
            const response = await axios.get(
                '/api/v1/user-staffs/admin-details',
            );
            setData(response.data.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const menuArray = [
        {
            group: 'User management',
            links: [
                {
                    link: '/super-admin#/user-admins',
                    label: 'Admins',
                    icon: 'manage_accounts',
                },
                {
                    link: '/super-admin#/user-staffs',
                    label: 'Staffs',
                    icon: 'manage_accounts',
                },
                {
                    link: '/super-admin#/user-teachers',
                    label: 'Teachers',
                    icon: 'manage_accounts',
                },
                // {
                //     link: '/super-admin#/user-students',
                //     label: 'Student',
                //     icon: 'manage_accounts',
                // },
            ],
        },
        {
            group: 'Branch management',
            links: [
                {
                    link: '/super-admin#/branches',
                    label: 'Branches',
                    icon: 'manage_accounts',
                },
            ],
        },
        {
            group: 'Profile management',
            links: [
                {
                    link: '/super-admin#/settings',
                    label: 'Settings',
                    icon: 'manage_accounts',
                },
            ],
        },
    ];

    return (
        <>
            <li
                ref={toggler}
                className={`icon_link_li app_drawar_link_li ${isActive ? 'active' : ''}`}
                onClick={active_row}
            >
                <a
                    href="menu"
                    onClick={(e) => e.preventDefault()}
                    className="navigation_link"
                >
                    <span className="material-symbols-outlined fill">apps</span>
                </a>

                <div className="apps_list_drawer">
                    <div
                        className="content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="top">
                            <div className="profile">
                                <div className="img">
                                    <img
                                        src={
                                            data?.image ||
                                            '/assets/dashboard/images/avatar.png'
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="profile_info">
                                    <h2>{data?.name}</h2>
                                    <h3>
                                        <span>super-admin</span>
                                    </h3>
                                </div>
                            </div>
                            <div className="action">
                                <ul>
                                    <li onClick={() => setIsActive(false)}>
                                        <a href="/super-admin#/settings">
                                            <span className="material-symbols-outlined fill">
                                                manage_accounts
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
                            {/* <input type="search" placeholder="search.." /> */}
                        </div>
                        <div className="menu_list custom_scroll">
                            {menuArray?.map((i) => (
                                <div className="menu_apart" key={i.group}>
                                    <h4>{i.group}</h4>
                                    <ul>
                                        {i.links?.map((link, index) => (
                                            <li
                                                key={link.link}
                                                onClick={() =>
                                                    setIsActive(false)
                                                } // <-- Close drawer on click
                                            >
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
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {isActive && (
                    <div
                        className="backdrop"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsActive(false);
                        }}
                    ></div>
                )}
            </li>
        </>
    );
};

export default NavigationList;
