import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const T1: React.FC<Props> = (props: Props) => {
    return (
        <div>
            admin Dashboard
            <ul className="dashboard_links">
                <li>
                    <Link to="/branch-staffs">
                        <span className="material-symbols-outlined fill">
                            clinical_notes
                        </span>
                        Brach Staff Management
                    </Link>
                </li>
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
            </ul>
        </div>
    );
};

export default T1;
