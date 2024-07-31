import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import setup from './config/setup';
import { useAppDispatch } from '../../../store';
import { store } from './config/store/async_actions/store';
import moment from 'moment';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const [totalDocument, setTotalDocument] = useState([1]);
    const [totalParent, setTotalParent] = useState([1]);
    const [totalContactNumber, setTotalContactNumber] = useState([1]);
    const [totalLanguage, setTotalLanguage] = useState([1]);
    const [totalSkill, setTotalSkill] = useState([1]);
    const [totalEducationalBackground, setTotalEducationalBackground] =
        useState([1]);
    // let date22 = moment().format('YYYY-DD-MM');

    async function handle_submit(e) {
        e.preventDefault();
        console.log('this is clikck');

        let response = await dispatch(store(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
        }
    }

    function remove_from_state(index, state, setState) {
        let t = [...state];
        t.splice(index, 1);
        setState(t);
    }
    // console.log('moment', moment().format('YYYY-DD-MM'));

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <form
                    onSubmit={(e) => handle_submit(e)}
                    className="form_6002 mx-auto pt-3"
                >
                    <div className="student_form">
                        <div className="full_width">
                            <div className="form_section_heading">
                                <h2 className="">Basic Information</h2>
                            </div>
                            <div className="d-flex">
                                <div className="form-group form-vertical">
                                    <label>Name</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="name"
                                            name="name"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
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
                                <div className="form-group form-vertical">
                                    <label>Email</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="email"
                                            name="email"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Phone number</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="phone number"
                                            name="phone_number"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Image</label>
                                    <div className="form_elements">
                                        <input
                                            type="file"
                                            placeholder="image"
                                            name="image"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Status</label>
                                    <div className="form_elements">
                                        <select name="status" id="">
                                            <option value="active">
                                                active
                                            </option>
                                            <option value="block">block</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Password</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="password"
                                            name="password"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
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
                        </div>
                        <div className="full_width">
                            <div className="form_section_heading">
                                <h2 className="">Admission Information</h2>
                            </div>
                            <div className="d-flex">
                                <div className="form-group form-vertical">
                                    <label>Branch</label>
                                    <div className="form_elements">
                                        <select name="branch_id" id="">
                                            <option value="1">Uttora</option>
                                            <option value="2">Banani</option>
                                            <option value="3">Gulshan</option>
                                            <option value="4">Demra</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Addmission no</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="addmission no"
                                            name="admission_no"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Roll no</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="roll no"
                                            name="role_no"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Addmission date</label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            defaultValue={'2024-10-10'}
                                            name="admission_date"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Class</label>
                                    <div className="form_elements">
                                        <select name="class" id="">
                                            <option value="six">six</option>
                                            <option value="seven">seven</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Shift</label>
                                    <div className="form_elements">
                                        <select name="shift" id="">
                                            <option value="boy morning">
                                                boy morning
                                            </option>
                                            <option value="boy evening">
                                                boy evening
                                            </option>
                                            <option value="girls evening">
                                                girls evening
                                            </option>
                                            <option value="girl morning">
                                                girl morning
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Section</label>
                                    <div className="form_elements">
                                        <select name="section" id="">
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="full_width">
                            <div className="form_section_heading">
                                <h4>Information</h4>
                            </div>
                            <div className="d-flex">
                                <div className="form-group form-vertical">
                                    <label>Present Address</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="present address"
                                            name="present_address"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Permanent Address</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="permanent address"
                                            name="permanent_address"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Date of birth</label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            defaultValue={'2024-10-10'}
                                            name="date_of_birth"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Religion</label>
                                    <div className="form_elements">
                                        <select name="religion" id="">
                                            <option value="islam">islam</option>
                                            <option value="hindu">hindu</option>
                                            <option value="kristian">
                                                kristian
                                            </option>
                                            <option value="budda">budda</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Nationality</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="nationality"
                                            name="nationality"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Division</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="division"
                                            name="division"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>City</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="City"
                                            name="city"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Post code</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="post code"
                                            name="post_code"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Country</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="country"
                                            name="country"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Medical condition</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="medical condition"
                                            name="medical_condition"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Current medcation</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="current medcation"
                                            name="current_medications"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Telegram name</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="telegram name"
                                            name="telegram_name"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Telegram id</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="telegram id"
                                            name="telegram_id"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Blood group</label>
                                    <div className="form_elements">
                                        <select name="blood_group" id="">
                                            <option value="A+">A+</option>
                                            <option value="B+">B+</option>
                                            <option value="A-">A-</option>
                                            <option value="AB-">AB-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="B-">B-</option>
                                            <option value="O-">O-</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Student expire date</label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            defaultValue={'2024-10-10'}
                                            name="student_expire_date"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Height</label>
                                    <div className="form_elements">
                                        <input
                                            type="number"
                                            placeholder="height"
                                            name="height"
                                            step={'any'}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Weight</label>
                                    <div className="form_elements">
                                        <input
                                            type="number"
                                            placeholder="weight"
                                            name="weight"
                                            step={'any'}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>As on date</label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            defaultValue={'2024-10-10'}
                                            name="as_on_date"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Family information</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="family information"
                                            name="family_information"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Shibling information</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="shibling information"
                                            name="shibling_information"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Living house type</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="living house type"
                                            name="living_house_type"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Student house type</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="Student house type"
                                            name="student_house_type"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Birth certificate</label>
                                    <div className="form_elements">
                                        <input
                                            type="file"
                                            name="birth_certificate"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>NID</label>
                                    <div className="form_elements">
                                        <input type="file" name="national_id" />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Cast</label>
                                    <div className="form_elements">
                                        <select name="cast" id="">
                                            <option value="Khan">Khan</option>
                                            <option value="Chowdhuri">
                                                Chowdhuri
                                            </option>
                                            <option value="Patowari">
                                                Patowari
                                            </option>
                                            <option value="Shikdar">
                                                Shikdar
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="full_width">
                            <div className="form_section_heading">
                                <h4>Document</h4>
                            </div>
                            <div className="multi_inputs">
                                <div className="pb-4 px-0">
                                    <button
                                        className="btn btn-sm  btn-outline-info"
                                        onClick={() =>
                                            setTotalDocument([
                                                ...totalDocument,
                                                1,
                                            ])
                                        }
                                    >
                                        Add new
                                    </button>
                                </div>
                                {totalDocument.map((i, index) => {
                                    return (
                                        <div
                                            key={i}
                                            className="multi_input_group"
                                        >
                                            <div className="d-flex">
                                                <div className="form-group form-vertical">
                                                    <label>
                                                        Document title
                                                    </label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="text"
                                                            placeholder="document title"
                                                            name="document_title"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Document file</label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="file"
                                                            placeholder="document file"
                                                            name="document_file"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Issue Date</label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="date"
                                                            defaultValue={
                                                                '2024-10-10'
                                                            }
                                                            name="issue_date"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Expire Date</label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="date"
                                                            defaultValue={
                                                                '2024-10-10'
                                                            }
                                                            name="expire_date"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {totalDocument.length > 1 && (
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            remove_from_state(
                                                                index,
                                                                totalDocument,
                                                                setTotalDocument,
                                                            )
                                                        }
                                                        className="btn btn-danger"
                                                    >
                                                        remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="full_width">
                            <div className="form_section_heading">
                                <h4>Guardians</h4>
                            </div>
                            <div className="multi_inputs">
                                <div className="pb-4 px-0">
                                    <button
                                        className="btn btn-sm  btn-outline-info"
                                        onClick={() =>
                                            setTotalParent([...totalParent, 1])
                                        }
                                    >
                                        Add new
                                    </button>
                                </div>
                                {totalParent.map((i, index) => {
                                    return (
                                        <div
                                            key={i}
                                            className="multi_input_group"
                                        >
                                            <div className="d-flex">
                                                <div className="form-group form-vertical">
                                                    <label>Relation</label>
                                                    <div className="form_elements">
                                                        <select
                                                            name="relation"
                                                            id=""
                                                        >
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
                                                <div className="form-group form-vertical">
                                                    <label>Is parent</label>
                                                    <div className="form_elements">
                                                        <select
                                                            name="is_parent"
                                                            defaultValue="0"
                                                            id=""
                                                        >
                                                            <option value="0">
                                                                no
                                                            </option>
                                                            <option value="1">
                                                                yes
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>
                                                        User parent id
                                                    </label>
                                                    <div className="form_elements">
                                                        <select
                                                            name="user_student_parent_id"
                                                            id=""
                                                        >
                                                            <option value="1">
                                                                parent1
                                                            </option>
                                                            <option value="2">
                                                                parent2
                                                            </option>
                                                            <option value="3">
                                                                parent3
                                                            </option>
                                                            <option value="4">
                                                                parent4
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            {totalParent.length > 1 && (
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            remove_from_state(
                                                                index,
                                                                totalParent,
                                                                setTotalParent,
                                                            )
                                                        }
                                                        className="btn btn-danger"
                                                    >
                                                        remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="full_width">
                            <div className="form_section_heading">
                                <h4>Contact Number</h4>
                            </div>
                            <div className="multi_inputs">
                                <div className="pb-4 px-0">
                                    <button
                                        className="btn btn-sm  btn-outline-info"
                                        onClick={() =>
                                            setTotalContactNumber([
                                                ...totalContactNumber,
                                                1,
                                            ])
                                        }
                                    >
                                        Add new
                                    </button>
                                </div>
                                {totalContactNumber.map((i, index) => {
                                    return (
                                        <div
                                            key={i}
                                            className="multi_input_group"
                                        >
                                            <div className="d-flex">
                                                <div className="form-group form-vertical">
                                                    <label>
                                                        Contact number
                                                    </label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="text"
                                                            placeholder="contact number"
                                                            name="contact_number"
                                                            id=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Owner</label>
                                                    <div className="form_elements">
                                                        <select
                                                            name="owner"
                                                            id=""
                                                        >
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
                                            {totalContactNumber.length > 1 && (
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            remove_from_state(
                                                                index,
                                                                totalContactNumber,
                                                                setTotalContactNumber,
                                                            )
                                                        }
                                                        className="btn btn-danger"
                                                    >
                                                        remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="full_width">
                            <div className="form_section_heading">
                                <h4>Language</h4>
                            </div>
                            <div className="multi_inputs">
                                <div className="pb-4 px-0">
                                    <button
                                        className="btn btn-sm  btn-outline-info"
                                        onClick={() =>
                                            setTotalLanguage([
                                                ...totalLanguage,
                                                1,
                                            ])
                                        }
                                    >
                                        Add new
                                    </button>
                                </div>
                                {totalLanguage.map((i, index) => {
                                    return (
                                        <div
                                            key={i}
                                            className="multi_input_group"
                                        >
                                            <div className="d-flex">
                                                <div className="form-group form-vertical">
                                                    <label>
                                                        Language title
                                                    </label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="text"
                                                            placeholder="language title"
                                                            name="language_title"
                                                            id=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
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
                                            {totalLanguage.length > 1 && (
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            remove_from_state(
                                                                index,
                                                                totalLanguage,
                                                                setTotalLanguage,
                                                            )
                                                        }
                                                        className="btn btn-danger"
                                                    >
                                                        remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="full_width">
                            <div className="form_section_heading">
                                <h4>Skill</h4>
                            </div>
                            <div className="multi_inputs">
                                <div className="pb-4 px-0">
                                    <button
                                        className="btn btn-sm  btn-outline-info"
                                        onClick={() =>
                                            setTotalSkill([...totalSkill, 1])
                                        }
                                    >
                                        Add new
                                    </button>
                                </div>
                                {totalSkill.map((i, index) => {
                                    return (
                                        <div
                                            key={i}
                                            className="multi_input_group"
                                        >
                                            <div className="d-flex">
                                                <div className="form-group form-vertical">
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
                                                <div className="form-group form-vertical">
                                                    <label>Level</label>
                                                    <div className="form_elements">
                                                        <select
                                                            name="level"
                                                            id=""
                                                        >
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
                                            {totalSkill.length > 1 && (
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            remove_from_state(
                                                                index,
                                                                totalSkill,
                                                                setTotalSkill,
                                                            )
                                                        }
                                                        className="btn btn-danger"
                                                    >
                                                        remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="full_width">
                            <div className="form_section_heading">
                                <h4>Educational Background</h4>
                            </div>
                            <div className="multi_inputs">
                                <div className="pb-4 px-0">
                                    <button
                                        className="btn btn-sm  btn-outline-info"
                                        onClick={() =>
                                            setTotalEducationalBackground([
                                                ...totalEducationalBackground,
                                                1,
                                            ])
                                        }
                                    >
                                        Add new
                                    </button>
                                </div>
                                {totalEducationalBackground.map((i, index) => {
                                    return (
                                        <div
                                            key={i}
                                            className="multi_input_group"
                                        >
                                            <div className="d-flex">
                                                <div className="form-group form-vertical">
                                                    <label>
                                                        Previous institute
                                                    </label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="text"
                                                            placeholder="previous institute"
                                                            name="previous_institute"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>
                                                        Year of leaving
                                                    </label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="date"
                                                            defaultValue={
                                                                '2024-10-10'
                                                            }
                                                            name="year_of_leaving"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Result</label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="text"
                                                            placeholder="result"
                                                            name="result"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>
                                                        Transfer certificate
                                                    </label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="file"
                                                            placeholder="transfer cirtificate"
                                                            name="transfer_cirtificate"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {totalEducationalBackground.length >
                                                1 && (
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            remove_from_state(
                                                                index,
                                                                totalEducationalBackground,
                                                                setTotalEducationalBackground,
                                                            )
                                                        }
                                                        className="btn btn-danger"
                                                    >
                                                        remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="form-group student_submit form-horizontal">
                        <label></label>
                        <div className="form_elements">
                            <button className="btn btn-sm  btn-outline-info">
                                submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Index;
