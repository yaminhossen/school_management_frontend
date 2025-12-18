import React from 'react';
import Header from '../components/management_data_page/Header';
import Footer from '../components/management_data_page/Footer';
import setup from '../config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { store } from '../config/store/async_actions/store';
import DropDown from '../components/dropdown/DropDown';
import InputImage from '../components/management_data_page/InputImage';
import { useSelector } from 'react-redux';
import { initialState } from '../config/store/inital_state';
import { useParams } from 'react-router-dom';
import storeSlice from '../config/store';
import { all } from 'axios';
import { teacher_complete } from '../config/store/async_actions/teacher_complete';
import { unseen_tasks } from '../config/store/async_actions/unseen_tasks';
export interface Props {}

const Create: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const dispatch = useAppDispatch();
    const { id } = useParams();

    async function handle_submit(e) {
        e.preventDefault();
        let response = await dispatch(store(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
        }
        dispatch(storeSlice.actions.set_only_latest_data(true));
        // dispatch(all({}) as any);
        await new Promise((resolve) => setTimeout(resolve, 300));
        dispatch(teacher_complete({}) as any);
        await new Promise((resolve) => setTimeout(resolve, 200));
        dispatch(unseen_tasks({}) as any);
        dispatch(storeSlice.actions.set_only_latest_data(false));
    }

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

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.create_page_title}></Header>
                    <div className="content_body custom_scroll">
                        <form
                            onSubmit={(e) => handle_submit(e)}
                            className="form_600 mx-auto pt-3"
                        >
                            <div className="">
                                <div className="form-group form-horizontal">
                                    <label>
                                        Description{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <textarea
                                            name="description"
                                            id=""
                                            placeholder="description"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <InputImage
                                        label={'Attachment'}
                                        name={'attachment'}
                                        defalut_preview={get_value('')}
                                    />
                                </div>
                                <input
                                    hidden
                                    name="id"
                                    type="text"
                                    value={id}
                                />
                            </div>
                            <div className="form-group student_submit form-horizontal">
                                <label></label>
                                <div className="form_elements">
                                    <button className="btn btn_1 btn-outline-info">
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
