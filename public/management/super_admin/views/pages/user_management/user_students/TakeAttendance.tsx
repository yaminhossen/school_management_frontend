import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const TakeAttendance: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [branch, setBranch] = useState([]);
    const [classes, setClasses] = useState([]);
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const subjectId = searchParams.get('sub');
    console.log('subject id', subjectId);

    const fetchData = async () => {
        try {
            // const response = await axios.get(`/api/v1/user-students/branches`);
            // setData(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    const fetchBranches = async () => {
        try {
            const response = await axios.get(`/api/v1/user-students/branches`);
            setBranch(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await axios.get(`/api/v1/user-students/classes`);
            setClasses(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };
    async function initFunc() {
        await fetchBranches();
        await fetchClasses();
        await fetchData();
    }
    useEffect(() => {
        // const timeoutClass = setTimeout(() => {
        //     fetchClasses();
        // }, 5000);
        initFunc();
    }, []);
    console.log('all brnaches', branch);
    console.log('all classes', classes);
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
            // setData(response.data.data.data);
            // setTotalIncome(response.data.data.data2);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <form onSubmit={handleSubmit}>
                    <div className="teacher_result">
                        <div>
                            <div className="label">Branch</div>
                            <div>
                                {/* <input
                                    type="date"
                                    name="month1"
                                    defaultValue={moment()
                                        .subtract(30, 'days')
                                        .format('YYYY-MM-DD')}
                                /> */}
                                <select name="branch" id="">
                                    {/* <option value="1">Kustia</option> */}
                                    {branch?.length &&
                                        branch?.map(
                                            (i: { [key: string]: any }) => {
                                                return (
                                                    <option value={i.id}>
                                                        {i.name}
                                                    </option>
                                                );
                                            },
                                        )}
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="label">Class</div>
                            <div>
                                {/* <input
                                    type="date"
                                    name="month2"
                                    defaultValue={moment().format('YYYY-MM-DD')}
                                /> */}
                                <select name="class" id="">
                                    <option value="1">Six</option>
                                    <option value="2">Seven</option>
                                    <option value="3">Eight</option>
                                </select>
                            </div>
                        </div>
                        <button
                            className="btn btn-sm btn-outline-info"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
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
                                <tbody id="all_list">
                                    <input
                                        type="hidden"
                                        name="student_count"
                                        value={data.length}
                                    />
                                    {classes?.map(
                                        (i: { [key: string]: any }, index) => {
                                            return (
                                                <tr>
                                                    <td></td>
                                                    <td>{index + 1}</td>
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
                            <div className="attendance_form_btn">
                                <button
                                    className="btn btn-sm btn-outline-info "
                                    type="submit"
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
