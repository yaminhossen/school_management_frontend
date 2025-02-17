import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment';

export interface Accountinfo {
    id: number;
    title: string;
    type: 'income' | 'expense';
    amount: number;
}

export interface Categoryinfo {
    id: number;
    title: string;
    account: { title: string };
    type: 'income' | 'expense';
    amount: number;
}

export interface Props {}

const Index: React.FC<Props> = () => {
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState('');
    const [accounts, setAccounts] = useState<Accountinfo[]>([]);
    const [categories, setCategories] = useState<Categoryinfo[]>([]);
    const [file, setFile] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        try {
            await axios.post('/api/v1/account-logs/expense-store', formData);
            setData('Form submitted successfully!');
            (window as any).toaster('submitted');
            e.currentTarget.reset();
        } catch (error) {
            setError(error as Error);
        }
    };

    const fetchAccounts = async () => {
        try {
            const response = await axios.get<{ data: Accountinfo[] }>(
                '/api/v1/accounts/accounts',
            );
            setAccounts(response.data.data);
        } catch (error) {
            setError(error as Error);
        }
    };

    const fetchAccountCategorys = async () => {
        try {
            const response = await axios.get<{ data: Categoryinfo[] }>(
                '/api/v1/account-categories/all',
            );
            setCategories(response.data.data);
        } catch (error) {
            setError(error as Error);
        }
    };

    const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    };

    useEffect(() => {
        fetchAccounts();
        fetchAccountCategorys();
    }, []);

    const date = moment().format('YYYY-MM-DD');

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <form onSubmit={handleSubmit} className="form_600 mx-auto pt-3">
                    <div className="form-group form-horizontal">
                        <label>Category</label>
                        <div className="form_elements">
                            <select name="category" required>
                                <option value="">Select Category</option>
                                {categories.map((i) => (
                                    <option key={i.id} value={i.id}>
                                        {i.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group form-horizontal">
                        <label>Account</label>
                        <div className="form_elements">
                            <select name="account" required>
                                <option value="">Select Account</option>
                                {accounts.map((i) => (
                                    <option key={i.id} value={i.id}>
                                        {i.title}
                                    </option>
                                ))}
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
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group form-horizontal">
                        <label>Amount</label>
                        <div className="form_elements">
                            <input
                                type="number"
                                name="amount"
                                required
                                onChange={(e) => {
                                    const el = document.querySelector(
                                        'input[name="amount_in_text"]',
                                    ) as HTMLInputElement;
                                    if (el) {
                                        el.value =
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
                            <input type="text" name="amount_in_text" readOnly />
                        </div>
                    </div>

                    <div className="form-group form-horizontal">
                        <label>Receipt No</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="Enter receipt page no"
                                name="receipt_no"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group form-horizontal">
                        <label>Date</label>
                        <div className="form_elements">
                            <input
                                type="date"
                                defaultValue={date}
                                name="date"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group form-horizontal">
                        <label>Attachment</label>
                        <div className="form_elements">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                name="attachment"
                                onChange={getFile}
                            />
                        </div>
                    </div>

                    {file && (
                        <div className="form-group form-horizontal">
                            <label>Preview</label>
                            <div className="form_elements">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={file}
                                >
                                    <img
                                        src={file}
                                        className="img-80"
                                        alt="Preview"
                                    />
                                </a>
                            </div>
                        </div>
                    )}

                    <div className="form-group form-horizontal">
                        <label></label>
                        <div className="form_elements">
                            <button
                                type="submit"
                                className="btn btn-sm btn-outline-info"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>

                {error && <p className="error-message">{error.message}</p>}
                {data && <p className="success-message">{data}</p>}
            </div>
        </div>
    );
};

export default Index;
