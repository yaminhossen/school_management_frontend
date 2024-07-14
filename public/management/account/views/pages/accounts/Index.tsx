import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            account: 'Cash',
            total_income: '50000',
            total_expense: '20000',
            balance: '30000',
        },
        {
            id: 2,
            account: 'Bank',
            total_income: '40000',
            total_expense: '10000',
            balance: '30000',
        },
        {
            id: 3,
            account: 'Bkash',
            total_income: '60000',
            total_expense: '20000',
            balance: '40000',
        },
    ];

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <Link
                    to="/accounts/create"
                    className="btn btn-sm btn-outline-info mb-2"
                    type="submit"
                >
                    Create
                </Link>
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Account</th>
                                    <th>Total Income</th>
                                    <th>Total Expense</th>
                                    <th>Balance</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.account}</td>
                                            <td>{i.total_income}</td>
                                            <td>{i.total_expense}</td>
                                            <td>{i.balance}</td>
                                            <td>
                                                <Link
                                                    to="/accounts/details"
                                                    className="btn btn-sm  btn-outline-info"
                                                    type="submit"
                                                >
                                                    Details
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

export default Index;
