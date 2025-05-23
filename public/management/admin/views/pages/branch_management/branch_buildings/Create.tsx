import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { store } from './config/store/async_actions/store';
import DropDown from './components/dropdown/DropDown';
import { useParams } from 'react-router-dom';
import storeSlice from './config/store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { useSelector } from 'react-redux';
import InputImage from './components/management_data_page/InputImage';
export interface Props {}

const Create: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const dispatch = useAppDispatch();
    const [clearPreview, setClearPreview] = useState(false);

    async function handle_submit(e) {
        e.preventDefault();
        setClearPreview(false)
        let response = await dispatch(store(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
            setClearPreview(true)
        }
    }

    const params = useParams();

    // useEffect(() => {
    //     dispatch(storeSlice.actions.set_item({}));
    //     dispatch(details({ id: params.id }) as any);
    // }, []);
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
                            {/* <div className="form_section_heading">
                                <h2 className=""> Major Information</h2>
                            </div> */}
                            <div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Building Code{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="Building Code"
                                            name="building_code"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Building Name{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="building name"
                                            name="building_name"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Attachment</label>
                                    <div className="form_elements">
                                        <InputImage
                                            label={''}
                                            name={'attachment'}
                                            // defalut_preview={get_value('')}
                                            clearPreview={clearPreview}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Photo</label>
                                    <div className="form_elements">
                                        <InputImage
                                            label={''}
                                            name={'photo'}
                                            // defalut_preview={get_value('')}
                                            clearPreview={clearPreview}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Description{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <textarea
                                            placeholder="description"
                                            name="description"
                                            id=""
                                        ></textarea>
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
