import React, { useState, useEffect } from 'react';
import setup from '../config/setup';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../store';
import { initialState } from '../config/store/inital_state';
import { update } from '../config/store/async_actions/update';
import { Link, useParams } from 'react-router-dom';
import storeSlice from '../config/store';
import moment from 'moment/moment';
import { full_details } from '../config/store/async_actions/full_details';
import { anyObject } from '../../../../common_types/object';
import EducationalBackgound from './components/EducationalBackgound';
import Guardians from './components/Guardians';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const [totalDocument, setTotalDocument] = useState([1]);
    const [totalContactNumber, setTotalContactNumber] = useState([1]);
    const [totalLanguage, setTotalLanguage] = useState([1]);
    const [totalSkill, setTotalSkill] = useState([1]);
    const [educationalBackground, setEducationalBackground] = useState<
        anyObject[]
    >([]);
    const [totalGuardians, setTotalGuardians] = useState<anyObject[]>([]);
    // const [totalParent, setTotalParent] = useState<anyObject[]>([]);
    // let date22 = moment().format('YYYY-DD-MM');

    async function handle_submit(e) {
        e.preventDefault();
        console.log('this is clikck');

        let formData = new FormData(e.target);
        formData.append(
            'updated_background_data',
            JSON.stringify(educationalBackground),
        );
        formData.append(
            'updated_guardian_data',
            JSON.stringify(totalGuardians),
        );
        let response = await dispatch(update(formData) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            // e.target.reset();
        }
    }
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const params = useParams();
    console.log('id', params.id);

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(full_details({ id: params.id }) as any);
        console.log('state', state);
    }, []);

    // console.log('moment', moment().format('YYYY-DD-MM'));

    // for admission date
    const admissionDate = state.item?.student_info?.admission_date;
    const formattedAdmissionDate = admissionDate
        ? moment(admissionDate).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD');

    return (
        <div className="admin_dashboard">
            {Object.keys(state.item)?.length && (
                <div className="content_body">
                    <form
                        onSubmit={(e) => handle_submit(e)}
                        className="form_6002 mx-auto pt-3"
                    >
                        <div className="student_form">
                            <input
                                type="hidden"
                                name="id"
                                defaultValue={params.id}
                            />
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
                                                defaultValue={state.item.name}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Gender</label>
                                        <div className="form_elements">
                                            <select
                                                name="gender"
                                                defaultValue={
                                                    state.item.student_info
                                                        .gender
                                                }
                                                id=""
                                            >
                                                <option value=""></option>
                                                <option value="male">
                                                    male
                                                </option>
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
                                                defaultValue={state.item.email}
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
                                                defaultValue={
                                                    state.item.phone_number
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Whatsapp</label>
                                        <div className="form_elements">
                                            <input
                                                type="text"
                                                placeholder="Whatsapp number"
                                                name="whatsapp_number"
                                                defaultValue={
                                                    state.item.whatsapp_number
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Image</label>
                                        <div className="form_elements">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                placeholder="image"
                                                name="image"
                                            />
                                            <img
                                                src={state.item.image}
                                                style={{ width: '100px' }}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Status</label>
                                        <div className="form_elements">
                                            <select
                                                name="status"
                                                defaultValue={state.item.status}
                                                id=""
                                            >
                                                <option value=""></option>
                                                <option value="active">
                                                    active
                                                </option>
                                                <option value="block">
                                                    block
                                                </option>
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
                                    <div className="form-group form-vertical">
                                        <label>Parent</label>
                                        <div className="form_elements">
                                            <select
                                                name="parent_id"
                                                defaultValue={
                                                    state.item.parent_id
                                                }
                                                id=""
                                            >
                                                <option value=""></option>
                                                <option value="1">
                                                    parent1
                                                </option>
                                                <option value="2">
                                                    parent2
                                                </option>
                                                <option value="3">
                                                    parent3
                                                </option>
                                            </select>
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
                                            <select
                                                name="branch_id"
                                                defaultValue={
                                                    state.item.student_info
                                                        .branch_id
                                                }
                                                id=""
                                            >
                                                <option value="1">
                                                    Uttora
                                                </option>
                                                <option value="2">
                                                    Banani
                                                </option>
                                                <option value="3">
                                                    Gulshan
                                                </option>
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
                                                defaultValue={
                                                    state.item.student_info
                                                        .addmission_no
                                                }
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
                                                defaultValue={
                                                    state.item.student_info
                                                        .role_no
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Addmission date</label>
                                        <div className="form_elements">
                                            <input
                                                type="date"
                                                // defaultValue={moment(
                                                //     state.item.student_info
                                                //         .admission_date,
                                                // ).format('YYYY-MM-DD')}
                                                defaultValue={
                                                    formattedAdmissionDate
                                                }
                                                name="admission_date"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Class</label>
                                        <div className="form_elements">
                                            <select
                                                name="class"
                                                defaultValue={
                                                    state.item.student_info
                                                        .s_class
                                                }
                                                id=""
                                            >
                                                <option value=""></option>
                                                <option value="Six">Six</option>
                                                <option value="Seven">
                                                    Seven
                                                </option>
                                                <option value="Eight">
                                                    Eight
                                                </option>
                                                <option value="Nine">
                                                    Nine
                                                </option>
                                                <option value="Ten">Ten</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Shift</label>
                                        <div className="form_elements">
                                            <select
                                                name="shift"
                                                defaultValue={
                                                    state.item.student_info
                                                        .shift
                                                }
                                                id=""
                                            >
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
                                            <select
                                                name="section"
                                                defaultValue={
                                                    state.item.student_info
                                                        .section
                                                }
                                                id=""
                                            >
                                                <option value="c">c</option>
                                                <option value="A section">
                                                    A
                                                </option>
                                                <option value="B section">
                                                    B
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="full_width">
                                <div className="form_section_heading">
                                    <h4>Educational Background</h4>
                                </div>
                                <div className="multi_inputs">
                                    <div className="pb-4 px-0">
                                        <span
                                            className="btn btn-sm  btn-outline-info"
                                            onClick={addNewBackground}
                                        >
                                            Add new
                                        </span>
                                    </div>

                                    <input
                                        type="hidden"
                                        name="educational_background_count"
                                        value={
                                            updateEducationalBackground?.length
                                        }
                                    />
                                    {updateEducationalBackground?.map(
                                        (i, index) => {
                                            const defaultYearOfLeaving =
                                                i.year_of_leaving
                                                    ? moment(
                                                        i.year_of_leaving,
                                                    ).format('YYYY-MM-DD')
                                                    : moment().format(
                                                        'YYYY-MM-DD',
                                                    );
                                            return (
                                                <div
                                                    key={i}
                                                    className="multi_input_group"
                                                >
                                                    <div>{index + 1}</div>
                                                    <div className="d-flex">
                                                        <div className="form-group form-vertical">
                                                            <label>
                                                                Previous
                                                                institute
                                                            </label>
                                                            <div className="form_elements">
                                                                <input
                                                                    type="text"
                                                                    placeholder="previous institute"
                                                                    name={`educational_background_previous_institute_${index}`}
                                                                    defaultValue={
                                                                        i.previous_institute
                                                                    }
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
                                                                        defaultYearOfLeaving
                                                                    }
                                                                    name={`educational_background_year_of_leaving_${index}`}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-vertical">
                                                            <label>
                                                                Result
                                                            </label>
                                                            <div className="form_elements">
                                                                <input
                                                                    type="text"
                                                                    placeholder="result"
                                                                    name={`educational_background_result_${index}`}
                                                                    defaultValue={
                                                                        i.result
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-vertical">
                                                            <label>
                                                                Transfer
                                                                certificate
                                                            </label>
                                                            <div className="form_elements">
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    placeholder="transfer cirtificate"
                                                                    name={`educational_background_transfer_cirtificate_${index}`}
                                                                />
                                                                <img
                                                                    src={
                                                                        i.transfer_cirtificate
                                                                    }
                                                                    style={{
                                                                        width: '100px',
                                                                        height: '50px',
                                                                    }}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {updateEducationalBackground.length >
                                                        1 && (
                                                        <div>
                                                            <span
                                                                onClick={() =>
                                                                    remove_from_state(
                                                                        index,
                                                                        updateEducationalBackground,
                                                                        setUpdateEducationalBackground,
                                                                    )
                                                                }
                                                                className="btn btn-danger"
                                                            >
                                                                remove
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        },
                                    )}
                                </div>
                            </div> */}
                            <Guardians
                                setTotalGuardians={setTotalGuardians}
                            ></Guardians>
                            <EducationalBackgound
                                setEducationalBackground={
                                    setEducationalBackground
                                }
                            ></EducationalBackgound>
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
            )}
        </div>
    );
};

export default Index;
