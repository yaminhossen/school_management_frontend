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
            month: 'June, 2024',
            present: '390',
            absence: '10',
        },
        {
            id: 2,
            class: 'Six',
            subject: 'Agriculture',
            total_student: '400',
            month: 'June, 2024',
            present: '390',
            absence: '10',
        },
        {
            id: 3,
            class: 'Seven',
            subject: 'Social Science',
            total_student: '500',
            month: 'June, 2024',
            present: '450',
            absence: '50',
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
                        <div>Month</div>
                        <div>
                            <input type="month" name="month" id="" />
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
                                    <th>Month</th>
                                    <th>Total Absence</th>
                                    <th>Total Present</th>
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
                                            <td>{i.month}</td>
                                            <td>{i.present}</td>
                                            <td>{i.absence}</td>
                                            <td>
                                                <Link
                                                    className="btn btn-sm btn-outline-info mr-1"
                                                    to="/class-attendance/details"
                                                >
                                                    details
                                                </Link>
                                                <Link
                                                    className="btn btn-sm btn-outline-info"
                                                    to="/class-attendance/take-attendance"
                                                >
                                                    Take attendance
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
