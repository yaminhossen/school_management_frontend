import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from './pages/BackButton';
export interface Props {}

const SingleStudent: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/v1/user-students/basic-information`,
            );
            setData(response.data.data);
        } catch (error) {
            setError(error);
        }
    };
    async function initdependancy() {
        await new Promise((resolve) => setTimeout(resolve, 200));
        await (fetchData() as any);
    }

    useEffect(() => {
        initdependancy();
    }, []);

    return (
        <div className="admin_dashboard">
            <BackButton></BackButton>
            <div className="admin_dashboard">
                <div className="single-info-details">
                    <div className="item-img">
                        <img
                            className="user_profile_img"
                            src={
                                data.image ||
                                '/assets/dashboard/images/avatar.png'
                            }
                            alt="child"
                        />
                    </div>
                    <div className="item-content">
                        <div className="header-inline item-header details_header">
                            <h3 className="text-dark-medium profile_name font-medium">
                                {data.name}
                            </h3>
                            <div className="header-elements"></div>
                        </div>
                        <ul className="section_naviagation">
                            <li className="active_Li">
                                <NavLink
                                    to={`/profile/basic-information`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'active_nav_link'
                                            : 'normal_nav_link'
                                    }
                                >
                                    Basic informations
                                </NavLink>
                            </li>
                            <li className="active_Li">
                                <NavLink
                                    to={`/profile/academic-information`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'active_nav_link'
                                            : 'normal_nav_link'
                                    }
                                >
                                    Academic informations
                                </NavLink>
                            </li>
                            <li className="active_Li">
                                <NavLink
                                    to={`/profile/document`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'active_nav_link'
                                            : 'normal_nav_link'
                                    }
                                >
                                    Documents
                                </NavLink>
                            </li>
                            <li className="active_Li">
                                <NavLink
                                    to={`/profile/parent`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'active_nav_link'
                                            : 'normal_nav_link'
                                    }
                                >
                                    Parents
                                </NavLink>
                            </li>
                            <li className="active_Li">
                                <NavLink
                                    to={`/profile/skill`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'active_nav_link'
                                            : 'normal_nav_link'
                                    }
                                >
                                    Skills
                                </NavLink>
                            </li>
                            <li className="active_Li">
                                <NavLink
                                    to={`/profile/language`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'active_nav_link'
                                            : 'normal_nav_link'
                                    }
                                >
                                    Languages
                                </NavLink>
                            </li>
                            <li className="active_Li">
                                <NavLink
                                    to={`/profile/contact-number`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'active_nav_link'
                                            : 'normal_nav_link'
                                    }
                                >
                                    Contact Numbers
                                </NavLink>
                            </li>
                            <li className="active_Li">
                                <NavLink
                                    to={`/profile/educational-background`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'active_nav_link'
                                            : 'normal_nav_link'
                                    }
                                >
                                    Educational Backgrounds
                                </NavLink>
                            </li>
                            <li className="active_Li">
                                <NavLink
                                    to={`/profile/payments`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'active_nav_link'
                                            : 'normal_nav_link'
                                    }
                                >
                                    Payments
                                </NavLink>
                            </li>
                            <li className="active_Li">
                                <NavLink
                                    to={`/profile/dues`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'active_nav_link'
                                            : 'normal_nav_link'
                                    }
                                >
                                    Dues
                                </NavLink>
                            </li>
                        </ul>
                        <div></div>
                        <div className="info-table table-responsive">
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleStudent;
