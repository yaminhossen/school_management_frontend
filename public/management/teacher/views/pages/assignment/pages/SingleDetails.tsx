import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const SingleDetails: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>([]);
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
    function lastDate(date: string) {
        return moment(date).format('YYYY-MM-DD');
    }

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
                                    <th></th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                <tr>
                                    <td></td>
                                    <td>1</td>
                                    <td>Name</td>
                                    <td>:</td>
                                    <td>{data.title}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>2</td>
                                    <td>Desctiption</td>
                                    <td>:</td>
                                    <td>{data.description}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>3</td>
                                    <td>Mark</td>
                                    <td>:</td>
                                    <td>{data.mark}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>4</td>
                                    <td>Deadline</td>
                                    <td>:</td>
                                    <td>{lastDate(data.deadline)}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>5</td>
                                    <td>Attachment</td>
                                    <td>:</td>
                                    <td>
                                        <a
                                            href={data.attachment}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Show File
                                        </a>
                                    </td>
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
