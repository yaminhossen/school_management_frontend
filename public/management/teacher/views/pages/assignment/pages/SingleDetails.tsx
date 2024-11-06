import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const SingleDetails: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        // Function to fetch data
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/v1/assignments/${id}`);
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
            <div className="result_details"></div>
            <div className="content_body">
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Title</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                <tr>
                                    <td></td>
                                    <td>1</td>
                                    <td>lsdfj</td>
                                    <td>lsdfjkldjs</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>1</td>
                                    <td>lsdfj</td>
                                    <td>lsdfjkldjs</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>1</td>
                                    <td>lsdfj</td>
                                    <td>lsdfjkldjs</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>1</td>
                                    <td>lsdfj</td>
                                    <td>lsdfjkldjs</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>1</td>
                                    <td>lsdfj</td>
                                    <td>lsdfjkldjs</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Name</th>
                                    <th>Subject</th>
                                    <th>Total Assignment</th>
                                    <th>Take Assignment</th>
                                    <th>Miss Assignment</th>
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
                                            <td>{i.subject}</td>
                                            <td>{i.total_assignment}</td>
                                            <td>{i.take_assignment}</td>
                                            <td>{i.miss_assignment}</td>
                                            <td>
                                                <Link
                                                    className="btn btn-sm btn-outline-info mr-1"
                                                    to="/assignment/details"
                                                >
                                                    details
                                                </Link>
                                                <Link
                                                    className="btn btn-sm btn-outline-info mr-1"
                                                    to="/assignment/edit"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default SingleDetails;
