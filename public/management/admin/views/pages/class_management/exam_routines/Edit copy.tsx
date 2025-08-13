import React, { useEffect, useRef, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { useParams } from 'react-router-dom';
import storeSlice from './config/store';
import { update } from './config/store/async_actions/update';
import { classes } from './config/store/async_actions/classes';
import axios from 'axios';
import moment from 'moment/moment';
import { exams } from './config/store/async_actions/all_exams';
import { rooms } from './config/store/async_actions/rooms';
export interface Props {}

const Edit: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [subjects, setSubjects] = useState<any>([]);
    const [classId, setClassId] = useState<any>(Number);
    const search_input = useRef<HTMLSelectElement>(null);
    const [startDate, setStartDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/v1/branch-class-subjects/class-wise-subject/${state.item?.class_id}`,
            );
            setSubjects(response.data.data);
        } catch (error) {
            setError(error);
        }
    };

    async function initdependancy() {
        await dispatch(storeSlice.actions.set_item({}));
        await dispatch(classes({}) as any);
        await dispatch(exams({}) as any);
        await dispatch(rooms({}) as any);
        dispatch(details({ id: params.id }) as any);
    }

    useEffect(() => {
        initdependancy();
    }, []);

    useEffect(() => {
        fetchData();
    }, [state.item?.class_id]);

    useEffect(() => {
        if (state.item) {
            setStartDate(moment(state.item.date).format('YYYY-MM-DD'));
        }
    }, [state.item]);

    async function handle_submit(e) {
        e.preventDefault();
        let response = await dispatch(update(new FormData(e.target)) as any);
    }
    const [classID, setClassID] = useState('');
    const [sections, setSections] = useState<any>([]);
    const handleChange3 = async (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        let id = event.target.value;
        setClassID(id);
        try {
            const response = await axios.get(
                `/api/v1/branch-class-sections/class-wise/${id}`,
            );
            setSections(response.data.data);
        } catch (error) {
            setError(error);
        }
        console.log('Selected value:', event.target.value);
    };
    const handleChange = async (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        let id = event.target.value;
        try {
            const response = await axios.get(
                `/api/v1/branch-class-subjects/class-section-wise-subject/${classID}?section_id=${id}`,
            );
            setSubjects(response.data.data);
        } catch (error) {
            setError(error);
        }
    };
    useEffect(() => {
        const start = moment(startDate);
        const today = moment().startOf('day');

        if (start.isBefore(today)) {
            setErrorMessage('Date cannot be before today.');
            return;
        }

        setErrorMessage('');
    }, [startDate]);
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.edit_page_title}></Header>

                    {Object.keys(state.item).length && (
                        <div className="content_body custom_scroll">
                            <form
                                onSubmit={(e) => handle_submit(e)}
                                className="form_600 mx-auto pt-3"
                            >
                                <input
                                    type="hidden"
                                    name="id"
                                    defaultValue={state.item.id}
                                />
                                <div className="form-group form-horizontal">
                                    <label>
                                        Branch Class{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        {state.classes.length && (
                                            <select
                                                name="class_id"
                                                id=""
                                                onChange={handleChange3}
                                                defaultValue={
                                                    state.item.class_id
                                                }
                                            >
                                                {state?.classes?.length &&
                                                    state.classes?.map(
                                                        (i: {
                                                            [key: string]: any;
                                                        }) => {
                                                            return (
                                                                <option
                                                                    value={i.id}
                                                                >
                                                                    {i.name}
                                                                </option>
                                                            );
                                                        },
                                                    )}
                                            </select>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Section{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <select
                                            name="section_id"
                                            onChange={handleChange}
                                            id=""
                                        >
                                            <option value="">
                                                Select Section
                                            </option>
                                            {sections.map((i, index) => {
                                                return (
                                                    <option value={i.id}>
                                                        {i.title}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Branch Class subject{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <select
                                            name="subject_id"
                                            defaultValue={state.item.subject_id}
                                            id=""
                                        >
                                            {/* <option value={data.class_id}></option> */}

                                            <option value="">
                                                Select Subject
                                            </option>
                                            {subjects.map((i, index) => {
                                                return (
                                                    <option value={i.id}>
                                                        {i.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Exam{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <select
                                            name="exam_id"
                                            id=""
                                            defaultValue={state.item.exam_id}
                                            // onChange={handleChange}
                                        >
                                            {state?.exams?.length &&
                                                state.exams?.map(
                                                    (i: {
                                                        [key: string]: any;
                                                    }) => {
                                                        return (
                                                            <option
                                                                value={i.id}
                                                            >
                                                                {i.title}
                                                            </option>
                                                        );
                                                    },
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Room{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <select
                                            name="room_id"
                                            id=""
                                            defaultValue={state.item.room_id}
                                            // onChange={handleChange}
                                        >
                                            {state?.rooms?.length &&
                                                state.rooms?.map(
                                                    (i: {
                                                        [key: string]: any;
                                                    }) => {
                                                        return (
                                                            <option
                                                                value={i.id}
                                                            >
                                                                {i.room_name}
                                                            </option>
                                                        );
                                                    },
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Start Time{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="time"
                                            placeholder="start time"
                                            name="start_time"
                                            defaultValue={moment(
                                                state.item?.start_time,
                                                'HH:mm:ss',
                                            ).format('HH:mm')}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        End Time{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="time"
                                            placeholder="end time"
                                            name="end_time"
                                            defaultValue={moment(
                                                state.item?.end_time,
                                                'HH:mm:ss',
                                            ).format('HH:mm')}
                                        />
                                    </div>
                                </div>
                                {/* <div className="form-group form-horizontal">
                                    <label>
                                        Date{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            name="date"
                                            defaultValue={moment(
                                                state.item?.date,
                                            ).format('YYYY-MM-DD')}
                                        />
                                    </div>
                                </div> */}
                                <div className="form-group form-horizontal">
                                    <label>
                                        Date{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                            name="date"
                                        />
                                        {errorMessage && (
                                            <div
                                                style={{
                                                    color: 'red',
                                                    marginTop: '5px',
                                                }}
                                            >
                                                {errorMessage}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group student_submit form-horizontal">
                                    {/* <label></label> */}
                                    <div className="form_elementss">
                                        <button
                                            className={`btn btn_1 ${errorMessage ? 'btn_error' : ''}`}
                                            disabled={!!errorMessage}
                                        >
                                            update
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Edit;
