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
            title: 'Bangla Essay books',
            teacher: 'Eng. Nayeem Hossain',
            date: '12 Jan, 2024',
        },
        {
            id: 2,
            title: 'English Word books',
            teacher: 'Dr. Abdul Bari',
            date: '12 Feb, 2024',
        },
        {
            id: 3,
            title: 'Math 4th chapter solve',
            teacher: 'dr. Obaidullah',
            date: '15 Jan, 2024',
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
                                    <th>Teacher</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.title}</td>
                                            <td>{i.teacher}</td>
                                            <td>{i.date}</td>
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
            </div>
        </div>
    );
};

export default Index;
