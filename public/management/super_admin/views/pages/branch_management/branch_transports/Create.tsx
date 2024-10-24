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
                                    <label>Branch transport driver id</label>
                                    <div className="form_elements">
                                        <select
                                            name="branch_transport_driver_id"
                                            id=""
                                        >
                                            <option value="demo">demo</option>
                                            <option value="demo">demo</option>
                                            <option value="demo">demo</option>
                                            <option value="demo">demo</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Transport Title</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="transport title"
                                            name="transport_title"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Vehicle Number</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="vehicle number"
                                            name="vehicle_number"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Type</label>
                                    <div className="form_elements">
                                        <select name="type" id="">
                                            <option value="van">van</option>
                                            <option value="bus">bus</option>
                                            <option value="microbus">
                                                microbus
                                            </option>
                                            <option value="private">
                                                private
                                            </option>
                                            <option value="riksaw">
                                                riksaw
                                            </option>
                                        </select>
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
