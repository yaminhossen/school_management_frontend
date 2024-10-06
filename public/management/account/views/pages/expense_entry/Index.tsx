import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../common_types/object';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Accountinfo {
    account: { title: string };
    type: 'income' | 'expense';
    amount: number;
}
export interface Categoryinfo {
    account: { title: string };
    type: 'income' | 'expense';
    amount: number;
}
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState('');
    const [accounts, setAccounts] = useState<Accountinfo[]>([]);
    const [categories, setCategories] = useState<Categoryinfo[]>([]);
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        let formData = new FormData(e.target);

        try {
            // Make POST request with form data
            const response = await axios.post(
                '/api/v1/account-logs/expense-store',
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
    const fetchAccounts = async () => {
        try {
            const response = await axios.get('/api/v1/accounts/accounts');
            setAccounts(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };
    const fetchAccountCategorys = async () => {
        try {
            const response = await axios.get('/api/v1/account-categories/all');
            setCategories(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchAccounts();
        fetchAccountCategorys();
    }, []);
    console.log('account', accounts);
    console.log('category', categories);
    let date = moment().format('YYYY-MM-DD');

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <form onSubmit={handleSubmit} className="form_600 mx-auto pt-3">
                    <div className="form-group form-horizontal">
                        <label>Category</label>
                        <div className="form_elements">
                            <select name="category" id="">
                                {categories?.length &&
                                    categories?.map(
                                        (i: { [key: string]: any }) => {
                                            return (
                                                <option value={i.id}>
                                                    {i.title}
                                                </option>
                                            );
                                        },
                                    )}
                            </select>
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Account</label>
                        <div className="form_elements">
                            <select name="account" id="">
                                {accounts?.length &&
                                    accounts?.map(
                                        (i: { [key: string]: any }) => {
                                            return (
                                                <option value={i.id}>
                                                    {i.title}
                                                </option>
                                            );
                                        },
                                    )}
                            </select>
                        </div>
                    </div>
                    {/* <div className="form-group form-horizontal">
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
                    </div> */}
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
                                name={'amount'}
                                onChange={(e) => {
                                    let el = document.querySelector(
                                        'input[name="amount_in_text"]',
                                    );
                                    if (el) {
                                        (el as HTMLInputElement).value =
                                            (window as any).convertAmount(
                                                e.target.value,
                                            ).bn + ' টাকা মাত্র';
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Amount in text</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                name="amount_in_text"
                                // value={
                                //     (window as any).convertAmount(totalAmount)
                                //         .bn
                                // }
                            />
                            {/* {(window as any).convertAmount(totalAmount).bn}{' '}
                            মাত্র */}
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Receipt No</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="enter receipt page no"
                                name="receipt_no"
                            />
                        </div>
                    </div>
                    {/* <div className="form-group form-horizontal">
                        <label>Amount in text</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                name="amount_in_text"
                                placeholder="Amount in text"
                            />
                        </div>
                    </div> */}
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
