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
export interface Periodinfo {
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
    const [periods, setPeriods] = useState<Periodinfo[]>([]);
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        let formData = new FormData(e.target);

        try {
            // Make POST request with form data
            const response = await axios.post(
                '/api/v1/account-logs/fees-store',
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
    const fetchPeriods = async () => {
        try {
            const response = await axios.get('/api/v1/account-logs/periods');
            setPeriods(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchAccounts();
        fetchAccountCategorys();
        fetchPeriods();
    }, []);
    console.log('account', accounts);
    console.log('category', categories);
    console.log('periods', periods);
    let date = moment().format('YYYY-MM-DD');

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <form
                    onSubmit={handleSubmit}
                    className="form_6002 mx-auto pt-3"
                >
                    <div className="student_form">
                        <div className="full_width">
                            <div className="form_section_heading">
                                <h2 className="">Fees Collection</h2>
                            </div>
                            <div className="d-flex">
                                <div className="form-group form-vertical">
                                    <label>Student Id</label>
                                    <div className="form_elements">
                                        <input
                                            type="number"
                                            placeholder="student id"
                                            name="student_id"
                                        />
                                    </div>
                                </div>
                                {/* <div className="form-group form-vertical">
                                    <label>Branch</label>
                                    <div className="form_elements">
                                        <select name="branch_id" id="">
                                            <option value={1}>gjfjhj</option>
                                        </select>
                                    </div>
                                </div> */}
                                <div className="form-group form-vertical">
                                    <label>Date</label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            defaultValue={moment().format(
                                                'YYYY-MM-DD',
                                            )}
                                            name="date"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Amount</label>
                                    <div className="form_elements">
                                        {/* <input
                                            type="number"
                                            placeholder="enter your amount"
                                            name="amount"
                                        /> */}
                                        <input
                                            name={'amount'}
                                            onChange={(e) => {
                                                let el = document.querySelector(
                                                    'input[name="amount_in_text"]',
                                                );
                                                if (el) {
                                                    (
                                                        el as HTMLInputElement
                                                    ).value =
                                                        (
                                                            window as any
                                                        ).convertAmount(
                                                            e.target.value,
                                                        ).en + ' tk only';
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Amount In Text</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            // placeholder="enter your amount"
                                            name="amount_in_text"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Receipt No</label>
                                    <div className="form_elements">
                                        <input
                                            type="number"
                                            placeholder="enter receipt page no"
                                            name="receipt_no"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Type</label>
                                    <div className="form_elements">
                                        <select name="type" id="">
                                            <option value="income">
                                                Income
                                            </option>
                                            <option value="expense">
                                                Expense
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Account Category</label>
                                    <div className="form_elements">
                                        <select name="category_id" id="">
                                            {categories?.length &&
                                                categories?.map(
                                                    (i: {
                                                        [key: string]: any;
                                                    }) => {
                                                        return (
                                                            <option
                                                                value={i.id}
                                                            >
                                                                {i.title}
                                                            </option>
                                                        );
                                                    },
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Account</label>
                                    <div className="form_elements">
                                        <select name="account_id" id="">
                                            {accounts?.length &&
                                                accounts?.map(
                                                    (i: {
                                                        [key: string]: any;
                                                    }) => {
                                                        return (
                                                            <option
                                                                value={i.id}
                                                            >
                                                                {i.title}
                                                            </option>
                                                        );
                                                    },
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Account Period</label>
                                    <div className="form_elements">
                                        <select name="period_id" id="">
                                            {periods?.length &&
                                                periods?.map(
                                                    (i: {
                                                        [key: string]: any;
                                                    }) => {
                                                        return (
                                                            <option
                                                                value={i.id}
                                                            >
                                                                {moment(
                                                                    i.year_month,
                                                                ).format(
                                                                    'YYYY-MM-DD',
                                                                )}
                                                            </option>
                                                        );
                                                    },
                                                )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="data_list">
                        <div className="table_responsive  custom_scroll">
                            <table className="">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Fees</th>
                                        <th>Given Amount</th>
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    <tr>
                                        <td>Addmission bill</td>
                                        <td>5000</td>
                                        <td>
                                            <input type="number" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="form-group student_submit form-horizontal">
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
