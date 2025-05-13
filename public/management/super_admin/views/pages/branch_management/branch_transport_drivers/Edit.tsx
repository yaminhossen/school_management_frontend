import React, { useEffect } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { useParams } from 'react-router-dom';
import storeSlice from './config/store';
import { update } from './config/store/async_actions/update';
import InputImage from './components/management_data_page/InputImage';
export interface Props {}

const Edit: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, []);

    async function handle_submit(e) {
        e.preventDefault();
        let response = await dispatch(update(new FormData(e.target)) as any);
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
                                    defaultValue={state.item.id}
                                />
                                <div className="form-group form-horizontal">
                                    <label>
                                        Name{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="name"
                                            name="name"
                                            defaultValue={state.item.name}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Present address{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="present address"
                                            name="present_address"
                                            defaultValue={
                                                state.item.present_address
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Permanent address{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="permanent address"
                                            name="permanent_address"
                                            defaultValue={
                                                state.item.permanent_address
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        licence number{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="licence number"
                                            name="licence_number"
                                            defaultValue={
                                                state.item.licence_number
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Driver licence{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <InputImage
                                            label={''}
                                            name={'licence'}
                                            defalut_preview={get_value(
                                                'driver_licence',
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Driver Number{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="driver number"
                                            name="driver_number"
                                            defaultValue={
                                                state.item.driver_number
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Assistant Number 1{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="assistant number 1"
                                            name="assistant_number_1"
                                            defaultValue={
                                                state.item.assistant_number_1
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Assistant Number 2{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="assistant number 2"
                                            name="assistant_number_2"
                                            defaultValue={
                                                state.item.assistant_number_2
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group student_submit form-horizontal">
                                    {/* <label></label> */}
                                    <div className="form_elementss">
                                        <button className="btn btn_1">
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
