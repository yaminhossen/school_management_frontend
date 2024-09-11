import React from 'react';
import { Link, Outlet } from 'react-router-dom';
export interface Props {}

const Reject: React.FC<Props> = (props: Props) => {
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
        {
            id: 3,
            title: 'Application for casual leave',
        },
        {
            id: 4,
            title: 'Application for casual leave',
        },
        {
            id: 5,
            title: 'Application for casual leave',
        },
        {
            id: 6,
            title: 'Application for casual leave',
        },
        {
            id: 7,
            title: 'Application for casual leave',
        },
        {
            id: 2,
            title: 'Application for casual leave',
        },
        {
            id: 8,
            title: 'Application for casual leave',
        },
        {
            id: 9,
            title: 'Application for casual leave',
        },
        {
            id: 10,
            title: 'Application for casual leave',
        },
        {
            id: 11,
            title: 'Application for casual leave',
        },
    ];

    return (
        <div className="admin_dashboard">
            <h3 className="table_heading"></h3>
            <div className="content_body">
                <div className="data_list">
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
                                            <td>Pending</td>
                                            <td>
                                                <a href="#">download</a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="info-table table-responsive">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Reject;
