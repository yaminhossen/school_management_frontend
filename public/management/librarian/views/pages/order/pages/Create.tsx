import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const Create: React.FC<Props> = (props: Props) => {
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
        // {
        //     id: 4,
        //     order_no: '01ADC013',
        //     order_amount: '100',
        //     date: '10 March, 2024',
        // },
        // {
        //     id: 5,
        //     order_no: '01ADC014',
        //     order_amount: '120',
        //     date: '14 March, 2024',
        // },
        // {
        //     id: 6,
        //     order_no: '01ADC015',
        //     order_amount: '80',
        //     date: '15 March, 2024',
        // },
    ];
    return (
        <div className="admin_dashboard">
            {/* <h3>Create New Create</h3> */}
            <div className="content_body create_order">
                <form className="form_600aa mx-auto pt-3">
                    <div className="create_order_customer">
                        <div className="form-group form-horizontal">
                            <label>Customer Name</label>
                            <div className="form_elements">
                                <input
                                    type="text"
                                    placeholder="Customer Name"
                                    name="customer_name"
                                />
                            </div>
                        </div>
                        <div className="form-group form-horizontal">
                            <label>Phone Number</label>
                            <div className="form_elements">
                                <input
                                    type="text"
                                    placeholder="Customer Phone Number"
                                    name="phone_number"
                                />
                            </div>
                        </div>
                        <div className="form-group form-horizontal">
                            <label>Sales Date</label>
                            <div className="form_elements">
                                <input type="date" name="sales_date" />
                            </div>
                        </div>
                        <div className="form-group form-horizontal">
                            <label>Due Date</label>
                            <div className="form_elements">
                                <input type="date" name="due_date" />
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="create_order_search">
                        <div className="form-group form-vertical">
                            <label>Search Your Products</label>
                            <div className="form_elements">
                                <input
                                    type="search"
                                    placeholder="product name/id/code"
                                    name="customer_name"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="data_list">
                        <div className="table_responsive custom_scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Serial</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Unit price</th>
                                        <th>Total Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    {/* {datas?.map((i: { [key: string]: any }) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{i.id}</td>
                                                <td>{i.order_no}</td>
                                                <td>{i.date}</td>
                                                <td>{i.order_amount}</td>
                                                <td>{i.order_amount}</td>
                                                <td>
                                                    <Link
                                                        className="btn btn-sm order_delete_btn mr-1"
                                                        to="/student/details"
                                                    >
                                                        X
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })} */}
                                    <tr>
                                        <td></td>
                                        <td>rew</td>
                                        <td>sg</td>
                                        <td>
                                            <div className="create_order_quantity">
                                                <div>-</div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        id=""
                                                    />
                                                </div>
                                                <div>+</div>
                                            </div>
                                        </td>
                                        <td>sdf</td>
                                        <td>sgf</td>
                                        <td>sdf</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label></label>
                        <div className="form_elements mt-4">
                            <button className="btn btn-sm btn-outline-info">
                                submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
