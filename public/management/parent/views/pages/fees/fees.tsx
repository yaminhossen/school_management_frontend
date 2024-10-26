import React from 'react';
import { Link, useParams } from 'react-router-dom';
export interface Props {}

const Details: React.FC<Props> = (props: Props) => {
    const { id } = useParams();
    console.log('params is from childere', id);

    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            purpose: 'Admission',
            amount: '3000',
        },
        {
            id: 2,
            purpose: 'Hostel bill',
            amount: '10000',
        },
        {
            id: 3,
            purpose: 'Transport bill',
            amount: '5000',
        },
    ];

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
                                    <th>Purpose</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.purpose}</td>
                                            <td>{i.amount} tk</td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="payment_total">Total:</td>
                                    <td>18000 tk</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
