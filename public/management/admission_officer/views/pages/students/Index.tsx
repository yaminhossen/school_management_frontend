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
            total_student: '280',
        },
        {
            id: 2,
            class: 'Seven',
            total_student: '300',
        },
        {
            id: 3,
            class: 'Eight',
            total_student: '320',
        },
        {
            id: 4,
            class: 'Nine',
            total_student: '260',
        },
        {
            id: 5,
            class: 'Ten',
            total_student: '250',
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
                                    <th>Class</th>
                                    <th>Total Student</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.class}</td>
                                            <td>{i.total_student}</td>
                                            <td>
                                                <Link
                                                    to="/students/details"
                                                    className="btn btn-sm  btn-outline-info"
                                                    type="submit"
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

export default Index;
