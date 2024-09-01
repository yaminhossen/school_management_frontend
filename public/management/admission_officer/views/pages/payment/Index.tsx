import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { store } from './config/store/async_actions/store';
import moment from 'moment/moment';
// import storeSlice from '../config/store';
import storeSlice from './config/store';
import { initialState } from './config/store/inital_state';
import { useSelector } from 'react-redux';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const [totalDocument, setTotalDocument] = useState([1, 1, 1]);
    // let date22 = moment().format('YYYY-DD-MM');

    async function handle_submit(e) {
        e.preventDefault();
        console.log('this is clikck');

        let response = await dispatch(store(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            // e.target.reset();
        }
    }
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    // console.log('moment', moment().format('YYYY-DD-MM'));

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <form
                    onSubmit={(e) => handle_submit(e)}
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
                                <div className="form-group form-vertical">
                                    <label>Class</label>
                                    <div className="form_elements">
                                        <select name="class" id="">
                                            <option value="5">Ten</option>
                                            <option value="2">Six</option>
                                            <option value="3">Seven</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Branch</label>
                                    <div className="form_elements">
                                        <select name="branch_id" id="">
                                            <option value="1">Kustia</option>
                                            <option value="2">
                                                Demra, Dhaka
                                            </option>
                                            <option value="3">
                                                Uttora, Dhaka
                                            </option>
                                        </select>
                                    </div>
                                </div>
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
                                        <input
                                            type="number"
                                            placeholder="enter your amount"
                                            name="amount"
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
                                            <option value="1">
                                                Hostel bill
                                            </option>
                                            <option value="2">
                                                Admission bill
                                            </option>
                                            <option value="3">
                                                Couching bill
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Account</label>
                                    <div className="form_elements">
                                        <select name="account_id" id="">
                                            <option value="1">Bank</option>
                                            <option value="2">Bkash</option>
                                            <option value="3">Nagad</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Account Period</label>
                                    <div className="form_elements">
                                        <select name="period_id" id="">
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Money Receipt Book</label>
                                    <div className="form_elements">
                                        <select name="mrb_id" id="">
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group student_submit form-horizontal">
                        <label></label>
                        <div className="form_elements">
                            <button className="btn btn-sm  btn-outline-info">
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
