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
                            className="form_600 mx-auto pt-3"
                        >
                            <div className="">
                                <div className="form-group form-horizontal">
                                    <label>Branch code</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            name="branch_code"
                                            id=" "
                                            placeholder="branch code"
                                        />
                                    </div>
                                </div>
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
                                    <label>Email</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="email"
                                            name="email"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Primary contact number</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="phone number"
                                            name="primary_contact"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Logo</label>
                                    <div className="form_elements">
                                        <InputImage
                                            label={''}
                                            name={'logo'}
                                            defalut_preview={get_value('')}
                                        />
                                    </div>
                                </div>

                                <div className="form-group form-horizontal">
                                    <label>Address</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="address"
                                            name="address"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Map</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="map"
                                            name="map"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Lat</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="latitude"
                                            name="lat"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Lng</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="longitude"
                                            name="lng"
                                        />
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
