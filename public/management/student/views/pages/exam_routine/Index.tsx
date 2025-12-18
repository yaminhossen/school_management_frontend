import React, { useState, useEffect, useRef } from 'react';
import { anyObject } from '../../../common_types/object';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<anyObject[]>([]);

    useEffect(() => {
        // Function to fetch data
    }, []);

    const handleSubmit = async (exam_id: string) => {
        if (!exam_id) {
            setData([]);
            return;
        }

        console.log('exam_id', exam_id);

        try {
            const response = await axios.get(
                `/api/v1/exam-routines/plan/${exam_id}`,
            );
            setData(response.data.data);
        } catch (error) {
            setError(error);
            setData([]);
        }
    };
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
                            {/* {day} */}
                            {moment(i.start_time, 'HH:mm:ss').format(
                                'hh:mm A',
                            )}{' '}
                            - {moment(i.end_time, 'HH:mm:ss').format('hh:mm A')}
                        </div>
                        {/* <br /> */}
                        <div>{moment(i.date).format('MMMM Do YY')}</div>
                        <div className="time_rooom class_room">
                            <div className="room_title">
                                room - {i.room?.room_name}
                                {/* room - {i.guard_plan?.room?.room_code} */}
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

    const examRefId = useRef<HTMLSelectElement>(null);
    const [exames, setExames] = useState<any>([]);
    const fetchExames = async () => {
        try {
            const response = await axios.get(`/api/v1/exams/all-exam`);
            setExames(response.data.data);
        } catch (error) {
            setError(error);
        }
    };
    useEffect(() => {
        fetchExames();
    }, []);
    return (
        <div className="admin_dashboard">
            <div className="teacher_result">
                <div>Exam</div>
                <div>
                    <select
                        name="exam"
                        id=""
                        ref={examRefId}
                        onChange={(e) => handleSubmit(e.target.value)}
                    >
                        <option value="">Select an exam</option>
                        {exames.map((i, index) => {
                            return (
                                <option key={index} value={i.id}>
                                    {i.title}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="class_schedule_content">
                {data?.length > 0 ? (
                    <table className="table_area">
                        <thead>
                            <tr className="table_head_area">
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
                            {data.map(
                                (i: { [key: string]: any }, index: number) => {
                                    return (
                                        <tr key={index} className="table_body">
                                            <td className="subject">
                                                {i?.subjects?.name}
                                            </td>
                                            {days.map((day, dayIndex) =>
                                                get_day_data(i, day, dayIndex),
                                            )}
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                ) : (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '20px',
                            fontSize: '18px',
                            color: 'rgb(231 218 218)',
                        }}
                    >
                        Data not found. Please select an exam.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;
