import React from 'react';
import { Link, Outlet } from 'react-router-dom';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    return (
        <div className="admin_dashboard">
            <h3 className="table_heading"></h3>
            <div className="content_body">
                <Link
                    to="/settings/update-photo"
                    className="btn btn-sm btn-outline-info mb-2 mr-2"
                    type="submit"
                >
                    Update Photo
                </Link>
                <Link
                    to="/settings/update-password"
                    className="btn btn-sm btn-outline-info mb-2 mr-2"
                    type="submit"
                >
                    Update Password
                </Link>
                <div className="info-table table-responsive">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Index;