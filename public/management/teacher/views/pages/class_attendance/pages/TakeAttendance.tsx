import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const TakeAttendance: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        // Function to fetch data
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/v1/user-students/class-wise-student/${id}`,
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
    let date = moment().format('YYYY-MM-DD');

    return (
        <div className="admin_dashboard">
            <div className="result_details">
                {/* <h3 className="table_heading mt-4">First Semester</h3> */}
                {/* <form action="" onSubmit={(e) => e.preventDefault()}>
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
                            <div>Date</div>
                            <div>
                                <input type="date" name="" id="" />
                            </div>
                        </div>
                        <div>
                            <div>Roll</div>
                            <div>
                                <input type="number" name="roll" id="" />
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
            </div>
            <div className="content_body">
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Date</th>
                                    <th></th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                <input
                                    type="hidden"
                                    name="student_count"
                                    value={data.length}
                                />
                                {data?.map(
                                    (i: { [key: string]: any }, index) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{index}</td>
                                                <td>{i.student?.name}</td>
                                                <td>{i.role_no}</td>
                                                <td>{date}</td>

                                                <td>
                                                    <input
                                                        type="hidden"
                                                        name={`student_id${index}`}
                                                        value={
                                                            i.user_student_id
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        name={`attendance_status${index}`}
                                                        id=""
                                                    >
                                                        <option value="present">
                                                            Present
                                                        </option>
                                                        <option value="absent">
                                                            absent
                                                        </option>
                                                        <option value="late">
                                                            Late
                                                        </option>
                                                        <option value="leave">
                                                            Leave
                                                        </option>
                                                    </select>
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

export default TakeAttendance;
