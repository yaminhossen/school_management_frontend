import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const SingleStudent: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            name: 'Shahin',
            class: 'Six',
            roll: '101',
            cgpa: '3.5',
            present: '90%',
            total_absance: '10',
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
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Roll</th>
                                    <th>Class</th>
                                    <th>CGPA</th>
                                    <th>Present</th>
                                    <th>Total Absance</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>
                                                <img
                                                    className="children_img"
                                                    src="/assets/dashboard/images/avatar.png"
                                                    alt="teacher"
                                                />
                                            </td>
                                            <td>{i.name}</td>
                                            <td>{i.roll}</td>
                                            <td>{i.class}</td>
                                            <td>{i.cgpa}</td>
                                            <td>{i.present}</td>
                                            <td>{i.total_absance}</td>
                                            {/* <td>
                                                <Link
                                                    className="btn btn-sm btn-outline-info mr-1"
                                                    to="/student/single-student"
                                                >
                                                    Details
                                                </Link>
                                            </td> */}
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

export default SingleStudent;
