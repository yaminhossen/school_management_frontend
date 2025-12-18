import React, { useState, useEffect } from 'react';
import axios from 'axios';
export interface Props {}

const Details: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                '/api/v1/user-students/full-details',
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
            <div className="content_body ">
                <div className="student_details">
                    <div> </div>
                    <div> </div>
                </div>
                {data && (
                    <div className="single_student_details">
                        <div>
                            <h4>Guardians</h4>
                            <div className="basic_info mb-4 ">
                                <table className="table text-nowrap student_table">
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>:</td>
                                            <td className="font-medium text-dark-medium">
                                                {
                                                    data.parents?.parent_details
                                                        ?.name
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>:</td>
                                            <td className="font-medium text-dark-medium">
                                                {
                                                    data.parents?.parent_details
                                                        ?.email
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Relation</td>
                                            <td>:</td>
                                            <td className="font-medium text-dark-medium">
                                                {
                                                    data.parents?.parent_details
                                                        ?.relation
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="table text-nowrap student_table ml-2">
                                    <tbody>
                                        <tr>
                                            <td>Phone Number</td>
                                            <td>:</td>
                                            <td className="font-medium text-dark-medium">
                                                {
                                                    data.parents?.parent_details
                                                        ?.phone_number
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td>:</td>
                                            <td className="font-medium text-dark-medium">
                                                {
                                                    data.parents?.parent_details
                                                        ?.status
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Picture</td>
                                            <td>:</td>
                                            <td className="font-medium text-dark-medium">
                                                <a
                                                    href={
                                                        data.parents
                                                            ?.parent_details
                                                            ?.image || undefined
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Show Image
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Details;
