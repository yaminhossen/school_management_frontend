import React, { useEffect } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { Link, Outlet, useParams } from 'react-router-dom';
import storeSlice from './config/store';
import moment from 'moment/moment';
import { class_details } from './config/store/async_actions/class_details';
export interface Props {}

const Class_Details: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(class_details({ id: params.id }) as any);
    }, []);
    console.log('state', state.item);

    return (
        <div className="admin_dashboard">
            {/* <h2>Class routine information</h2> */}
            <div className="admin_sideba custom_scroll">
                <section className="class_schedule_area">
                    <div className="container">
                        {/* class_schedule_title end */}
                        <div className="class_schedule_content">
                            {/* table_area start */}
                            <table className="table_area">
                                {/* table_head area start */}
                                {/* <thead>
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
                                    </tr>
                                </thead> */}
                                {/* table_head area end */}
                                <tbody>
                                    {state.item?.classes?.length ? (
                                        state.item?.classes.map((i, index) => (
                                            <tr
                                                className="table_body"
                                                key={index}
                                            >
                                                <td className="subject">
                                                    {i.name}
                                                </td>
                                                {i.subjects?.map(
                                                    (r, rIndex) => (
                                                        <td
                                                            className="class_time_and_room_content"
                                                            key={rIndex}
                                                        >
                                                            <div className="class_time">
                                                                {r.name}
                                                            </div>
                                                        </td>
                                                    ),
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={9}>
                                                <div
                                                    style={{
                                                        fontSize: '24px',
                                                        color: 'white',
                                                    }}
                                                    className="not_found routine_not_found f-size-4 m-4"
                                                >
                                                    No data found
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

export default Class_Details;
