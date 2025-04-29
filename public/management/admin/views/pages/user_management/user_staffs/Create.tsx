import React, { useRef, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { store } from './config/store/async_actions/store';
import DropDown from './components/dropdown/DropDown';
export interface Props {}
import moment from 'moment/moment';
import InputImage from './components/management_data_page/InputImage';
import { initialState } from './config/store/inital_state';
import { useSelector } from 'react-redux';

const Create: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();

    function get_value(key) {
        try {
            if (state.item[key]) return state.item[key];
            if (state.item?.staff_infos[key])
                return state.item?.staff_infos[key];
        } catch (error) {
            return '';
        }
        return '';
    }

    async function handle_submit(e) {
        e.preventDefault();
        let response = await dispatch(store(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
        }
    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.create_page_title}></Header>
                    <div className="content_body custom_scroll">
                        <form
                            onSubmit={(e) => handle_submit(e)}
                            className="form_6002 mx-auto pt-3"
                        >
                            <div className="student_form">
                                <div className="full_width">
                                    <div className="form_section_heading">
                                        <h2 className=""> Major Information</h2>
                                    </div>
                                    <div className="d-flex">
                                        <div className="form-group form-horizontal">
                                            <label>
                                                Name{' '}
                                                <span className="valid_star">
                                                    *
                                                </span>
                                            </label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="name"
                                                    name="name"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>
                                                Email{' '}
                                                <span className="valid_star">
                                                    *
                                                </span>
                                            </label>
                                            <div className="form_elements">
                                                <input
                                                    type="email"
                                                    placeholder="email"
                                                    name="email"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>
                                                Phone number{' '}
                                                <span className="valid_star">
                                                    *
                                                </span>
                                            </label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="01XXX or +8801XXX"
                                                    name="phone_number"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <InputImage
                                                label={'Image'}
                                                name={'staff_image'}
                                                defalut_preview={get_value('')}
                                            />
                                            {/* <div className="form_elements">
                                            </div> */}
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>
                                                Password{' '}
                                                <span className="valid_star">
                                                    *
                                                </span>
                                            </label>
                                            <div
                                                className="form_elements_valid"
                                                style={{ position: 'relative' }}
                                            >
                                                <input
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    placeholder="Password"
                                                    name="password"
                                                    style={{
                                                        paddingRight: '40px',
                                                        width: '214px',
                                                    }}
                                                />
                                                <span
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
                                                    }
                                                    className="material-symbols-outlined visible_icon"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        right: '10px',
                                                        cursor: 'pointer',
                                                        color: '#666',
                                                        fontSize: '24px',
                                                        userSelect: 'none',
                                                    }}
                                                >
                                                    {showPassword
                                                        ? 'visibility_off'
                                                        : 'visibility'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="full_width">
                                        <div className="form_section_heading">
                                            <h2 className="">
                                                Basic Information
                                            </h2>
                                        </div>
                                        <div className="d-flex">
                                            <div className="form-group form-horizontal">
                                                <label>
                                                    Parmanent Address{' '}
                                                    <span className="valid_star">
                                                        *
                                                    </span>
                                                </label>
                                                <div className="form_elements">
                                                    <input
                                                        type="text"
                                                        placeholder="Parmenent address"
                                                        name="parmenent_address"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group form-horizontal">
                                                <label>Country</label>
                                                <div className="form_elements">
                                                    <input
                                                        type="text"
                                                        placeholder="country"
                                                        name="country"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group form-horizontal">
                                                <label>District</label>
                                                <div className="form_elements">
                                                    <input
                                                        type="text"
                                                        placeholder="district"
                                                        name="district"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group form-horizontal">
                                                <label>Post Code</label>
                                                <div className="form_elements">
                                                    <input
                                                        type="text"
                                                        placeholder="post_code"
                                                        name="post_code"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group form-horizontal">
                                                <label>Present Address</label>
                                                <div className="form_elements">
                                                    <input
                                                        type="text"
                                                        placeholder="present address"
                                                        name="present_address"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group form-horizontal">
                                                <label>
                                                    Alternative Number{' '}
                                                    <span className="valid_star">
                                                        *
                                                    </span>
                                                </label>
                                                <div className="form_elements">
                                                    <input
                                                        type="text"
                                                        placeholder="01XXX or +8801XXX"
                                                        name={`guardian_contact_number`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group form-horizontal">
                                                <label>Qualification</label>
                                                <div className="form_elements">
                                                    <input
                                                        type="text"
                                                        placeholder="qualification"
                                                        name="qualification"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group form-horizontal">
                                                <label>Gender</label>
                                                <div className="form_elements">
                                                    <select name="gender" id="">
                                                        <option value="">
                                                            Select gender
                                                        </option>
                                                        <option value="male">
                                                            male
                                                        </option>
                                                        <option value="female">
                                                            female
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-horizontal">
                                                <label>Is Married</label>
                                                <div className="form_elements">
                                                    <select
                                                        name="is_married"
                                                        id=""
                                                    >
                                                        <option value="">
                                                            Are you married
                                                        </option>
                                                        <option value="1">
                                                            yes
                                                        </option>
                                                        <option value="0">
                                                            no
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-horizontal">
                                                <label>Blood group</label>
                                                <div className="form_elements">
                                                    <select
                                                        name="blood_group"
                                                        id=""
                                                    >
                                                        <option value="">
                                                            Select Group
                                                        </option>
                                                        <option value="A+">
                                                            A+
                                                        </option>
                                                        <option value="B+">
                                                            B+
                                                        </option>
                                                        <option value="A-">
                                                            A-
                                                        </option>
                                                        <option value="AB-">
                                                            AB-
                                                        </option>
                                                        <option value="AB+">
                                                            AB+
                                                        </option>
                                                        <option value="B-">
                                                            B-
                                                        </option>
                                                        <option value="O+">
                                                            O+
                                                        </option>
                                                        <option value="O-">
                                                            O-
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group form-horizontal">
                                                <label>Joining Date</label>
                                                <div className="form_elements">
                                                    <input
                                                        type="date"
                                                        name="joining_date"
                                                        defaultValue={moment().format(
                                                            'YYYY-MM-DD',
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className="form-group form-horizontal">
                                                <label>Department</label>
                                                <div className="form_elements">
                                                    <input
                                                        type="text"
                                                        placeholder="department"
                                                        name="department"
                                                    />
                                                </div>
                                            </div> */}
                                            <div className="form-group form-horizontal">
                                                <label>Role</label>
                                                <div className="form_elements">
                                                    <select name="role" id="">
                                                        <option value="">
                                                            Select role
                                                        </option>
                                                        <option value="principle">
                                                            principle
                                                        </option>
                                                        <option value="admin">
                                                            admin
                                                        </option>
                                                        <option value="admission-officer">
                                                            admission-officer
                                                        </option>
                                                        <option value="librarian">
                                                            librarian
                                                        </option>
                                                        <option value="accountant">
                                                            accountant
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            {/* <div className="form-group form-horizontal">
                                                <label>Responsibilies</label>
                                                <div className="form_elements">
                                                    <input
                                                        type="text"
                                                        placeholder="responsibility"
                                                        name="responsibility"
                                                    />
                                                </div>
                                            </div> */}
                                            <div className="form-group form-horizontal">
                                                <InputImage
                                                    label={'National Id'}
                                                    name={'national_id'}
                                                    defalut_preview={get_value(
                                                        '',
                                                    )}
                                                />
                                            </div>
                                            <div className="form-group form-horizontal">
                                                <InputImage
                                                    label={'Certificate No. 1'}
                                                    name={'certificate_1'}
                                                    defalut_preview={get_value(
                                                        '',
                                                    )}
                                                />
                                            </div>
                                            <div className="form-group form-horizontal">
                                                <InputImage
                                                    label={'Certificate No. 2'}
                                                    name={'certificate_2'}
                                                    defalut_preview={get_value(
                                                        '',
                                                    )}
                                                />
                                            </div>
                                            {/* <div className="form-group form-horizontal">
                                                <label>National Id</label>
                                                <div className="form_elements">
                                                    <input
                                                        type="file"
                                                        placeholder="national id"
                                                        name="national_id"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group form-horizontal">
                                                <label>Certificate No. 1</label>
                                                <div className="form_elements">
                                                    <input
                                                        type="file"
                                                        placeholder="certificate 1"
                                                        name="certificate_1"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group form-horizontal">
                                                <label>Certificate No. 2</label>
                                                <div className="form_elements">
                                                    <input
                                                        type="file"
                                                        placeholder="certificate 2"
                                                        name="certificate_2"
                                                    />
                                                </div>
                                            </div> */}
                                            {/* <div className="form-group form-horizontal">
                                                <label>Status</label>
                                                <div className="form_elements">
                                                    <select name="status" id="">
                                                        <option value="active">
                                                            active
                                                        </option>
                                                        <option value="block">
                                                            block
                                                        </option>
                                                    </select>
                                                </div>
                                            </div> */}
                                            {/* <div className="form-group form-horizontal">
                                                <label>Position</label>
                                                <div className="form_elements">
                                                    <select
                                                        name="position"
                                                        id=""
                                                    >
                                                        <option value="accountant">
                                                            accountant
                                                        </option>
                                                        <option value="senior">
                                                            senior
                                                        </option>
                                                        <option value="junior">
                                                            junior
                                                        </option>
                                                    </select>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group student_submit form-horizontal">
                                <label></label>
                                <div className="form_elements">
                                    <button className="btn btn_1">
                                        submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Create;
