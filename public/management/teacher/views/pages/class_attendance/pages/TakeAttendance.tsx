import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const TakeAttendance: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const subjectId = searchParams.get('sub');
    console.log('subject id', subjectId);

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
    // console.log('subject_id2', subjectId);
    let date = moment().format('YYYY-MM-DD');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        let formData = new FormData(e.target);
        formData.append('class_id', `${id}`);
        formData.append('subject_id', `${subjectId}`);
        try {
            const response = await axios.post(
                '/api/v1/student-attendances/store',
                formData,
            );
            (window as any).toaster('Attendance submitted');
            // setData(response.data.data.data);
            (window as any).toaster('Attendance submitted');
            // setTotalIncome(response.data.data.data2);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="admin_dashboard">
            <div className="dues_back_btn">
                <h3 className="table_heading"></h3>
                <button className="back_btn settings_bacsk">
                    <Link to={`/class-attendance/details/${id}`}>
                        <span className="material-symbols-outlined fill">
                            arrow_back
                        </span>
                        <div className="text">Back</div>
                    </Link>
                </button>
            </div>
            <div className="content_body">
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <form onSubmit={handleSubmit}>
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
                                {data?.length ? (
                                    <tbody id="all_list">
                                        <input
                                            type="hidden"
                                            name="student_count"
                                            value={data.length}
                                        />
                                        {data?.map(
                                            (
                                                i: { [key: string]: any },
                                                index,
                                            ) => {
                                                return (
                                                    <tr>
                                                        <td></td>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {i.student?.name}
                                                        </td>
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
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan={10}>
                                                <div
                                                    style={{
                                                        fontSize: '24px',
                                                    }}
                                                    className="not_found f-size-4 m-4"
                                                >
                                                    No data found
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                            <div className="attendance_form_btn student_submit">
                                <button
                                    // className="btn btn-sm btn-outline-info "
                                    type="submit"
                                    className={`btn btn-sm btn-outline-info  ${!data?.length ? 'error_btn' : ''}`}
                                    disabled={!data?.length}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TakeAttendance;
