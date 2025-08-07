import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import BackButton from '../../../components/BackButton';
export interface Props {}

const Details: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const classId = searchParams.get('c_id');
    console.log('class id', classId);

    useEffect(() => {
        // Function to fetch data
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/v1/branch-class-subjects/teacher-assignment/${id}?c_id=${classId}`,
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
            <BackButton></BackButton>
            <div className="content_body">
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Subject</th>
                                    {/* <th>Subject</th> */}
                                    {/* <th>Total Student</th> */}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {data?.length ? (
                                <tbody id="all_list">
                                    {data?.map(
                                        (i: { [key: string]: any }, index) => {
                                            return (
                                                <tr>
                                                    <td></td>
                                                    <td>{index + 1}</td>
                                                    <td>{i.subject_name}</td>
                                                    {/* <td>{i.subject}</td> */}
                                                    {/* <td>{i.count}</td> */}
                                                    <td>
                                                        <Link
                                                            className="btn btn-sm btn-outline-info mr-1"
                                                            to={`/exam-attendance/take-attendance/${id}?sub=${i.subject_id}&class_id=${classId}`}
                                                        >
                                                            Take attendance
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan={5}>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
