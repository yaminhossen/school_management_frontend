import React, { useEffect, useRef, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { store } from './config/store/async_actions/store';
import DropDown from './components/dropdown/DropDown';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { initialState } from './config/store/inital_state';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import storeSlice from './config/store';
import { classes } from './config/store/async_actions/classes';
import { exams } from './config/store/async_actions/all_exams';
export interface Props {}

const Create: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [subjects, setSubjects] = useState<any>([]);
    const search_input = useRef<HTMLSelectElement>(null);
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    async function handle_submit(e) {
        e.preventDefault();
        let response = await dispatch(store(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
        }
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/v1/branch-class-subjects/class-wise-subject/1`,
            );
            setSubjects(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    async function initdependancy() {
        await dispatch(storeSlice.actions.set_item({}));
        await dispatch(classes({}) as any);
        await dispatch(exams({}) as any);
        await fetchData();
    }

    useEffect(() => {
        initdependancy();
    }, []);
    console.log('state', state);
    const handleChange = async (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        let id = event.target.value;
        try {
            const response = await axios.get(
                `/api/v1/branch-class-subjects/class-wise-subject/${id}`,
            );
            setSubjects(response.data.data);
        } catch (error) {
            setError(error);
        }
        console.log('Selected value:', event.target.value);
    };
    console.log('Selected dataaa:', subjects);
    if (state) {
        console.log('exams', state);
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
                            <div className="">
                                <div className="form-group form-horizontal">
                                    <label>Branch Class id</label>
                                    <div className="form_elements">
                                        <select
                                            name="class_id"
                                            id=""
                                            onChange={handleChange}
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
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Branch Class subject id</label>
                                    <div className="form_elements">
                                        {subjects.length && (
                                            <select name="subject_id" id="">
                                                {/* <option value={data.class_id}></option> */}
                                                {subjects.map((i, index) => {
                                                    return (
                                                        <option value={i.id}>
                                                            {i.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Exam</label>
                                    <div className="form_elements">
                                        <select
                                            name="exam_id"
                                            id=""
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
                                    <label>Start Time</label>
                                    <div className="form_elements">
                                        <input
                                            type="time"
                                            placeholder="start time"
                                            name="start_time"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>End Time</label>
                                    <div className="form_elements">
                                        <input
                                            type="time"
                                            placeholder="end time"
                                            name="end_time"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Date</label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            name="date"
                                            defaultValue={moment().format(
                                                'YYYY-MM-DD',
                                            )}
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