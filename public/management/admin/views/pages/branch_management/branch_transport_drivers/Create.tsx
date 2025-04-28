import React from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { store } from './config/store/async_actions/store';
import DropDown from './components/dropdown/DropDown';
import { initialState } from './config/store/inital_state';
import { useSelector } from 'react-redux';
import InputImage from './components/management_data_page/InputImage';
export interface Props {}

const Create: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const dispatch = useAppDispatch();

    async function handle_submit(e) {
        e.preventDefault();
        let response = await dispatch(store(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
        }
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
                            <div>
                                <div className="form-group form-horizontal">
                                    <label>Name</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="name"
                                            name="name"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Present address</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="present address"
                                            name="present_address"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Permanent address</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="permanent address"
                                            name="permanent_address"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>licence number</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="licence number"
                                            name="licence_number"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Driver licence</label>
                                    <div className="form_elements">
                                        <InputImage
                                            label={''}
                                            name={'licence'}
                                            defalut_preview={get_value('')}
                                        />
                                        {/* <input
                                            type="file"
                                            accept="image/*"
                                            name="licence"
                                        /> */}
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Driver Number</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="driver number"
                                            name="driver_number"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Assistant Number 1</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="assistant number 1"
                                            name="assistant_number_1"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Assistant Number 2</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="assistant number 2"
                                            name="assistant_number_2"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-horizontal">
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
