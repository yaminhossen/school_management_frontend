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
            date: '10 Feb, 2024',
            amount_in_text: 'Three thousand taka only',
            purpose: 'hostel rent',
            credit: '',
            debit: '3000',
            balance: '-3000',
            name: 'Shahin',
        },
        {
            id: 2,
            date: '14 Feb, 2024',
            amount_in_text: 'Ten thousand taka only',
            purpose: 'admission bill',
            credit: '3000',
            debit: '',
            balance: '',
            name: 'Tamim',
        },
        {
            id: 3,
            date: '15 Feb, 2024',
            amount_in_text: 'Five thousand taka only',
            purpose: 'transport bill',
            credit: '3000',
            debit: '',
            balance: '3000',
            name: 'Ramim',
        },
        {
            id: 4,
            date: '23 Feb, 2024',
            amount_in_text: 'Threee thousand taka only',
            purpose: 'Tution fee',
            credit: '3000',
            debit: '',
            balance: '6000',
            name: 'Ramim',
        },
        {
            id: 5,
            date: '23 Feb, 2024',
            amount_in_text: 'Fifteen thousand taka only',
            purpose: 'Tution fee',
            credit: '15000',
            debit: '',
            balance: '21000',
            name: 'Riaz',
        },
        {
            id: 6,
            date: '23 Feb, 2024',
            amount_in_text: 'Twenty thousand taka only',
            purpose: 'Tution fee',
            credit: '20000',
            debit: '',
            balance: '41000',
            name: 'Areeba',
        },
        {
            id: 7,
            date: '23 Feb, 2024',
            amount_in_text: 'Twenty thousand taka only',
            purpose: 'Sallary',
            credit: '',
            debit: '20000',
            balance: '21000',
            name: 'Employee1',
        },
        {
            id: 8,
            date: '23 Feb, 2024',
            amount_in_text: 'Ten thousand taka only',
            purpose: 'Sallary',
            credit: '',
            debit: '10000',
            balance: '11000',
            name: 'Employee2',
        },
    ];

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                {/* <Link
                    to="/income-entry"
                    className="btn btn-sm btn-outline-info mb-2"
                    type="submit"
                >
                    Create
                </Link> */}
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
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Amount in Text</th>
                                    <th>Debit</th>
                                    <th>Credit</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.purpose}</td>
                                            <td>{i.name}</td>
                                            <td>{i.date}</td>
                                            <td>{i.amount_in_text}</td>
                                            <td>{i.debit} tk</td>
                                            <td>{i.credit} tk</td>
                                            <td>{i.balance} tk</td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Total:</td>
                                    <td>dbt : 33000 tk</td>
                                    <td>Cr : 44000 tk</td>
                                    <td>Bal : 11000 tk</td>
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
