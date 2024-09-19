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
    const [totalIncome, setTotalIncome] = useState<TotalLog>({});
    // const [totalExpense, setTotalExpense] = useState();
    const [data, setData] = useState<AccountLog[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/v1/account-categories');
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
                    to="/account-category/create"
                    className="btn btn-sm btn-outline-info mb-2"
                    type="submit"
                >
                    Create category
                </Link>
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Category</th>
                                    <th>Income</th>
                                    <th>Expense</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {data?.map(
                                    (i: { [key: string]: any }, index) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{index + 1}</td>
                                                <td>{i.category}</td>
                                                <td>{i.income} tk</td>
                                                <td>{i.expense} tk</td>
                                            </tr>
                                        );
                                    },
                                )}
                            </tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Total:</td>
                                <td>{totalIncome.total_income} tk</td>
                                <td>{totalIncome.total_expense} tk</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
