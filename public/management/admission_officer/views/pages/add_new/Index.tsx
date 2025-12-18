import React, { useState, useEffect } from 'react';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { store } from './config/store/async_actions/store';
import moment from 'moment/moment';
import storeSlice from './config/store';
import { initialState } from './config/store/inital_state';
import { useSelector } from 'react-redux';
import { classes } from '../add_new/config/store/async_actions/classes';
import { sections } from './config/store/async_actions/sections';
import { shifts } from './config/store/async_actions/shifts';
import ImageUpload from './components/ImageUpload';
import { preInfoClassWise } from './config/store/async_actions/pre_info_class_wise';
import DropDown from './components/dropdown/DropDown';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const [selectedClass, setSelectedClass] = useState('');
    const [totalDocument, setTotalDocument] = useState([1, 1, 1]);
    const [totalContactNumber, setTotalContactNumber] = useState([1, 1, 1]);
    const [totalLanguage, setTotalLanguage] = useState([1, 1]);
    const [totalSkill, setTotalSkill] = useState([1, 1]);
    const [error, setError] = useState<string>('');
    const [isParent, setIsParent] = useState('no');
    const [formData, setFormData] = useState({
        password: '',
        confirm_password: '',
    });
    const [phoneNumbers, setPhoneNumbers] = useState<{
        son: string;
        parents: string[];
    }>({
        son: '',
        parents: [],
    });

    const [errors, setErrors] = useState<{
        son: string;
        parents: string[];
    }>({
        son: '',
        parents: [],
    });

    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const [totalEducationalBackground, setTotalEducationalBackground] =
        useState([1, 1]);

    // Handle class selection
    const handleClassChange = async (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedClass(e.target.value);
    };
    // Handle section selection
    const handleSectionChange = async (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        await dispatch(preInfoClassWise({ sec_id: e.target.value }) as any);
    };

    // Filter sections based on selected class
    const filteredSections =
        state.sections?.filter(
            (section: { [key: string]: any }) =>
                section.branch_class_id === parseInt(selectedClass),
        ) || [];

    async function handle_submit(e) {
        e.preventDefault();
        let form = document.getElementById('main_form') as HTMLFormElement;
        if (!form) {
            return;
        }
        let response = await dispatch(store(new FormData(form)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            form.reset();
        }
    }
    async function initdependancy() {
        await dispatch(storeSlice.actions.set_item({}));
        await dispatch(classes({}) as any);
        await dispatch(sections({}) as any);
        await dispatch(shifts({}) as any);
    }

    useEffect(() => {
        initdependancy();
    }, []);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === 'confirm_password' && value !== formData.password) {
            setError('Passwords do not match');
        } else {
            setError('');
        }
    };

    let date = moment().format('YYYY-MM-DD');

    const startYear = '2025';
    const years = Array.from({ length: 31 }, (_, i) => Number(startYear) + i);

    // State for selected year
    const [selectedYear, setSelectedYear] = useState(
        sessionStorage.getItem('selectedYear') || startYear,
    );

    // Update session storage when year changes
    useEffect(() => {
        sessionStorage.setItem('selectedYear', selectedYear);
    }, [selectedYear]);

    // Handle year selection
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showParentPassword, setShowParentPassword] = useState(false);

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <form
                    // ref={formRef}
                    id="main_form"
                    onSubmit={(e) => e.preventDefault()}
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
                                            type="email"
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
                                            placeholder="01XXXXXXXXX or +8801XXXXXXXXX"
                                            name="phone_number"
                                        />
                                        {errors.son && (
                                            <p style={{ color: 'red' }}>
                                                {errors.son}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Whatsapp</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="Whatsapp number"
                                            name="whatsapp_number"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Image</label>
                                    <div className="form_elements">
                                        <ImageUpload name={'image'} />
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
                                    <div
                                        className="form_elements_valid"
                                        style={{ position: 'relative' }}
                                    >
                                        <input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handlePasswordChange}
                                        />
                                        <span
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="material-symbols-outlined visible_icon"
                                            style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                cursor: 'pointer',
                                                color: '#eeeeee',
                                                fontSize: '24px',
                                                userSelect: 'none',
                                            }}
                                        >
                                            {showPassword
                                                ? 'visibility'
                                                : 'visibility_off'}
                                        </span>
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
                                    <label>Class</label>
                                    <div className="form_elements">
                                        <select
                                            name="class"
                                            value={selectedClass}
                                            onChange={handleClassChange}
                                        >
                                            <option value="">
                                                Select a class
                                            </option>
                                            {state.classes?.length &&
                                                state.classes.map(
                                                    (i: {
                                                        [key: string]: any;
                                                    }) => (
                                                        <option
                                                            key={i.id}
                                                            value={i.id}
                                                        >
                                                            {i.name}
                                                        </option>
                                                    ),
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Section</label>
                                    <div className="form_elements">
                                        <select
                                            name="section"
                                            disabled={!selectedClass}
                                            onChange={handleSectionChange}
                                        >
                                            <option value="">
                                                Select a section
                                            </option>
                                            {filteredSections.length > 0 &&
                                                filteredSections.map(
                                                    (i: {
                                                        [key: string]: any;
                                                    }) => (
                                                        <option
                                                            key={i.id}
                                                            value={i.id}
                                                        >
                                                            {i.title}
                                                        </option>
                                                    ),
                                                )}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group form-vertical custom_scroll">
                                    <label htmlFor="session">Session</label>
                                    <div className="form_elements custom_scroll">
                                        <select
                                            id="session"
                                            name="session"
                                            value={selectedYear}
                                            onChange={handleYearChange}
                                            className="form-control custom_scroll"
                                            style={{ paddingRight: '30px' }} // Ensures space for the native arrow
                                        >
                                            <option value="" disabled>
                                                Select a year
                                            </option>{' '}
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Roll No</label>
                                    <div className="form_elements">
                                        <input
                                            type="number"
                                            placeholder="roll no"
                                            name="role_no"
                                            value={state.preInfo?.role_no}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Cadet Id</label>
                                    <div className="form_elements">
                                        <input
                                            type="number"
                                            placeholder="Cadet id"
                                            name="student_id"
                                            value={state.preInfo?.student_id}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Addmission date</label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            defaultValue={date}
                                            name="admission_date"
                                        />
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
                                            defaultValue={date}
                                            name="date_of_birth"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Division</label>
                                    <div className="form_elements">
                                        <select name="division" id="">
                                            <option value="Barishal">
                                                Barishal
                                            </option>
                                            <option value="Chattogram">
                                                Chattogram
                                            </option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Khulna">
                                                Khulna
                                            </option>
                                            <option value="Rajshahi">
                                                Rajshahi
                                            </option>
                                            <option value="Rangpur">
                                                Rangpur
                                            </option>
                                            <option value="Mymensingh">
                                                Mymensingh
                                            </option>
                                            <option value="Sylhet">
                                                Sylhet
                                            </option>
                                        </select>
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
                                    <label>Current medication</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="current medication"
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
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Student expire date</label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            defaultValue={date}
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
                                            defaultValue={date}
                                            name="as_on_date"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Family information</label>
                                    <div className="form_elements">
                                        <textarea
                                            placeholder="family information"
                                            name="family_information"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Shibling information</label>
                                    <div className="form_elements">
                                        <textarea
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
                                    <label>Student type</label>
                                    <div className="form_elements">
                                        <select name="student_house_type" id="">
                                            <option value="Residential">
                                                Residential
                                            </option>
                                            <option value="Non-residential">
                                                Non-residential
                                            </option>
                                            <option value="Day-care">
                                                Day-care
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Birth certificate</label>
                                    <div className="form_elements">
                                        <ImageUpload
                                            name={'birth_certificate'}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <label>NID</label>
                                    <ImageUpload name={'national_id'} />
                                </div>
                            </div>
                        </div>
                        <div className="full_width">
                            <div className="form_section_heading">
                                <h4>Document</h4>
                            </div>
                            <div className="multi_inputs">
                                <input
                                    type="hidden"
                                    name="total_docement_count"
                                    value={totalDocument.length}
                                />
                                {totalDocument.map((i, index) => {
                                    return (
                                        <div
                                            key={i}
                                            className="multi_input_group"
                                        >
                                            <div>{index + 1}</div>
                                            <div className="d-flex">
                                                <div className="form-group form-vertical">
                                                    <label>
                                                        Document title
                                                    </label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="text"
                                                            placeholder="document title"
                                                            name={`document_title${index}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Document file</label>
                                                    <div className="form_elements">
                                                        <ImageUpload
                                                            name={`document_file${index}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Issue Date</label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="date"
                                                            defaultValue={date}
                                                            name={`issue_date${index}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Expire Date</label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="date"
                                                            defaultValue={date}
                                                            name={`expire_date${index}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="form-group form-vertical">
                                <label>Is Parent Exist</label>
                                <div className="form_elements">
                                    <select
                                        name="exist"
                                        value={isParent}
                                        onChange={(e) =>
                                            setIsParent(e.target.value)
                                        }
                                        id=""
                                    >
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                </div>
                            </div>
                            {isParent === 'yes' && (
                                <div className="form-group form-vertical">
                                    <label>Parent List</label>
                                    <div className="form_elements">
                                        <DropDown name="exits"></DropDown>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="full_width">
                            <div className="form_section_heading">
                                <h4>Guardians</h4>
                            </div>
                            <div className="multi_inputs">
                                <div className="multi_input_group">
                                    <div className="d-flex">
                                        {isParent === 'yes' && (
                                            <div className="d-flex">
                                                <div className="form-group form-vertical">
                                                    <label>Name</label>
                                                    <div className="form_elements">
                                                        <input
                                                            hidden
                                                            type="number"
                                                            placeholder="parents name"
                                                            name={`parent_id`}
                                                            defaultValue={
                                                                state.item?.id
                                                            }
                                                        />
                                                        <input
                                                            readOnly
                                                            type="text"
                                                            placeholder="parents name"
                                                            // name={`parent_name`}
                                                            defaultValue={
                                                                state.item?.name
                                                            }
                                                        />
                                                        <div>
                                                            <img
                                                                width={100}
                                                                src={
                                                                    state.item
                                                                        .image
                                                                }
                                                                alt="Img"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Email</label>
                                                    <div className="form_elements">
                                                        <input
                                                            readOnly
                                                            type="email"
                                                            placeholder="parent email"
                                                            // name={`parent_email`}
                                                            defaultValue={
                                                                state.item
                                                                    ?.email
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Phone number</label>
                                                    <div className="form_elements">
                                                        <input
                                                            readOnly
                                                            type="text"
                                                            placeholder="01XXXXXXXXX or +8801XXXXXXXXX"
                                                            // name={`parent_phone_number`}
                                                            defaultValue={
                                                                state.item
                                                                    ?.phone_number
                                                            }
                                                        />
                                                        {errors.parents[1] && (
                                                            <p
                                                                style={{
                                                                    color: 'red',
                                                                }}
                                                            >
                                                                {
                                                                    errors
                                                                        .parents[1]
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {isParent === 'no' && (
                                            <div className="d-flex">
                                                <div className="form-group form-vertical">
                                                    <label>Relation</label>
                                                    <div className="form_elements">
                                                        <select
                                                            name={`relation`}
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
                                                    <label>Name</label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="text"
                                                            placeholder="parents name"
                                                            name={`parent_name`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Email</label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="email"
                                                            placeholder="parent email"
                                                            name={`parent_email`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Phone number</label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="text"
                                                            placeholder="01XXXXXXXXX or +8801XXXXXXXXX"
                                                            name={`parent_phone_number`}
                                                        />
                                                        {errors.parents[1] && (
                                                            <p
                                                                style={{
                                                                    color: 'red',
                                                                }}
                                                            >
                                                                {
                                                                    errors
                                                                        .parents[1]
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Image</label>
                                                    <div className="form_elements">
                                                        <ImageUpload
                                                            name={`parent_image`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Password</label>
                                                    <div
                                                        className="form_elements_valid"
                                                        style={{
                                                            position:
                                                                'relative',
                                                        }}
                                                    >
                                                        <input
                                                            type={
                                                                showParentPassword
                                                                    ? 'text'
                                                                    : 'password'
                                                            }
                                                            placeholder="parent password"
                                                            name={`parent_password`}
                                                        />
                                                        <span
                                                            onClick={() =>
                                                                setShowParentPassword(
                                                                    !showParentPassword,
                                                                )
                                                            }
                                                            className="material-symbols-outlined visible_icon"
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                top: '10px',
                                                                right: '10px',
                                                                cursor: 'pointer',
                                                                color: '#eeeeee',
                                                                fontSize:
                                                                    '24px',
                                                                userSelect:
                                                                    'none',
                                                            }}
                                                        >
                                                            {showParentPassword
                                                                ? 'visibility_off'
                                                                : 'visibility'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="full_width">
                            <div className="form_section_heading">
                                <h4>Contact Number</h4>
                            </div>
                            <div className="multi_inputs">
                                {/* <div className="pb-4 px-0">
                                    <span
                                        className="btn btn-sm  btn-outline-info"
                                        onClick={() =>
                                            setTotalContactNumber([
                                                ...totalContactNumber,
                                                1,
                                            ])
                                        }
                                    >
                                        Add new
                                    </span>
                                </div> */}
                                <input
                                    type="hidden"
                                    name="contact_number_count"
                                    value={totalContactNumber.length}
                                />
                                {totalContactNumber.map((i, index) => {
                                    return (
                                        <div
                                            key={i}
                                            className="multi_input_group"
                                        >
                                            <div>{index + 1}</div>
                                            <div className="d-flex">
                                                <div className="form-group form-vertical">
                                                    <label>
                                                        Contact number
                                                    </label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="text"
                                                            placeholder="contact number"
                                                            name={`contact_number${index}`}
                                                            id=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Owner</label>
                                                    <div className="form_elements">
                                                        <select
                                                            name={`number_owner${index}`}
                                                            id=""
                                                        >
                                                            <option value="father">
                                                                father
                                                            </option>
                                                            <option value="mother">
                                                                mother
                                                            </option>
                                                            <option value="shibling">
                                                                shibling
                                                            </option>
                                                            <option value="personal">
                                                                personal
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
                                <input
                                    type="hidden"
                                    name="student_language_count"
                                    value={totalLanguage.length}
                                />
                                {totalLanguage.map((i, index) => {
                                    return (
                                        <div
                                            key={i}
                                            className="multi_input_group"
                                        >
                                            <div>{index + 1}</div>
                                            <div className="d-flex">
                                                <div className="form-group form-vertical">
                                                    <label>
                                                        Language title
                                                    </label>
                                                    <div className="form_elements">
                                                        <select
                                                            name={`language_title${index}`}
                                                            id=""
                                                        >
                                                            <option value="arabic">
                                                                arabic
                                                            </option>
                                                            <option value="english">
                                                                english
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Profeciency</label>
                                                    <div className="form_elements">
                                                        <select
                                                            name={`language_profeciency${index}`}
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
                                <input
                                    type="hidden"
                                    name="student_skills_count"
                                    value={totalSkill.length}
                                />
                                {totalSkill.map((i, index) => {
                                    return (
                                        <div
                                            key={i}
                                            className="multi_input_group"
                                        >
                                            <div>{index + 1}</div>
                                            <div className="d-flex">
                                                <div className="form-group form-vertical">
                                                    <label>Skills title</label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="text"
                                                            placeholder="skills title"
                                                            name={`skills_title${index}`}
                                                            id=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Level</label>
                                                    <div className="form_elements">
                                                        <select
                                                            name={`skills_level${index}`}
                                                            id=""
                                                        >
                                                            <option value="high">
                                                                high
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
                                    );
                                })}
                            </div>
                        </div>
                        <div className="full_width">
                            <div className="form_section_heading">
                                <h4>Educational Background</h4>
                            </div>
                            <div className="multi_inputs">

                                <input
                                    type="hidden"
                                    name="educational_background_count"
                                    value={totalEducationalBackground.length}
                                />
                                {totalEducationalBackground.map((i, index) => {
                                    return (
                                        <div
                                            key={i}
                                            className="multi_input_group"
                                        >
                                            <div>{index + 1}</div>
                                            <div className="d-flex">
                                                <div className="form-group form-vertical">
                                                    <label>
                                                        Previous institute
                                                    </label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="text"
                                                            placeholder="previous institute"
                                                            name={`educational_background_previous_institute_${index}`}
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
                                                            defaultValue={date}
                                                            name={`educational_background_year_of_leaving_${index}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>Result</label>
                                                    <div className="form_elements">
                                                        <input
                                                            type="text"
                                                            placeholder="result"
                                                            name={`educational_background_result_${index}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group form-vertical">
                                                    <label>
                                                        Transfer certificate
                                                    </label>
                                                    <div className="form_elements">
                                                        <ImageUpload
                                                            name={`educational_background_transfer_cirtificate_${index}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="form-group student_submit form-horizontal">
                        {/* <label></label> */}
                        <div className="form_elementss">
                            <button
                                onClick={handle_submit}
                                type="button"
                                className="btn btn-sm  btn-outline-info"
                            >
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
