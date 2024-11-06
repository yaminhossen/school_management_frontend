import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../common_types/object';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Function to fetch data
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                '/api/v1/branch-class-subjects/teacher-assignment/1',
            );
            setData(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(data);
    return (
        <div className="admin_dashboard">
            <div>
                <Link
                    className="btn btn-sm btn-outline-info mb-1"
                    to="/assignment/create"
                >
                    Create
                </Link>
            </div>
            <div className="content_body">
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Class</th>
                                    <th>Subject</th>
                                    {/* <th>Total Student</th>
                                    <th>Total Assignment</th>
                                    <th>Take Assignment</th>
                                    <th>Miss Assignment</th> */}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {data?.map(
                                    (i: { [key: string]: any }, index) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{index + 1}</td>
                                                <td>{i.a_class?.name}</td>
                                                <td>{i.a_subject?.name}</td>
                                                {/* <td>{i.total_student}</td>
                                                <td>{i.total_assignment}</td>
                                                <td>{i.take_assignment}</td>
                                                <td>{i.miss_assignment}</td> */}
                                                <td>
                                                    <Link
                                                        className="btn btn-sm btn-outline-info mr-1"
                                                        to="/assignment/details"
                                                    >
                                                        details
                                                    </Link>
                                                    {/* <Link
                                                        className="btn btn-sm btn-outline-info mr-1"
                                                        to="/assignment/edit"
                                                    >
                                                        Edit
                                                    </Link> */}
                                                    {/* <Link
                                                    className="btn btn-sm btn-outline-info"
                                                    to="/class-attendance/take-attendance"
                                                >
                                                    Take attendance
                                                </Link> */}
                                                </td>
                                            </tr>
                                        );
                                    },
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
