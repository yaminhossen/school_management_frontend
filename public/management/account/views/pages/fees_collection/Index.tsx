import React, { useState, useEffect, useRef } from 'react';
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
export interface ClassInfo {
    account: { title: string };
    class: object;
    type: 'income' | 'expense';
    amount: number;
    s_class: number;
}
export interface FeesInfo {
    account: { title: string };
    class: object;
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
    const [classes, setClass] = useState<any>([]);
    const [feesTypes, setFeesTypes] = useState<FeesInfo[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);
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
    const studentIdRef = useRef<HTMLInputElement>(null);
    const fetchClass = async (id: string) => {
        try {
            const response = await axios.get(
                `/api/v1/user-students/student-class/${id}`,
            );
            setClass(response.data.data);

            // const response2 = await axios.get(
            //     '/api/v1/user-students/fees-categories/1',
            // );
            // setFeesTypes(response2.data.data);

            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };
    const fetchTypes = async (id: string) => {
        try {
            const response2 = await axios.get(
                `/api/v1/user-students/fees-categories/${id}`,
            );
            setFeesTypes(response2.data.data);

            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchAccounts();
        fetchAccountCategorys();
        fetchPeriods();
        // fetchClass();
    }, []);
    const handleStudentIdBlur = () => {
        const id = studentIdRef.current?.value; // Get the value from the ref
        console.log('studnet_id', id);

        if (id) {
            fetchClass(id); // Pass the id to fetchClass
        }
    };
    useEffect(() => {
        if (classes) {
            console.log('newlsdfjdslkfjdlsj', classes);
            let id = classes.s_class;
            console.log('newlsdfjdslkfjdlsj', id);
            fetchTypes(id);
        }
    }, [classes]);
    useEffect(() => {
        let sum = feesTypes.reduce(
            (t, i: anyObject) => (t += +(i.input_amount || 0)),
            0,
        );
        setTotalAmount(sum);
    }, [feesTypes]);

    console.log('feestypes', feesTypes);
    console.log('classes', classes);
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
                                            type="text"
                                            placeholder="student id"
                                            name="student_id"
                                            ref={studentIdRef} // Assign ref here
                                            onBlur={handleStudentIdBlur}
                                        />
                                    </div>
                                </div>
                                <input
                                    type="hidden"
                                    placeholder="student Class"
                                    name="class"
                                    value={classes.s_class}
                                />
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
                                {/* <div className="form-group form-vertical">
                                    <label>Amount</label>
                                    <div className="form_elements">
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
                                </div> */}
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
                                {/* <div className="form-group form-vertical">
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
                                </div> */}
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
                            <table className="mb-4">
                                <thead>
                                    <tr>
                                        {/* <th>Serial</th> */}
                                        <th>Title</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    <tr>
                                        {/* <td>1</td> */}
                                        <td>Name</td>
                                        <td>{classes.student?.name}</td>
                                    </tr>
                                    <tr>
                                        {/* <td>1</td> */}
                                        <td>ID</td>
                                        <td>{classes.student_id}</td>
                                    </tr>
                                    <tr>
                                        {/* <td>1</td> */}
                                        <td>Class</td>
                                        <td>{classes.class?.name}</td>
                                    </tr>
                                    <tr>
                                        {/* <td>1</td> */}
                                        <td>Addmission No</td>
                                        <td>{classes.addmission_no}</td>
                                    </tr>
                                    <tr>
                                        {/* <td>1</td> */}
                                        <td>Photo</td>
                                        <td>
                                            <img
                                                height="40px"
                                                src={classes.student?.image}
                                                alt=""
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Fees</th>
                                        <th>Given Amount</th>
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    <input
                                        type="hidden"
                                        name="total_fees_count"
                                        value={feesTypes.length}
                                    />
                                    {feesTypes?.length &&
                                        feesTypes?.map(
                                            (
                                                i: { [key: string]: any },
                                                index,
                                            ) => {
                                                return (
                                                    <tr>
                                                        <td>{i.name}</td>
                                                        <td>{i.amount}</td>
                                                        <td>
                                                            <input
                                                                name={`aaaa`}
                                                                type="number"
                                                                onChange={(
                                                                    event,
                                                                ) => {
                                                                    let temp = [
                                                                        ...feesTypes,
                                                                    ];
                                                                    temp[index][
                                                                        'input_amount'
                                                                    ] =
                                                                        event?.target.value;
                                                                    setFeesTypes(
                                                                        temp,
                                                                    );
                                                                }}
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            },
                                        )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td>Total</td>
                                        <td>
                                            {totalAmount} tk
                                            {/* <input
                                                type="text"
                                                name="total_amount"
                                            /> */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Total</td>
                                        <td>
                                            {
                                                (window as any).convertAmount(
                                                    totalAmount,
                                                ).bn
                                            }{' '}
                                            টাকা মাত্র
                                        </td>
                                    </tr>
                                </tfoot>
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
