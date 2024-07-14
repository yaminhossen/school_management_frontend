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
            last_date: '10 Feb, 2024',
            income: '3000',
            expense: '2000',
            category: 'hostel bill',
        },
        {
            id: 2,
            last_date: '14 March, 2024',
            income: '10000',
            expense: '5000',
            category: 'admission bill',
        },
        {
            id: 3,
            last_date: '15 Feb, 2024',
            income: '5000',
            expense: '1000',
            category: 'transport bill',
        },
    ];

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
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.category}</td>
                                            <td>{i.income} tk</td>
                                            <td>{i.expense} tk</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Total:</td>
                                <td>18000 tk</td>
                                <td>8000 tk</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
