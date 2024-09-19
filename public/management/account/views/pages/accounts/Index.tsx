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
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    // const [data, setData] = useState();
    const [data, setData] = useState<AccountLog[]>([]);

    useEffect(() => {
        // Function to fetch data
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/v1/accounts/all');
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
                                                <td>{i.opening_balance}</td>
                                                <td>{i.total_income}</td>
                                                <td>{i.total_expense}</td>
                                                <td>{i.balance}</td>
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
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
