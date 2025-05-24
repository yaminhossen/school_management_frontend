import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const T1: React.FC<Props> = (props: Props) => {
    return (
        <div className="admin_dashboard">
            <h1>Nurul Hiqamah Model Madrasa</h1>
            <h2>Super Admin Dashboard</h2>
            <div className="admin_sideba custom_scroll">
                <h3 className="mt-4 ms-0">Admin management</h3>
                <ul className="dashboard_links ">
                    <li>
                        <Link to="/user-admins">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Admin Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/user-staffs">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Staff Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/user-teachers">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Teacher Management
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
                    {/* <li>
                        <Link to="/user-branch-admins">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            user branch admins Management
                        </Link>
                    </li> */}
                </ul>

                <h3 className="mt-4 ms-0">Profile management</h3>
                <ul className="dashboard_links ">
                    <li>
                        <Link to="/settings">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Settings Management
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default T1;
