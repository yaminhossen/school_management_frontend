import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../common_types/object';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        let formData = new FormData(e.target);

        try {
            // Make POST request with form data
            const response = await axios.post(
                '/api/v1/accounts/stor',
                formData,
            );
            // setResponseMessage('Form submitted successfully!');
            setData('Form submitted successfully!'); // Clear any previous error
            console.log('response', response);
        } catch (error) {
            // setError(error); // Set error state
            // setResponseMessage('Failed to submit form.');
            console.log('data', error.msg);
        }
        // console.log('data', error);
    };
    let date = moment().format('YYYY-MM-DD');
    console.log('date', date);

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <form onSubmit={handleSubmit} className="form_600 mx-auto pt-3">
                    <div className="form-group form-horizontal">
                        <label>Category</label>
                        <div className="form_elements">
                            <select name="category" id="">
                                <option value="1">Hostel bill</option>
                                <option value="1">Admission bill</option>
                                <option value="1">Transport bill</option>
                                <option value="1">Couching bill</option>
                                <option value="1">Tournament fee</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Account</label>
                        <div className="form_elements">
                            <select name="account" id="">
                                <option value="1">Cash</option>
                                <option value="1">Bank</option>
                                <option value="1">Roket</option>
                                <option value="1">Bkash</option>
                                <option value="1">Nagad</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Account Number</label>
                        <div className="form_elements">
                            <select name="account_number" id="">
                                <option value="1">01847834</option>
                                <option value="1">01294083</option>
                                <option value="1">09234328</option>
                                <option value="1">29038432</option>
                                <option value="1">29384902</option>
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
                    {/* <div className="form-group form-horizontal">
                        <label>Date</label>
                        <div className="form_elements">
                            <input
                                type="date"
                                defaultValue={date}
                                name="date"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Attachment</label>
                        <div className="form_elements">
                            <input type="file" name="attachment" />
                        </div>
                    </div> */}
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
