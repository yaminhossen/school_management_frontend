import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import setup from './config/setup';
export interface Props {}

const Layout: React.FC<Props> = (props: Props) => {
    return (
        <div className="management_root no_border">
            <div className="management_heading">
                <h2 className="layout_heading">{setup.layout_title}</h2>
            </div>
            <div className="management_content_root">
                <NavLink
                    to="/leave-applications/pending"
                    className="btn btn-sm btn-outline-info mb-2 mr-2"
                    type="submit"
                >
                    Pending
                </NavLink>
                <NavLink
                    to="/leave-applications/approved"
                    className="btn btn-sm btn-outline-info mb-2 mr-2"
                    type="submit"
                >
                    Approved
                </NavLink>
                <NavLink
                    to="/leave-applications/rejected"
                    className="btn btn-sm btn-outline-info mb-2 mr-2"
                    type="submit"
                >
                    Rejected
                </NavLink>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Layout;
