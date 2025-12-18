import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { store } from './config/store/async_actions/store';
export interface Props {}
import InputImage from './components/management_data_page/InputImage';
import { initialState } from './config/store/inital_state';
import { useSelector } from 'react-redux';
import storeSlice from './config/store';
import { branches } from './config/store/async_actions/branches';

const Create: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();

    async function initdependancy() {
        await dispatch(storeSlice.actions.set_item({}));
        await dispatch(branches({}) as any);
    }

    useEffect(() => {
        initdependancy();
    }, []);
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
                                            <label>Branch</label>
                                            <div className="form_elements">
                                                <select name="branch_id" id="">
                                                    <option value="">
                                                        Select branch
                                                    </option>
                                                    {state.branches?.length &&
                                                        state.branches?.map(
                                                            (i: {
                                                                [
                                                                    key: string
                                                                ]: any;
                                                            }) => {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            i.id
                                                                        }
                                                                    >
                                                                        {i.name}
                                                                    </option>
                                                                );
                                                            },
                                                        )}
                                                </select>
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
                                                name={'image'}
                                                defalut_preview={get_value('')}
                                            />
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
                                                        color: '#eeeeee',
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
                                </div>
                            </div>
                            <div className="form-group student_submit form-horizontal">
                                {/* <label></label> */}
                                <div className="form_elementss">
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
