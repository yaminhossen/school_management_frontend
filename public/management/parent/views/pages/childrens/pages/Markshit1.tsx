import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const Markshit1: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<anyObject[]>([]);
    const { id } = useParams();

    useEffect(() => {
        // Function to fetch data
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/v1/exam-student-marks/student-class/${id}`,
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
    if (data) {
        console.log(data);
    }

    return (
        <div className="admin_dashboard">
            <h3 className="table_heading">Results</h3>
            <div className="content_body">
                <div className="data_list">
                    {/* <div className="management_content_root">
                        <Outlet></Outlet>
                    </div> */}
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>id</th>
                                    <th>Class</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {data?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.name}</td>
                                            {/* <td>{i.marks}</td>
                                            <td>{i.session}</td>
                                            <td>{i.grade}</td> */}
                                            <td>
                                                <Link
                                                    className="btn btn-sm btn-outline-info"
                                                    to={`/childrens/details/${id}/mark-sheet/detailss/${i.id}`}
                                                >
                                                    details
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

export default Markshit1;
