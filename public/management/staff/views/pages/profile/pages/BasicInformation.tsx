import React, { useState, useEffect } from 'react';
import axios from 'axios';
export interface Props {}

const BasicInformation: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>([]);


    const fetchData = async () => {
        try {
            const response = await axios.get(
                '/api/v1/user-staffs/basic-information',
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
            <h3 className="table_heading">Basic information</h3>
            <table className="table text-nowrap">
                <tbody>
                    <tr>
                        <td>Permanent Address:</td>
                        <td className="font-medium text-dark-medium">
                            {data.staff_infos?.parmenent_address}
                        </td>
                    </tr>
                    <tr>
                        <td>Present Address:</td>
                        <td className="font-medium text-dark-medium">
                            {data.staff_infos?.present_address}
                        </td>
                    </tr>
                    <tr>
                        <td>Country:</td>
                        <td className="font-medium text-dark-medium">
                            {data.staff_infos?.country}
                        </td>
                    </tr>
                    <tr>
                        <td>District:</td>
                        <td className="font-medium text-dark-medium">
                            {data.staff_infos?.district}
                        </td>
                    </tr>
                    <tr>
                        <td>Qualification:</td>
                        <td className="font-medium text-dark-medium">
                            {data.staff_infos?.qualification}
                        </td>
                    </tr>
                    <tr>
                        <td>Blood Group:</td>
                        <td className="font-medium text-dark-medium">
                            {data.staff_infos?.blood_group}
                        </td>
                    </tr>
                    <tr>
                        <td>IsMarried:</td>
                        <td className="font-medium text-dark-medium">
                            {data.staff_infos?.is_married == true
                                ? 'Yes'
                                : 'No'}
                        </td>
                    </tr>
                    <tr>
                        <td>Guardian Contact Number:</td>
                        <td className="font-medium text-dark-medium">
                            {data.staff_infos?.guardian_contact_number}
                        </td>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <td className="font-medium text-dark-medium">
                            {data.status}
                        </td>
                    </tr>
                    <tr>
                        <td>Branch:</td>
                        <td className="font-medium text-dark-medium">
                            {data.staffs?.branch?.name || 'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td>NID:</td>
                        <td className="font-medium text-dark-medium">
                            <a
                                href={
                                    data.staff_infos?.national_id || undefined
                                }
                                target='_blank'
                            >
                                <img
                                    src={
                                        data.staff_infos?.national_id ||
                                        undefined
                                    }
                                    width={40}
                                    alt="yjurty"
                                />
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>Certificate No. 1 :</td>
                        <td className="font-medium text-dark-medium">
                            <a
                                href={
                                    data.staff_infos?.certificate_1 || undefined
                                }
                                target='_blank'
                            >
                                <img
                                    src={
                                        data.staff_infos?.certificate_1 ||
                                        undefined
                                    }
                                    width={40}
                                    alt="yjurty"
                                />
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>Certificate No. 2 :</td>
                        <td className="font-medium text-dark-medium">
                            <a
                                href={
                                    data.staff_infos?.certificate_2 || undefined
                                }
                                target='_blank'
                            >
                                <img
                                    src={
                                        data.staff_infos?.certificate_2 ||
                                        undefined
                                    }
                                    width={40}
                                    alt="yjurty"
                                />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BasicInformation;
