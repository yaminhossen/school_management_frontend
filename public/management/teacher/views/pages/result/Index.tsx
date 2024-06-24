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
            total_student: '400',
            semister: 'Third',
            total_pass: '390',
            total_failed: '10',
            total_result_assign: '300',
            session: '2020',
        },
        {
            id: 2,
            class: 'Seven',
            total_student: '500',
            semister: 'Second',
            total_pass: '450',
            total_failed: '50',
            total_result_assign: '400',
            session: '2020',
        },
        {
            id: 3,
            class: 'Eight',
            total_student: '220',
            semister: 'Third',
            total_pass: '200',
            total_failed: '20',
            total_result_assign: '180',
            session: '2020',
        },
    ];

    return (
        <div className="admin_dashboard">
            {/* <h3 className="table_heading">Results</h3> */}
            <div className="content_body">
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Class</th>
                                    <th>Total Student</th>
                                    <th>Semister</th>
                                    <th>Session</th>
                                    <th>Total Pass</th>
                                    <th>Total Faied</th>
                                    <th>Total Result Assign</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.class}</td>
                                            <td>{i.total_student}</td>
                                            <td>{i.semister}</td>
                                            <td>{i.session}</td>
                                            <td>{i.total_pass}</td>
                                            <td>{i.total_failed}</td>
                                            <td>{i.total_result_assign}</td>
                                            <td>
                                                <Link
                                                    className="btn btn-sm btn-outline-info"
                                                    to="/result/details"
                                                >
                                                    details
                                                </Link>
                                                <Link
                                                    className="btn btn-sm btn-outline-info"
                                                    to="/result/assign-result"
                                                >
                                                    assign result
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
