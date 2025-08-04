import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/management_data_page/Header';
import Footer from '../components/management_data_page/Footer';
import { useSelector } from 'react-redux';
import setup from '../config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { initialState } from '../config/store/inital_state';
import { useParams } from 'react-router-dom';
import storeSlice from '../config/store';
import { update } from '../config/store/async_actions/update';
import moment from 'moment/moment';
import InputImage from '../components/management_data_page/InputImage';
import Input from '../components/management_data_page/Input';
import { details } from '../config/store/async_actions/details';
import { details2 } from '../config/store/async_actions/details2';
import { store } from '../config/store/async_actions/store';
export interface Props {}

const Edit: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(storeSlice.actions.set_only_latest_data(true));
            dispatch(storeSlice.actions.set_item({}));
            await new Promise((resolve) => setTimeout(resolve, 200));
            dispatch(details2({ id }) as any);
            dispatch(storeSlice.actions.set_only_latest_data(false));
        };

        fetchData();
    }, []);

    async function handle_submit(e) {
        e.preventDefault();
        let response = await dispatch(store(new FormData(e.target)) as any);
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
                    <Header page_title={setup.edit_page_title}></Header>

                    {Object.keys(state.item).length && (
                        <div className="content_body custom_scroll">
                            <form
                                onSubmit={(e) => handle_submit(e)}
                                className="form_600 mx-auto pt-3"
                            >
                                <input
                                    type="hidden"
                                    name="id"
                                    defaultValue={id}
                                />

                                <div className="form-group form-horizontal">
                                    <label>
                                        Description{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <textarea
                                            name="description2"
                                            id=""
                                            placeholder="description"
                                            defaultValue={
                                                state.item?.description
                                            }
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <InputImage
                                        label={'Attachment'}
                                        name={'attachment'}
                                        defalut_preview={get_value(
                                            'attachment',
                                        )}
                                    />
                                </div>
                                <div className="form-group student_submit form-horizontal">
                                    {/* <label></label> */}
                                    <div className="form_elementss">
                                        <button className="btn btn_1 btn-outline-info">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Edit;
