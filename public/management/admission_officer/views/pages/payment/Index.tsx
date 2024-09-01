import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { store } from './config/store/async_actions/store';
import moment from 'moment';
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
                                <h2 className="">Basic Information</h2>
                            </div>
                            <div className="d-flex">
                                <div className="form-group form-vertical">
                                    <label>Student Id</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="student id"
                                            name="student_id"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Gender</label>
                                    <div className="form_elements">
                                        <select name="gender" id="">
                                            <option value="male">male</option>
                                            <option value="female">
                                                female
                                            </option>
                                            <option value="others">
                                                others
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Email</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="email"
                                            name="email"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Phone number</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="phone number"
                                            name="phone_number"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Whatsapp</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="Whatsapp number"
                                            name="whatsapp_number"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Image</label>
                                    <div className="form_elements">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            placeholder="image"
                                            name="image"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Status</label>
                                    <div className="form_elements">
                                        <select name="status" id="">
                                            <option value="active">
                                                active
                                            </option>
                                            <option value="block">block</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Password</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="password"
                                            name="password"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Confirm Password</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="confirm password"
                                            name="confirm_password"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Email</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="email"
                                            name="email"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Phone number</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="phone number"
                                            name="phone_number"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Whatsapp</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="Whatsapp number"
                                            name="whatsapp_number"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Image</label>
                                    <div className="form_elements">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            placeholder="image"
                                            name="image"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Status</label>
                                    <div className="form_elements">
                                        <select name="status" id="">
                                            <option value="active">
                                                active
                                            </option>
                                            <option value="block">block</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Password</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="password"
                                            name="password"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Confirm Password</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="confirm password"
                                            name="confirm_password"
                                        />
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
