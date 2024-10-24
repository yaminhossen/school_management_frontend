import React from 'react';
import { Link, Outlet } from 'react-router-dom';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            title: 'Application for sick leave',
        },
        {
            id: 2,
            title: 'Application for casual leave',
        },
    ];

    return (
        <div className="admin_dashboard">
            <h3 className="table_heading"></h3>
            <div className="content_body">
                <Link
                    to="/leave-application/create"
                    className="btn btn-sm btn-outline-info mb-2 mr-2"
                    type="submit"
                >
                    Create
                </Link>
                <Link
                    to="/leave-application/approved"
                    className="btn btn-sm btn-outline-info mb-2 mr-2"
                    type="submit"
                >
                    Approved
                </Link>
                <Link
                    to="/leave-application/rejected"
                    className="btn btn-sm btn-outline-info mb-2 mr-2"
                    type="submit"
                >
                    Rejected
                </Link>
                <Link
                    to="/leave-application/pending"
                    className="btn btn-sm btn-outline-info mb-2 mr-2"
                    type="submit"
                >
                    Pending
                </Link>
                {/* <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.title}</td>
                                            <td>07 march, 2024</td>
                                            <td>approved</td>
                                            <td>
                                                <a href="#">download</a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div> */}
                <div className="info-table table-responsive">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Index;
