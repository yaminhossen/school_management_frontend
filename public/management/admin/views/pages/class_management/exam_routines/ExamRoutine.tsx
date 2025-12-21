import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
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
    const [exam, setExam] = useState<any>({});
    const [section2, setSection2] = useState<any>({});
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
            setSection2(response.data.data?.section || null);
        } catch (error) {
            console.error('Error fetching exam routine:', error);
            setError(error);
            setData([]);
            setSclass(undefined);
            setExam({});
            setSection2({});
        }
    };
    async function initdependancy() {
        await dispatch(storeSlice.actions.set_item({}));
        await dispatch(classes({}) as any);
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
    // Handle the print functionality
    function printPage() {
        window.print();
    }

    function get_day_data(i, day, key = 0) {
        if (dateFormate(i.date) === day) {
            return (
                <td key={key} className="class_time_and_room_content">
                    <div className="class_time_and_room">
                        <div className="time_rooom class_time">
                            {moment(i.start_time, 'HH:mm:ss').format('hh:mm A')}{' '}
                            - {moment(i.end_time, 'HH:mm:ss').format('hh:mm A')}
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
            <style>
                {`
                    /* Print Button Styling */
                    #printButtonRoutine {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        padding: 8px 22px;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    
                    #printButtonRoutine:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
                        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
                    }
                    
                    #printButtonRoutine:active {
                        transform: translateY(0);
                    }
                    
                    #printButtonRoutine::before {
                        content: "🖨️";
                        font-size: 18px;
                    }

                    /* Print Styles */
                    @media print {
                        /* Reset page margins */
                        @page {
                            margin: 0.5cm;
                            size: landscape;
                        }
                        
                        /* Hide everything except the table */
                        body * {
                            visibility: hidden;
                        }
                        
                        html, body {
                            width: 100%;
                            height: 100%;
                            margin: 0 !important;
                            padding: 0 !important;
                            overflow: hidden !important;
                        }
                        
                        .admin_dashboard,
                        .admin_sideba,
                        .class_schedule_area,
                        .container {
                            display: block !important;
                            position: static !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                            max-width: 100% !important;
                            overflow: visible !important;
                        }
                        
                        .class_schedule_content,
                        .class_schedule_content *,
                        .class_schedule_title h2,
                        .class_schedule_title h2 * {
                            visibility: visible;
                        }
                        
                        /* Hide all form elements and print button */
                        .class_schedule_title form,
                        #printButtonRoutine,
                        .form-group,
                        .form_elements,
                        .btn_routine,
                        .print_btn {
                            display: none !important;
                        }
                        
                        /* Set print page styles */
                        body {
                            background: white !important;
                            color: black !important;
                            font-family: Arial, sans-serif;
                        }
                        
                        /* Position the content for printing */
                        .class_schedule_content {
                            position: static !important;
                            display: block !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                            background: white !important;
                            color: black !important;
                            page-break-after: avoid;
                            overflow: visible !important;
                        }
                        
                        /* Title styling for print */
                        .class_schedule_title {
                            display: block !important;
                            position: static !important;
                            margin: 0 !important;
                            padding: 10px 0 5px 0 !important;
                            page-break-after: avoid;
                        }
                        
                        .class_schedule_title h2 {
                            position: static !important;
                            display: block !important;
                            text-align: center;
                            font-size: 26px;
                            font-weight: bold;
                            color: black !important;
                            margin: 0 0 15px 0 !important;
                            padding: 0 !important;
                            background: white !important;
                            visibility: visible !important;
                        }
                        
                        /* Table print styles */
                        .table_area {
                            background: white !important;
                            color: black !important;
                            border-collapse: collapse;
                            width: 100% !important;
                            margin: 0 !important;
                            table-layout: fixed !important;
                            page-break-inside: avoid;
                            page-break-after: avoid;
                        }
                        
                        .table_area th,
                        .table_area td {
                            background: white !important;
                            color: black !important;
                            border: 2px solid #333 !important;
                            padding: 10px 6px !important;
                            text-align: center;
                            font-size: 11px !important;
                            vertical-align: middle;
                            word-wrap: break-word;
                        }
                        
                        .table_head_area th {
                            background: #e8e8e8 !important;
                            font-weight: bold;
                            font-size: 12px !important;
                            text-transform: uppercase;
                            padding: 12px 6px !important;
                        }
                        
                        .class_name,
                        .exam_name {
                            background: #f5f5f5 !important;
                            font-weight: bold;
                            font-size: 13px !important;
                            vertical-align: middle;
                        }
                        
                        .subject {
                            background: #fafafa !important;
                            font-weight: 600;
                            font-size: 11px !important;
                        }
                        
                        .class_time_and_room_content {
                            background: white !important;
                            min-height: 50px;
                            padding: 8px 4px !important;
                        }
                        
                        .class_time_and_room {
                            display: block;
                            width: 100%;
                        }
                        
                        .time_rooom {
                            color: black !important;
                            font-size: 10px !important;
                            line-height: 1.5;
                            margin: 2px 0;
                            display: block;
                        }
                        
                        .class_time {
                            font-weight: bold;
                            color: #000 !important;
                            font-size: 11px !important;
                        }
                        
                        .room_title {
                            color: #444 !important;
                            font-size: 9px !important;
                        }
                        
                        /* Column widths for better layout */
                        .head_class_title {
                            width: 8% !important;
                        }
                        
                        .head_batch_title {
                            width: 8% !important;
                        }
                        
                        .head_subject_title {
                            width: 10% !important;
                        }
                        
                        .head_day_time_room_title {
                            width: 9.5% !important;
                        }
                        
                        /* Remove any dark backgrounds */
                        * {
                            background-color: white !important;
                            color: black !important;
                        }
                    }
                `}
            </style>
            {/* <h2>Class routine information</h2> */}
            <div className="admin_sideba custom_scroll">
                <section className="class_schedule_area">
                    <div className="container">
                        {/* class_schedule_title start */}
                        <div className="class_schedule_title">
                            <h2>Exam Routine</h2>
                            <form
                                onSubmit={(e) => handleSubmit(e)}
                                className="form_600tt mx-auto"
                            >
                                <div className="mt-4 d-flex text-left">
                                    <div className="form-group form-vertical">
                                        <label>Class</label>
                                        <div className="form_elements">
                                            <select
                                                name="branch_class_id"
                                                id=""
                                                onChange={handleChange2}
                                            >
                                                <option value="">
                                                    Select Class
                                                </option>
                                                {state?.classes?.length &&
                                                    state.classes?.map(
                                                        (
                                                            i: {
                                                                [
                                                                    key: string
                                                                ]: any;
                                                            },
                                                            index: number,
                                                        ) => {
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
                                                <div className="form_elements">
                                                    <select name="" id="">
                                                        <option value="">
                                                            At First Select
                                                            Class
                                                        </option>
                                                    </select>
                                                </div>
                                            )}
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
                                                        (
                                                            i: {
                                                                [
                                                                    key: string
                                                                ]: any;
                                                            },
                                                            index: number,
                                                        ) => {
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
                                    <div className="form-group form-vertical">
                                        <label></label>
                                        <div className="form_elements">
                                            <button className="btn btn_routine">
                                                submit
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label></label>
                                        <div className="form_elements print_btn">
                                            <button
                                                id="printButtonRoutine"
                                                onClick={printPage}
                                            >Print</button>
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
                                        <th className="head_batch_title">Section</th>
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
                                                                {section2?.title || 'N/A'}
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
