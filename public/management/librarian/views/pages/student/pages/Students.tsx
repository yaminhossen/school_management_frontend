import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const Students: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            name: 'Shahin',
            subject: 'Bangla',
            class: 'Six',
            roll: '101',
        },
        {
            id: 2,
            name: 'Tamim',
            subject: 'Bangla',
            class: 'Six',
            roll: '102',
        },
        {
            id: 3,
            name: 'Ramim',
            subject: 'Bangla',
            class: 'Six',
            roll: '103',
        },
    ];

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Name</th>
                                    <th>Subject</th>
                                    <th>Class</th>
                                    <th>Roll</th>
                                    <th>Action</th>
                                    <th>Report</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.name}</td>
                                            <td>{i.subject}</td>
                                            <td>{i.class}</td>
                                            <td>{i.roll}</td>
                                            <td>
                                                <Link
                                                    className="btn btn-sm btn-outline-info mr-1"
                                                    to="/student/review"
                                                >
                                                    Review
                                                </Link>
                                                <Link
                                                    className="btn btn-sm btn-outline-info mr-1"
                                                    to="/student/complain"
                                                >
                                                    Complain
                                                </Link>
                                            </td>
                                            <td>
                                                <Link
                                                    className="btn btn-sm btn-outline-info mr-1"
                                                    to="/student/single-student"
                                                >
                                                    Details
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Students;
