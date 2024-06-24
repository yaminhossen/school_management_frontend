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
            total_student: '400',
            semister: 'Third',
            total_pass: '390',
            total_failed: '10',
            total_result_assign: '300',
            session: '2020',
        },
        {
            id: 2,
            class: 'Six',
            subject: 'Agriculture',
            total_student: '400',
            semister: 'Third',
            total_pass: '390',
            total_failed: '10',
            total_result_assign: '300',
            session: '2020',
        },
        {
            id: 3,
            class: 'Seven',
            subject: 'Social Science',
            total_student: '500',
            semister: 'Second',
            total_pass: '450',
            total_failed: '50',
            total_result_assign: '400',
            session: '2020',
        },
        {
            id: 4,
            class: 'Eight',
            subject: 'Bangla',
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
            <form action="">
                <div className="teacher_result">
                    <div>
                        <div>Class</div>
                        <div>
                            <select name="class" id="">
                                <option value="six">Six</option>
                                <option value="seven">Seven</option>
                                <option value="eight">Eight</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>Semister</div>
                        <div>
                            <select name="semister" id="">
                                <option value="first">First</option>
                                <option value="second">Second</option>
                                <option value="third">Third</option>
                            </select>
                        </div>
                    </div>
                    <button
                        className="btn btn-sm btn-outline-info "
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div className="content_body">
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Class</th>
                                    <th>Subject</th>
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
                                            <td>{i.subject}</td>
                                            <td>{i.total_student}</td>
                                            <td>{i.semister}</td>
                                            <td>{i.session}</td>
                                            <td>{i.total_pass}</td>
                                            <td>{i.total_failed}</td>
                                            <td>{i.total_result_assign}</td>
                                            <td>
                                                <Link
                                                    className="btn btn-sm btn-outline-info mr-1"
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
