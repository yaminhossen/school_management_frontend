import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const Details: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            account: 'Sonali bank',
            account_num: '928494343',
            income: '30000',
            expense: '',
            balance: '30000',
        },
        {
            id: 2,
            account: 'Rupali bank',
            account_num: '57443435345',
            income: '10000',
            expense: '',
            balance: '40000',
        },
        {
            id: 3,
            account: 'Islami bank',
            account_num: '7543437546',
            income: '',
            expense: '10000',
            balance: '30000',
        },
    ];

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <Link
                    to="/accounts/details/account-number"
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
                                    <th>Account Number</th>
                                    <th>Income</th>
                                    <th>Expense</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.account}</td>
                                            <td>{i.account_num}</td>
                                            <td>{i.income}</td>
                                            <td>{i.expense}</td>
                                            <td>{i.balance}</td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Total:</td>
                                    <td>In : 40000 tk</td>
                                    <td>Ex : 10000 tk</td>
                                    <td>Bal : 30000 tk</td>
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
