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
            const response = await axios.get('/api/v1/account-logs/debit');
            setData(response.data.data);
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
                    to="/income-entry"
                    className="btn btn-sm btn-outline-info mb-2"
                    type="submit"
                >
                    Create
                </Link>
                <form action="">
                    <div className="teacher_result">
                        <div>
                            <div>Month</div>
                            <div>
                                <input type="date" name="month1" id="" />
                            </div>
                        </div>
                        <div>
                            <div>Month</div>
                            <div>
                                <input type="date" name="month2" id="" />
                            </div>
                        </div>
                        <button
                            className="btn btn-sm btn-outline-info "
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Purpose</th>
                                    <th>Date</th>
                                    {/* <th>Amount in Text</th> */}
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {data?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.category?.title}</td>
                                            <td>
                                                {moment(i.createdAt).format(
                                                    'YYYY-MM-DD',
                                                )}
                                            </td>
                                            {/* <td>{i.amount_in_text}</td> */}
                                            <td>{i.amount} tk</td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Total:</td>
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

export default Index;
