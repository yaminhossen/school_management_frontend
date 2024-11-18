import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../common_types/object';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const Result: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    // const [data, setData] = useState([]);
    const [classes, setClasses] = useState<any>([]);
    const { id } = useParams();

    const fetchClasses = async () => {
        try {
            const response = await axios.get(
                `/api/v1/branch-class-subjects/class-wise-subject/${id}`,
            );
            setClasses(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);
    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            name: 'Shahin',
            marks: '75',
            grade: 'A',
        },
        {
            id: 2,
            name: 'Tamim',
            marks: '85',
            grade: 'A+',
        },
        {
            id: 3,
            name: 'Ramim',
            marks: '90',
            grade: 'A+',
        },
    ];

    return (
        <div className="admin_dashboard">
            <div className="result_details">
                <h3 className="table_heading mt-4"></h3>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <div className="teacher_result">
                        <div>
                            <div>Subject</div>
                            <div>
                                <select name="subject" id="">
                                    <option value="six">Bangla</option>
                                    <option value="seven">English</option>
                                    <option value="eight">Math</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>Exam</div>
                            <div>
                                <select name="exam" id="">
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
                                    <th>Result</th>
                                    <th>Mark</th>
                                    <th>Other Mark</th>
                                    {/* <th>Grade</th> */}
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.name}</td>
                                            <td>{i.marks}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="mark"
                                                    id=""
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="other_mark"
                                                    id=""
                                                />
                                            </td>
                                            {/* <td>{i.grade}</td> */}
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

export default Result;
