import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const BasicInformation: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        // Function to fetch data
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                '/api/v1/user-parents/basic-information',
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
            <h3 className="table_heading">Basic information</h3>
            <table className="table text-nowrap">
                <tbody>
                    <tr>
                        <td>Permanent Address:</td>
                        <td className="font-medium text-dark-medium">
                            {data.parent_infos?.parmenent_address || 'No data found'}
                        </td>
                    </tr>
                    <tr>
                        <td>Present Address:</td>
                        <td className="font-medium text-dark-medium">
                            {data.parent_infos?.present_address || 'No data found'}
                        </td>
                    </tr>
                    <tr>
                        <td>Occupation:</td>
                        <td className="font-medium text-dark-medium">
                            {data.parent_infos?.occupation || 'No data found'}
                        </td>
                    </tr>
                    <tr>
                        <td>Guardian Contact Number:</td>
                        <td className="font-medium text-dark-medium">
                            {data.phone_number || 'No data found'}
                        </td>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <td className="font-medium text-dark-medium">
                            {data.status}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BasicInformation;
