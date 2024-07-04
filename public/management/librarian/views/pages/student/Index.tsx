import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            class: 'Six',
            subject: 'Bangla',
            name: 'Shahin',
            total_issues_book: '5',
            total_due: '295',
            miss_assignment: '5',
        },
        {
            id: 2,
            class: 'Six',
            subject: 'Agriculture',
            name: 'Ramim',
            total_issues_book: '4',
            total_due: '310',
            miss_assignment: '10',
        },
        {
            id: 3,
            class: 'Seven',
            subject: 'Social Science',
            name: 'Tamim',
            total_issues_book: '3',
            total_due: '285',
            miss_assignment: '5',
        },
        {
            id: 4,
            class: 'Seven',
            subject: 'Social Science',
            name: 'Areeba',
            total_issues_book: '5',
            total_due: '485',
            miss_assignment: '5',
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
                                    <th>Total Issues Book</th>
                                    <th>Total Due</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.name}</td>
                                            <td>{i.total_issues_book}</td>
                                            <td>{i.total_due} tk</td>
                                            <td>
                                                <Link
                                                    className="btn btn-sm btn-outline-info mr-1"
                                                    to="/student/details"
                                                >
                                                    details
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

export default Index;
