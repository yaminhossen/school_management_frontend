import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const Details: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            class: 'Six',
            student_id: '2024SIX101',
            name: 'Shahin',
            roll: '001',
        },
        {
            id: 2,
            class: 'Six',
            student_id: '2024SIX102',
            name: 'Ramim',
            roll: '002',
        },
        {
            id: 3,
            class: 'Six',
            student_id: '2024SIX103',
            name: 'Areeba',
            roll: '003',
        },
        {
            id: 4,
            class: 'Six',
            student_id: '2024SIX104',
            name: 'Nayeem',
            roll: '004',
        },
        {
            id: 5,
            class: 'Six',
            student_id: '2024SIX105',
            name: 'Mahin',
            roll: '005',
        },
        {
            id: 6,
            class: 'Six',
            student_id: '2024SIX106',
            name: 'Tanvir',
            roll: '006',
        },
        {
            id: 7,
            class: 'Six',
            student_id: '2024SIX107',
            name: 'Jerin',
            roll: '007',
        },
    ];

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <Link
                    to="/add-new"
                    className="btn btn-sm btn-outline-info mb-2"
                    type="submit"
                >
                    Add New
                </Link>
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Name</th>
                                    <th>Student Id</th>
                                    <th>Roll</th>
                                    <th>Class</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.name}</td>
                                            <td>{i.student_id}</td>
                                            <td>{i.roll}</td>
                                            <td>{i.class}</td>
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

export default Details;