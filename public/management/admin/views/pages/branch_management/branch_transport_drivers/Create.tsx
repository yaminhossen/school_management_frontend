import React from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { useAppDispatch } from '../../../../store';
import { store } from './config/store/async_actions/store';
import DropDown from './components/dropdown/DropDown';
export interface Props {}

const Create: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();

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
                            {/* <div className="form_section_heading">
                                <h2 className=""> Major Information</h2>
                            </div> */}
                            <div>
                                <div className="form-group form-horizontal">
                                    <label>Branch id</label>
                                    <div className="form_elements">
                                        <select name="branch_id" id="">
                                            <option value="demo">demo</option>
                                            <option value="demo">demo</option>
                                            <option value="demo">demo</option>
                                            <option value="demo">demo</option>
                                        </select>
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
                                    <label>Driver licence</label>
                                    <div className="form_elements">
                                        <input
                                            type="file"
                                            name="driver_licence"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Phone number 1</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="phone number 1"
                                            name="phone_number_1"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Phone number 2</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="phone number 2"
                                            name="phone_number_2"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Phone number 3</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="phone number 3"
                                            name="phone_number_3"
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
