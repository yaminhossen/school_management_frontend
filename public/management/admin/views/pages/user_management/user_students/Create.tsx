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
                            className="form_6002 mx-auto pt-3"
                        >
                            <div className="student_form">
                                <div>
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
                                        <h4>Student Document</h4>
                                    </div>
                                    <div>
                                        <div className="form-group form-horizontal">
                                            <label>Document file</label>
                                            <div className="form_elements">
                                                <input
                                                    type="file"
                                                    placeholder="document file"
                                                    name="file"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Issue Date</label>
                                            <div className="form_elements">
                                                <input
                                                    type="date"
                                                    name="issue_date"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Expire Date</label>
                                            <div className="form_elements">
                                                <input
                                                    type="date"
                                                    name="expire_date"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Document title</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="document title"
                                                    name="document_title"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form_section_heading">
                                        <h4>Student Parents</h4>
                                    </div>
                                    <div>
                                        <div className="form-group form-horizontal">
                                            <label>Relation</label>
                                            <div className="form_elements">
                                                <select name="relation" id="">
                                                    <option value="father">
                                                        father
                                                    </option>
                                                    <option value="mother">
                                                        mother
                                                    </option>
                                                    <option value="husband">
                                                        husband
                                                    </option>
                                                    <option value="brother">
                                                        brother
                                                    </option>
                                                    <option value="sister">
                                                        sister
                                                    </option>
                                                    <option value="uncle">
                                                        uncle
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Is parent</label>
                                            <div className="form_elements">
                                                <select name="is_parent" id="">
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>User parent id</label>
                                            <div className="form_elements">
                                                <select
                                                    name="user_parent_id"
                                                    id=""
                                                >
                                                    <option value="demo1">
                                                        demo1
                                                    </option>
                                                    <option value="demo2">
                                                        demo2
                                                    </option>
                                                    <option value="demo3">
                                                        demo3
                                                    </option>
                                                    <option value="demo4">
                                                        demo4
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form_section_heading">
                                        <h4>Student Contact Number</h4>
                                    </div>
                                    <div>
                                        <div className="form-group form-horizontal">
                                            <label>Contact number</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="contact number"
                                                    name="contact_number"
                                                    id=""
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Owner</label>
                                            <div className="form_elements">
                                                <select name="owner" id="">
                                                    <option value="personal">
                                                        personal
                                                    </option>
                                                    <option value="home">
                                                        home
                                                    </option>
                                                    <option value="friend">
                                                        friend
                                                    </option>
                                                    <option value="relative">
                                                        relative
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form_section_heading">
                                        <h4>Student Language</h4>
                                    </div>
                                    <div>
                                        <div className="form-group form-horizontal">
                                            <label>Language title</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="language title"
                                                    name="language_title"
                                                    id=""
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Profeciency</label>
                                            <div className="form_elements">
                                                <select
                                                    name="profeciency"
                                                    id=""
                                                >
                                                    <option value="fluent">
                                                        fluent
                                                    </option>
                                                    <option value="native">
                                                        native
                                                    </option>
                                                    <option value="mid">
                                                        mid
                                                    </option>
                                                    <option value="low">
                                                        low
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form_section_heading">
                                        <h4>Student Skills</h4>
                                    </div>
                                    <div>
                                        <div className="form-group form-horizontal">
                                            <label>Skills title</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="skills title"
                                                    name="skills_title"
                                                    id=""
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Level</label>
                                            <div className="form_elements">
                                                <select name="level" id="">
                                                    <option value="native">
                                                        native
                                                    </option>
                                                    <option value="mid">
                                                        mid
                                                    </option>
                                                    <option value="low">
                                                        low
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="form_section_heading">
                                        <h4>Educational Background</h4>
                                    </div>
                                    <div>
                                        <div className="form-group form-horizontal">
                                            <label>Previous institute</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="previous institute"
                                                    name="previous_institute"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Year of living</label>
                                            <div className="form_elements">
                                                <input
                                                    type="date"
                                                    name="year_of_living"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Result</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="result"
                                                    name="result"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>
                                                Transcript certificate
                                            </label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="transfer certificate"
                                                    name="transfer_certificate"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form_section_heading">
                                        <h4>Student Information</h4>
                                    </div>
                                    <div>
                                        <div className="form-group form-horizontal">
                                            <label>Present Address</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="present address"
                                                    name="present_address"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Permanent Address</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="permanent address"
                                                    name="permanent_address"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Date of birth</label>
                                            <div className="form_elements">
                                                <input
                                                    type="date"
                                                    name="date_of_birth"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>gender</label>
                                            <div className="form_elements">
                                                {/* <input
                                                    type="text"
                                                    placeholder="gender"
                                                    name="gender"
                                                /> */}
                                                <select name="gender" id="">
                                                    <option value="male">
                                                        male
                                                    </option>
                                                    <option value="female">
                                                        female
                                                    </option>
                                                    <option value="other">
                                                        other
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Nationality</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="nationality"
                                                    name="nationality"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>City</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="city"
                                                    name="city"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>State</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="state"
                                                    name="state"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Zip code</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="zip code"
                                                    name="zip_code"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Post code</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="post code"
                                                    name="post_code"
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
                                            <label>Medical condition</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="medical condition"
                                                    name="medical_condition"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Current medcation</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="current medcation"
                                                    name="current_medcation"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Telegram name</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="telegram name"
                                                    name="telegram_name"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Telegram id</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="telegram id"
                                                    name="telegram_id"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Qr code</label>
                                            <div className="form_elements">
                                                <input
                                                    type="file"
                                                    name="qr_code"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Blood group</label>
                                            <div className="form_elements">
                                                <input
                                                    type="text"
                                                    placeholder="blood group"
                                                    name="blood_group"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Student expire date</label>
                                            <div className="form_elements">
                                                <input
                                                    type="date"
                                                    name="student_expire_date"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Addmission date</label>
                                            <div className="form_elements">
                                                <input
                                                    type="date"
                                                    name="addmission_date"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group form-horizontal">
                                            <label>Branch id</label>
                                            <div className="form_elements">
                                                <select name="branch_id" id="">
                                                    <option value="demo1">
                                                        demo1
                                                    </option>
                                                    <option value="demo2">
                                                        demo2
                                                    </option>
                                                    <option value="demo3">
                                                        demo3
                                                    </option>

                                                    <option value="demo4">
                                                        demo4
                                                    </option>

                                                    <option value="demo5">
                                                        demo5
                                                    </option>

                                                    <option value="demo6">
                                                        demo6
                                                    </option>

                                                    <option value="demo7">
                                                        demo7
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
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
