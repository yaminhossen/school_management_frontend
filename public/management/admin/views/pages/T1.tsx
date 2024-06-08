import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const T1: React.FC<Props> = (props: Props) => {
    return (
        <div className="admin_dashboard">
            <h2>admin Dashboard</h2>
            <div className="admin_sideba custom_scroll">
                <ul className="dashboard_links ">
                    {/* <li>
                        <Link to="/branch-staffs">
                            <span className="material-symbols-outlined fill">
                                clinical_notes
                            </span>
                            Brach Staff Management
                        </Link>
                    </li> */}
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
                    <li>
                        <Link to="/user-branch-admins">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            user branch admins Management
                        </Link>
                    </li>
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
                        <Link to="/branch-classes">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Branch Classes Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-fee-types">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Branch Class Fee types Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-fee-discounts">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Branch Class Fee Discounts Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-fee-waivers">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Branch Class Fee Waivers Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-fees">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Branch Class Fees Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-routine-day-times">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Branch Class Routine Day Time Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-resources">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Branch Class Resources Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/branch-class-subjects">
                            <span className="material-symbols-outlined fill">
                                groups
                            </span>
                            Branch Class Subjects Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/meetings">
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
            </div>
        </div>
    );
};

export default T1;
