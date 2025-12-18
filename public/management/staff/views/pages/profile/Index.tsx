import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>([]);


    const fetchData = async () => {
        try {
            const response = await axios.get(
                '/api/v1/user-staffs/basic-information',
            );
            setData(response.data.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="admin_dashboard">
            <div className="single-info-details">
                <div className="item-img">
                    <img
                        className="user_profile_img"
                        src={data?.image}
                        alt="teacher"
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
                                to={`/profile/major-information`}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'active_nav_link'
                                        : 'normal_nav_link'
                                }
                            >
                                Major informations
                            </NavLink>
                        </li>
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
                    </ul>
                    <div></div>
                    <div className="info-table table-responsive">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
