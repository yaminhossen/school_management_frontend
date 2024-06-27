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
            amount: '3000',
            purpose: 'hostel bill',
        },
        {
            id: 2,
            last_date: '14 March, 2024',
            amount: '10000',
            purpose: 'admission bill',
        },
        {
            id: 3,
            last_date: '15 Feb, 2024',
            amount: '5000',
            purpose: 'transport bill',
        },
    ];

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <form className="form_600 mx-auto pt-3">
                    <div className="form-group form-horizontal">
                        <label>Category</label>
                        <div className="form_elements">
                            <select name="category" id="">
                                <option value="hostel bill">Hostel bill</option>
                                <option value="hostel bill">
                                    Admission bill
                                </option>
                                <option value="hostel bill">
                                    Transport bill
                                </option>
                                <option value="hostel bill">
                                    Couching bill
                                </option>
                                <option value="hostel bill">
                                    Tournament fee
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Customer Name</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="Customer name"
                                name="customer_name"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Amount</label>
                        <div className="form_elements">
                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Amount in text</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                name="amount_in_text"
                                placeholder="Amount in text"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Date</label>
                        <div className="form_elements">
                            <input type="date" name="date" />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Attachment</label>
                        <div className="form_elements">
                            <input type="file" name="attachment" />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label></label>
                        <div className="form_elements">
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

export default Index;
