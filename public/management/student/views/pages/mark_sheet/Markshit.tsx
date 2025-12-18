import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../common_types/object';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../../components/BackButton';
export interface Props {}

const Markshit: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<anyObject[]>([]);
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/v1/exam-student-marks/class-wise-exam/${id}`,
            );
            setData(response.data.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="admin_dashboard">
            <BackButton></BackButton>
            <div>{/* <h3>Current CGPA : 4.50</h3> */}</div>
            <h3 className="table_heading student_semister">Result History</h3>
            <div className="content_body ">
                <div className="data_list mb-4">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>id</th>
                                    <th>Exam</th>
                                    <th>Subject</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {data?.map(
                                    (i: { [key: string]: any }, index) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{index + 1}</td>
                                                <td>{i.title}</td>
                                                <td>
                                                    <Link
                                                        className="btn btn-sm btn-outline-info"
                                                        to={`/mark-sheet/term-exam/${i.id}/${id}`}
                                                    >
                                                        details
                                                    </Link>
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

export default Markshit;
