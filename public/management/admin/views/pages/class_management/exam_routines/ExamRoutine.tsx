import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { store } from './config/store/async_actions/store';
import axios from 'axios';
import moment from 'moment/moment';
import { initialState } from './config/store/inital_state';
import { useSelector } from 'react-redux';
import storeSlice from './config/store';
import { classes } from './config/store/async_actions/classes';
export interface Props {}

const ExamRoutine: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any[]>([]);
    const [s_class, setSclass] = useState<any>();
    const [sections, setSections] = useState<any>([]);
    const [section, setSection] = useState<any>({});
    const [exam, setExam] = useState<any>({});
    const [selectedClassId, setSelectedClassId] = useState('');

    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        try {
            const response = await axios.post(
                '/api/v1/exam-routines/admin-exam-routines',
                formData,
            );
            console.log('Response:', response.data);

            setData(response.data.data?.data || []);
            setSclass(response.data.data?.s_class || null);
            setExam(response.data.data?.exams || null);
        } catch (error) {
            console.error('Error fetching exam routine:', error);
            setError(error);
            setData([]);
            setSclass(undefined);
            setExam({});
        }
    };
    async function initdependancy() {
        await dispatch(storeSlice.actions.set_item({}));
        await dispatch(classes({}) as any);
        // await dispatch(sections({}) as any);
    }

    useEffect(() => {
        initdependancy();
    }, []);

    const handleChange2 = async (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        let id = event.target.value;
        setSelectedClassId(id);
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

    const [exames, setExames] = useState<any>([]);
    const fetchExames = async () => {
        try {
            const response = await axios.get(`/api/v1/exams/all-exam`);
            setExames(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };
    useEffect(() => {
        fetchExames();
    }, []);
    let days = [
        'saturday',
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
    ];

    function dateFormate(date: string) {
        return moment(date).format('dddd').toLowerCase();
    }

    function get_day_data(i, day, key = 0) {
        if (dateFormate(i.date) === day) {
            return (
                <td key={key} className="class_time_and_room_content">
                    <div className="class_time_and_room">
                        <div className="time_rooom class_time">
                            {moment(i.start_time, 'HH:mm:ss').format('hh:mm A')} - {moment(i.end_time, 'HH:mm:ss').format('hh:mm A')}
                        </div>
                        <div>{moment(i.date).format('MMMM Do YY')}</div>
                        <div className="time_rooom class_room">
                            <div className="room_title">
                                room - {i.room?.room_name}
                            </div>
                        </div>
                    </div>
                </td>
            );
        } else {
            return (
                <td key={key} className="class_time_and_room_content">
                    -
                </td>
            );
        }
    }

    return (
        <div className="admin_dashboard">
            {/* <h2>Class routine information</h2> */}
            <div className="admin_sideba custom_scroll">
                <section className="class_schedule_area">
                    <div className="container">
                        {/* class_schedule_title start */}
                        <div className="class_schedule_title">
                            <h2>Exam Routine</h2>
                            <form
                                onSubmit={(e) => handleSubmit(e)}
                                className="form_600 mx-auto pt-3"
                            >
                                <div className="mt-4 d-flex text-left">
                                    <div className="form-group form-vertical">
                                        <label>Class</label>
                                        <div className="form_elements">
                                            <select
                                                name="branch_class_id"
                                                id=""
                                            >
                                                <option value="">
                                                    Select Class
                                                </option>
                                                {state?.classes?.length &&
                                                    state.classes?.map(
                                                        (i: {
                                                            [key: string]: any;
                                                        }, index: number) => {
                                                            return (
                                                                <option
                                                                    key={index}
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
                                    <div className="form-group form-vertical">
                                        <label>Exam</label>
                                        <div className="form_elements">
                                            <select name="branch_exam_id" id="">
                                                <option value="">
                                                    Select Exam
                                                </option>
                                                {exames?.length &&
                                                    exames?.map(
                                                        (i: {
                                                            [key: string]: any;
                                                        }, index: number) => {
                                                            return (
                                                                <option
                                                                    key={index}
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
                                    {/* <div className="form-group form-vertical">
                                        <label>Section</label>
                                        <div className="form_elements">
                                            {sections.length > 0 ? (
                                                <select
                                                    name="branch_class_section_id"
                                                    disabled={
                                                        !selectedClassId ||
                                                        sections.length === 0
                                                    }
                                                >
                                                    <option value="">
                                                        Select section
                                                    </option>
                                                    {sections.map(
                                                        (i, index) => (
                                                            <option
                                                                key={i.id}
                                                                value={i.id}
                                                            >
                                                                {i.title}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            ) : (
                                                <div
                                                    style={{
                                                        fontSize: '14px',
                                                        color: 'black',
                                                    }}
                                                    className="not_found_text"
                                                >
                                                    At First Select Class
                                                </div>
                                            )}
                                        </div>
                                    </div> */}
                                    <div className="form-group student_submit form-horizontal">
                                        <label></label>
                                        <div className="form_elements">
                                            <button className="btn btn_1">
                                                submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* class_schedule_title end */}
                        {/* eslint-disable */}
                        <div className="class_schedule_content">
                            {/* table_area start */}
                            <table className="table_area">
                                <thead>
                                    <tr className="table_head_area">
                                        <th className="head_class_title">class name</th>
                                        <th className="head_batch_title">exam</th>
                                        <th className="head_subject_title">subjects</th>
                                        <th
                                            className="head_day_time_room_title"
                                            style={{ width: 'unset' }}
                                        >
                                            <span className="head_day_time_room head_day">
                                                saturday
                                            </span>
                                            <span className="head_day_time_room head_time_and_room">
                                                <span className="head_time">time</span>
                                                <span className="head_silash">/</span>
                                                <span className="head_room">room</span>
                                            </span>
                                        </th>
                                        <th
                                            className="head_day_time_room_title"
                                            style={{ width: 'unset' }}
                                        >
                                            <span className="head_day_time_room head_day">
                                                sunday
                                            </span>
                                            <span className="head_day_time_room head_time_and_room">
                                                <span className="head_time">time</span>
                                                <span className="head_silash">/</span>
                                                <span className="head_room">room</span>
                                            </span>
                                        </th>
                                        <th className="head_day_time_room_title">
                                            <span className="head_day_time_room head_day">
                                                monday
                                            </span>
                                            <span className="head_day_time_room head_time_and_room">
                                                <span className="head_time">time</span>
                                                <span className="head_silash">/</span>
                                                <span className="head_room">room</span>
                                            </span>
                                        </th>
                                        <th className="head_day_time_room_title">
                                            <span className="head_day_time_room head_day">
                                                tuesday
                                            </span>
                                            <span className="head_day_time_room head_time_and_room">
                                                <span className="head_time">time</span>
                                                <span className="head_silash">/</span>
                                                <span className="head_room">room</span>
                                            </span>
                                        </th>
                                        <th className="head_day_time_room_title">
                                            <span className="head_day_time_room head_day">
                                                wednesday
                                            </span>
                                            <span className="head_day_time_room head_time_and_room">
                                                <span className="head_time">time</span>
                                                <span className="head_silash">/</span>
                                                <span className="head_room">room</span>
                                            </span>
                                        </th>
                                        <th className="head_day_time_room_title">
                                            <span className="head_day_time_room head_day">
                                                thursday
                                            </span>
                                            <span className="head_day_time_room head_time_and_room">
                                                <span className="head_time">time</span>
                                                <span className="head_silash">/</span>
                                                <span className="head_room">room</span>
                                            </span>
                                        </th>
                                        <th className="head_day_time_room_title">
                                            <span className="head_day_time_room head_day">
                                                friday
                                            </span>
                                            <span className="head_day_time_room head_time_and_room">
                                                <span className="head_time">time</span>
                                                <span className="head_silash">/</span>
                                                <span className="head_room">room</span>
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.length > 0 ? (
                                        data.map(
                                            (i: { [key: string]: any }, index: number) => {
                                                return (
                                                    <tr key={index} className="table_body">
                                                        {index === 0 && (
                                                            <td rowSpan={data.length} className="class_name">
                                                                {s_class?.name || 'N/A'}
                                                            </td>
                                                        )}
                                                        {index === 0 && (
                                                            <td rowSpan={data.length} className="exam_name">
                                                                {exam?.title || 'N/A'}
                                                            </td>
                                                        )}
                                                        <td className="subject">
                                                            {i?.subjects?.name}
                                                        </td>
                                                        {days.map((day, dayIndex) =>
                                                            get_day_data(i, day, dayIndex),
                                                        )}
                                                    </tr>
                                                );
                                            },
                                        )
                                    ) : (
                                        <tr>
                                            <td colSpan={10}>
                                                <div
                                                    style={{
                                                        fontSize: '18px',
                                                        color: '#666',
                                                        textAlign: 'center',
                                                        padding: '40px',
                                                    }}
                                                    className="not_found routine_not_found"
                                                >
                                                    No exam routine found. Please select class and exam, then click submit.
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {/* table_area end */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ExamRoutine;
