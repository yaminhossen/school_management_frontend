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
            date: '',
            category: 'Tution fee',
            year1: '50000',
            year2: '60000',
            year3: '100000',
        },
        {
            id: 2,
            category: 'Hostel bill',
            year1: '60000',
            year2: '70000',
            year3: '120000',
        },
        {
            id: 3,
            category: 'Admission Fee',
            year1: '120000',
            year2: '150000',
            year3: '200000',
        },
        {
            id: 4,
            category: 'Transport Fee',
            year1: '30000',
            year2: '40000',
            year3: '50000',
        },
        {
            id: 5,
            category: 'Transport Fee',
            year1: '30000',
            year2: '40000',
            year3: '50000',
        },
    ];

    return (
        <div className="admin_dashboard">
            <div className="content_body">
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
                                    <th>SERIAL</th>
                                    <th>INCOME</th>
                                    <th>CATEGORY</th>
                                    <th>Year - 2021</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td></td>
                                            {/* <td>{i.date}</td> */}
                                            <td>{i.category}</td>
                                            <td>{i.year1}</td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Income Total:</td>
                                    <td></td>
                                    <td>: 190000 tk</td>
                                </tr>
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td></td>
                                            {/* <td>{i.date}</td> */}
                                            <td>{i.category}</td>
                                            <td>{i.year1}</td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Expense Total:</td>
                                    <td></td>
                                    <td>: 190000 tk</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Profit Balance:</td>
                                    <td>Total:</td>
                                    <td>Cr : 70000 tk</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Loss Balance:</td>
                                    <td>Total:</td>
                                    <td>Cr : 00 tk</td>
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
