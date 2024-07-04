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
            order_no: '01ADC010',
            order_amount: '300',
            date: '12 Jan, 2024',
        },
        {
            id: 2,
            order_no: '01ADC011',
            order_amount: '280',
            date: '10 Jan, 2024',
        },
        {
            id: 3,
            order_no: '01ADC012',
            order_amount: '10',
            date: '15 Feb, 2024',
        },
        {
            id: 4,
            order_no: '01ADC013',
            order_amount: '100',
            date: '10 March, 2024',
        },
        {
            id: 5,
            order_no: '01ADC014',
            order_amount: '120',
            date: '14 March, 2024',
        },
        {
            id: 6,
            order_no: '01ADC015',
            order_amount: '80',
            date: '15 March, 2024',
        },
    ];

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <div className="order_invoice">
                    <div className="invoice_top">
                        <div className="">
                            <div className="invoice_top_left">
                                <div className="invoice_photo">
                                    <img
                                        src="/assets/dashboard/images/book.jpeg"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <h3>Ecommerce Surface</h3>
                                </div>
                            </div>
                            <div className="invoice_num_date">
                                <p>Invoice Number: 1220</p>
                                <p>Date: 02/02/2022</p>
                            </div>
                        </div>
                        <div className="invoice_top_right">
                            <h3>
                                <span className="horizon_line1"></span>
                                <span className="horizon_line2"></span>
                                <span>I</span>
                                <span>N</span>
                                <span>V</span>
                                <span>O</span>
                                <span>I</span>
                                <span>C</span>
                                <span>E</span>
                            </h3>
                        </div>
                    </div>
                    <div className="invoice_horizontal_border"></div>
                    <div className="data_list">
                        <div className="table_responsive custom_scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Serial</th>
                                        <th>Order No.</th>
                                        <th>Date</th>
                                        <th>Order Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    {datas?.map((i: { [key: string]: any }) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{i.id}</td>
                                                <td>{i.order_no}</td>
                                                <td>{i.date}</td>
                                                <td>{i.order_amount}</td>
                                                <td>
                                                    <Link
                                                        className="btn btn-sm btn-outline-info mr-1"
                                                        to="/order/details"
                                                    >
                                                        details
                                                    </Link>
                                                    {/* <Link
                                                    className="btn btn-sm btn-outline-info"
                                                    to="/class-attendance/take-attendance"
                                                >
                                                    Take attendance
                                                </Link> */}
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
        </div>
    );
};

export default Index;
