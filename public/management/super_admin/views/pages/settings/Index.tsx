import React from 'react';
import { Link, Outlet } from 'react-router-dom';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    return (
        <div className="admin_dashboard">
            <h3 className="table_heading"></h3>
            <div className="content_body">
                <div className="info-table table-responsive">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Index;
