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
                            <div className="form_section_heading">
                                <h2 className=""> Major Information</h2>
                            </div>
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
                                    <label>Phone number</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="phone number"
                                            name="phone_number"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Image</label>
                                    <div className="form_elements">
                                        <input
                                            type="file"
                                            placeholder="image"
                                            name="image"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Password</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="password"
                                            name="password"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Confirm Password</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="confirm password"
                                            name="confirm_password"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form_section_heading">
                                <h2 className="">Permanent Address</h2>
                            </div>
                            <div>
                                <div className="form-group form-horizontal">
                                    <label>Permanent Address</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="Permanent address"
                                            name="permanent_address"
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
                                    <label>Thana</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="thana"
                                            name="thana"
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
                            </div>
                            <div className="form_section_heading">
                                <h2 className="">Present Address</h2>
                            </div>
                            <div>
                                <div className="form-group form-horizontal">
                                    <label>Present Address</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="present address"
                                            name="present address"
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
                            </div>

                            <div className="form_section_heading">
                                <h4>Additional Information</h4>
                            </div>
                            <div>
                                <div className="form-group form-horizontal">
                                    <label>Gruardian Contact Number</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="guardian number"
                                            name="gruardian_contact_number"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Graduation</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="graduation"
                                            name="graduation"
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
                                    <label>Experience</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="experience"
                                            name="experience"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Gender</label>
                                    <div className="form_elements">
                                        <select name="gender" id="">
                                            <option value="male">male</option>
                                            <option value="female">
                                                female
                                            </option>
                                            <option value="others">
                                                others
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Department</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="department"
                                            name="department"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Branch ID</label>
                                    <div className="form_elements">
                                        <select name="branch_id" id="">
                                            <option value="demo">demo</option>
                                            <option value="demo">demo</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Class Teacher of</label>
                                    <div className="form_elements">
                                        <select name="class_teacher_of" id="">
                                            <option value="demo">demo</option>
                                            <option value="demo">demo</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Status</label>
                                    <div className="form_elements">
                                        <select name="ismarried" id="">
                                            <option value="acive">acive</option>
                                            <option value="block">block</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>IsMarried</label>
                                    <div className="form_elements">
                                        <select name="ismarried" id="">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
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
