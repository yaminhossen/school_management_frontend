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
            total_due: '95',
            miss_assignment: '5',
        },
        {
            id: 2,
            class: 'Six',
            subject: 'Agriculture',
            name: 'Ramim',
            total_issues_book: '4',
            total_due: '110',
            miss_assignment: '10',
        },
        {
            id: 3,
            class: 'Seven',
            subject: 'Social Science',
            name: 'Tamim',
            total_issues_book: '3',
            total_due: '85',
            miss_assignment: '5',
        },
    ];

    return (
        <div className="admin_dashboard">
            {/* <form action="">
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
            </form> */}
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
                                            <td>{i.total_due}</td>
                                            <td>
                                                <Link
                                                    className="btn btn-sm btn-outline-info mr-1"
                                                    to="/student/details"
                                                >
                                                    details
                                                </Link>
                                                {/* <Link
                                                    className="btn btn-sm btn-outline-info"
                                                    to="/class-attendance/take-attendance"
                                                >
                                                    Take attendance
                                                </Link> */}
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
