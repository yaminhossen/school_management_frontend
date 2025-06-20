import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../common_types/object';
import { Link, NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        // Function to fetch data
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                '/api/v1/user-staffs/basic-information',
            );
            setData(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(data);
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
                        <div className="header-elements">
                            {/* <ul>
                                <li>
                                    <a href="">
                                        <span className="material-symbols-outlined fill">
                                            edit_square
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="material-symbols-outlined fill">
                                            print
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="material-symbols-outlined fill">
                                            system_update_alt
                                        </span>
                                    </a>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                    <ul className="section_naviagation">
                        {/* <li>
                            <NavLink to="/profile/major-information">
                                Major informations
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile/basic-information">
                                Basic informations
                            </NavLink>
                        </li> */}
                        <li className="active_Li">
                            <NavLink
                                to={`/profile/major-information`}
                                // className="active_nav_link"
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
