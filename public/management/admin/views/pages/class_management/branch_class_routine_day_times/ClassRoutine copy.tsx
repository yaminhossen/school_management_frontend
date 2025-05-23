import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import setup from './config/setup';
import { useAppDispatch } from '../../../../store';
import { store } from './config/store/async_actions/store';
import axios from 'axios';
export interface Props {}

const ClassRoutine: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        try {
            const response = await axios.post(
                '/api/v1/branch-classes/class-routine',
                formData,
            );
            console.log('ksdfjlsdjfldsjok');

            // setData(response.data.data.data);
        } catch (error) {
            setError(error);
        }
    };
    return (
        <div className="admin_dashboard">
            <h2>Class routine information</h2>
            <div className="admin_sideba custom_scroll">
                <section className="class_schedule_area">
                    <div className="container">
                        {/* class_schedule_title start */}
                        <div className="class_schedule_title">
                            <h2>class schedule</h2>
                            <form
                                onSubmit={(e) => handleSubmit(e)}
                                className="form_600 mx-auto pt-3"
                            >
                                <div className="mt-4 d-flex text-left">
                                    <div className="form-group form-vertical">
                                        <label>Branch</label>
                                        <div className="form_elements">
                                            <select name="branch_id" id="">
                                                <option value="1">
                                                    mirpur
                                                </option>
                                                <option value="2">
                                                    gulshan
                                                </option>
                                                <option value="3">
                                                    uttara
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Class</label>
                                        <div className="form_elements">
                                            <select name="class" id="">
                                                <option value="six">six</option>
                                                <option value="seven">
                                                    seven
                                                </option>
                                                <option value="eight">
                                                    eight
                                                </option>
                                            </select>
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
                                </div>
                            </form>
                        </div>
                        {/* class_schedule_title end */}
                        <div className="class_schedule_content">
                            {/* table_area start */}
                            <table className="table_area">
                                {/* table_head area start */}
                                <thead>
                                    <tr className="table_head_area">
                                        <th className="head_class_title">
                                            class name
                                        </th>
                                        <th className="head_batch_title">
                                            batch
                                        </th>
                                        <th className="head_subject_title">
                                            subject
                                        </th>
                                        <th className="head_day_time_room_title">
                                            <span className="head_day_time_room head_day">
                                                saturday
                                            </span>
                                            <span className="head_day_time_room head_time_and_room">
                                                <span className="head_time">
                                                    time
                                                </span>
                                                <span className="head_silash">
                                                    /
                                                </span>
                                                <span className="head_room">
                                                    room
                                                </span>
                                            </span>
                                        </th>
                                        <th className="head_day_time_room_title">
                                            <span className="head_day_time_room head_day">
                                                sunday
                                            </span>
                                            <span className="head_day_time_room head_time_and_room">
                                                <span className="head_time">
                                                    time
                                                </span>
                                                <span className="head_silash">
                                                    /
                                                </span>
                                                <span className="head_room">
                                                    room
                                                </span>
                                            </span>
                                        </th>
                                        <th className="head_day_time_room_title">
                                            <span className="head_day_time_room head_day">
                                                monday
                                            </span>
                                            <span className="head_day_time_room head_time_and_room">
                                                <span className="head_time">
                                                    time
                                                </span>
                                                <span className="head_silash">
                                                    /
                                                </span>
                                                <span className="head_room">
                                                    room
                                                </span>
                                            </span>
                                        </th>
                                        <th className="head_day_time_room_title">
                                            <span className="head_day_time_room head_day">
                                                tuesday
                                            </span>
                                            <span className="head_day_time_room head_time_and_room">
                                                <span className="head_time">
                                                    time
                                                </span>
                                                <span className="head_silash">
                                                    /
                                                </span>
                                                <span className="head_room">
                                                    room
                                                </span>
                                            </span>
                                        </th>
                                        <th className="head_day_time_room_title">
                                            <span className="head_day_time_room head_day">
                                                wednesday
                                            </span>
                                            <span className="head_day_time_room head_time_and_room">
                                                <span className="head_time">
                                                    time
                                                </span>
                                                <span className="head_silash">
                                                    /
                                                </span>
                                                <span className="head_room">
                                                    room
                                                </span>
                                            </span>
                                        </th>
                                        <th className="head_day_time_room_title">
                                            <span className="head_day_time_room head_day">
                                                thursday
                                            </span>
                                            <span className="head_day_time_room head_time_and_room">
                                                <span className="head_time">
                                                    time
                                                </span>
                                                <span className="head_silash">
                                                    /
                                                </span>
                                                <span className="head_room">
                                                    room
                                                </span>
                                            </span>
                                        </th>
                                        <th className="head_day_time_room_title">
                                            <span className="head_day_time_room head_day">
                                                friday
                                            </span>
                                            <span className="head_day_time_room head_time_and_room">
                                                <span className="head_time">
                                                    time
                                                </span>
                                                <span className="head_silash">
                                                    /
                                                </span>
                                                <span className="head_room">
                                                    room
                                                </span>
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                {/* table_head area end */}
                                <tbody>
                                    {/* table_body area start */}
                                    <tr className="table_body">
                                        <td className="class" rowSpan={4}>
                                            9
                                        </td>
                                        <td className="batch" rowSpan={2}>
                                            science 1
                                        </td>
                                        <td className="subject">bangla</td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                    {/* table_body area end */}
                                    {/* table_body area start */}
                                    <tr className="table_body">
                                        <td className="subject">english</td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                    {/* table_body area end */}
                                    {/* table_body area start */}
                                    <tr className="table_body">
                                        <td className="batch" rowSpan={2}>
                                            science 2
                                        </td>
                                        <td className="subject">math</td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                    {/* table_body area end */}
                                    {/* table_body area start */}
                                    <tr className="table_body">
                                        <td className="subject">physics</td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="class_time_and_room_content">
                                            <span className="class_time_and_room">
                                                <span className="time_rooom class_time">
                                                    7:00 am - 8:00 am
                                                </span>
                                                <span className="time_rooom class_room">
                                                    <span className="room_title">
                                                        room
                                                    </span>
                                                    <span className="dash_title">
                                                        -
                                                    </span>
                                                    <span className="room_number">
                                                        101
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                    {/* table_body area end */}
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

export default ClassRoutine;
