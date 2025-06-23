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

            <NavLink
                to="/meeting-agendas/pending"
                className="btn btn-sm btn-outline-info mb-2 mr-2"
                type="submit"
            >
                Pending
            </NavLink>
            <NavLink
                to="/meeting-agendas/completed"
                className="btn btn-sm btn-outline-info mb-2 mr-2"
                type="submit"
            >
                Completed
            </NavLink>
            <div className="management_content_root">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Layout;
