import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../common_types/object';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface AccountLog {
    account: { title: string };
    type: 'income' | 'expense';
    amount: number;
    account_log: [];
}
export interface TotalLog {
    total_expense?: number;
    total_income?: number;
}
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    // const [data, setData] = useState();
    const [totalIncome, setTotalIncome] = useState<TotalLog>({});
    const [data, setData] = useState<AccountLog[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                '/api/v1/accounts?orderByCol=id&orderByAsc=true&show_active_data=true&paginate=10&select_fields=title,status,opening_balance',
            );
            setData(response.data.data.data);
            setTotalIncome(response.data.data);
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
                                    <th>Opening Balance</th>
                                    <th>Total Income</th>
                                    <th>Total Expense</th>
                                    <th>Balance</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {data?.length &&
                                    data?.map((i: { [key: string]: any }) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{i.id}</td>
                                                <td>{i.title}</td>
                                                <td>{i.opening_balance} tk</td>
                                                <td>
                                                    {i.total_income
                                                        ? i.total_income
                                                        : '-'}{' '}
                                                </td>
                                                <td>
                                                    {' '}
                                                    {i.total_expense
                                                        ? i.total_expense
                                                        : '-'}{' '}
                                                </td>
                                                <td>
                                                    {i.total_income -
                                                        i.total_expense}{' '}
                                                    tk
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/accounts/details/${i.id}`}
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
                            {/* <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Total:</td>
                                <td>{totalIncome.total_income} tk</td>
                                <td>{totalIncome.total_expense} tk</td>
                            </tr> */}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
