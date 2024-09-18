import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState();

    useEffect(() => {
        // Function to fetch data
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/v1/account-logs/account/1');
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
    const [income, setIncome] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0);

    const updateFinancials = (type: string, amount: number): void => {
        if (type === 'income') {
            setIncome((prevIncome) => prevIncome + amount);
        } else if (type === 'expense') {
            setExpense((prevExpense) => prevExpense + amount);
        }
    };

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
                                    <th>Income</th>
                                    <th>Expense</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {data?.length &&
                                    data?.map(
                                        (i: { [key: string]: any }, index) => {
                                            return (
                                                <tr>
                                                    <td></td>
                                                    <td>{index + 1}</td>
                                                    <td>{i.account?.title}</td>
                                                    <td>
                                                        {i.type == 'income'
                                                            ? i.amount
                                                            : ''}
                                                    </td>
                                                    <td>
                                                        {i.type == 'expense'
                                                            ? i.amount
                                                            : ''}
                                                    </td>
                                                    {/* <td>{i.total_expense}</td> */}
                                                    <td>
                                                        {updateFinancials(
                                                            'income',
                                                            3545,
                                                        )}
                                                        {income}
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                                <tr>
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

export default Index;
