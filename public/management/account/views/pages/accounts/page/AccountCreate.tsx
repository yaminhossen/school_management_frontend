import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const Account: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        let formData = new FormData(e.target);

        try {
            // Make POST request with form data
            const response = await axios.post(
                '/api/v1/accounts/store',
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
                        <label>Account Name</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="Enter Account Name"
                                name="account_name"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Account Number</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="Enter Account Number"
                                name="account_number"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Opening Balance</label>
                        <div className="form_elements">
                            <input
                                type="number"
                                placeholder="Your opening balance"
                                name="opening_balance"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Description</label>
                        <div className="form_elements">
                            <textarea
                                name="description"
                                placeholder="Description"
                                id=""
                            ></textarea>
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
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

export default Account;
