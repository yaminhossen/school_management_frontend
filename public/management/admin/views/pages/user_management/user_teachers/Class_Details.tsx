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
import BackButton from './components/management_data_page/BackButton';
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
            <BackButton></BackButton>
            {/* <h2>Class routine information</h2> */}
            <div className="admin_sideba custom_scroll">
                <section className="class_schedule_area">
                    <div className="container">
                        {/* class_schedule_title end */}
                        <div className="class_schedule_content">
                            {/* Summary Statistics */}
                            <div
                                style={{
                                    marginBottom: '20px',
                                    padding: '15px',
                                    backgroundColor: '#44454794',
                                    border: '2px solid #000',
                                    borderRadius: '5px',
                                }}
                            >
                                <h3
                                    style={{
                                        margin: '0 0 10px 0',
                                        color: '#f5f6f8f1',
                                    }}
                                >
                                    Teacher Class Summary
                                </h3>
                                <p
                                    style={{
                                        margin: '5px 0',
                                        fontSize: '16px',
                                        color: '#f5f6f8f1',
                                    }}
                                >
                                    <strong>Total Classes: </strong>
                                    {state.item?.total_classes || 0}
                                </p>
                                <p
                                    style={{
                                        margin: '5px 0',
                                        fontSize: '16px',
                                        color: '#f5f6f8f1',
                                    }}
                                >
                                    <strong>Total Subjects: </strong>
                                    {state.item?.classes?.reduce(
                                        (total, cls) =>
                                            total + (cls.subject_count || 0),
                                        0,
                                    ) || 0}
                                </p>
                            </div>

                            {/* table_area start */}
                            <table
                                style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    border: '2px solid #000',
                                    backgroundColor: '#2c2c2c',
                                    fontSize: '14px',
                                }}
                            >
                                {/* table_head area start */}
                                <thead>
                                    <tr
                                        style={{
                                            backgroundColor: '#1a1a1a',
                                            color: '#fff',
                                        }}
                                    >
                                        <th
                                            style={{
                                                border: '1px solid #000',
                                                padding: '12px 15px',
                                                textAlign: 'left',
                                                fontWeight: 'bold',
                                                fontSize: '16px',
                                            }}
                                        >
                                            Class Name
                                        </th>
                                        <th
                                            style={{
                                                border: '1px solid #000',
                                                padding: '12px 15px',
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '16px',
                                            }}
                                        >
                                            Subject Count
                                        </th>
                                        <th
                                            style={{
                                                border: '1px solid #000',
                                                padding: '12px 15px',
                                                textAlign: 'left',
                                                fontWeight: 'bold',
                                                fontSize: '16px',
                                            }}
                                        >
                                            Subjects
                                        </th>
                                    </tr>
                                </thead>
                                {/* table_head area end */}
                                <tbody>
                                    {state.item?.classes?.length ? (
                                        state.item?.classes.map((i, index) => (
                                            <tr 
                                                key={index}
                                                style={{
                                                    backgroundColor: index % 2 === 0 ? '#3a3a3a' : '#2c2c2c',
                                                }}
                                            >
                                                <td
                                                    style={{
                                                        border: '1px solid #000',
                                                        padding: '12px 15px',
                                                        fontWeight: '600',
                                                        color: '#fff',
                                                        verticalAlign: 'top',
                                                    }}
                                                >
                                                    {i.name}
                                                </td>
                                                <td
                                                    style={{
                                                        border: '1px solid #000',
                                                        padding: '12px 15px',
                                                        textAlign: 'center',
                                                        fontWeight: 'bold',
                                                        color: '#dee1e2ff',
                                                        fontSize: '16px',
                                                        verticalAlign: 'top',
                                                    }}
                                                >
                                                    {i.subject_count || 0}
                                                </td>
                                                <td
                                                    style={{
                                                        border: '1px solid #000',
                                                        padding: '12px 15px',
                                                        verticalAlign: 'top',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexWrap: 'wrap',
                                                            gap: '8px',
                                                        }}
                                                    >
                                                        {i.subjects?.map(
                                                            (
                                                                subject,
                                                                subjectIndex,
                                                            ) => (
                                                                <span
                                                                    key={
                                                                        subjectIndex
                                                                    }
                                                                    style={{
                                                                        display:
                                                                            'inline-block',
                                                                        padding:
                                                                            '6px 12px',
                                                                        backgroundColor:
                                                                            '#111111c0',
                                                                        color: '#fff',
                                                                        borderRadius:
                                                                            '15px',
                                                                        fontSize:
                                                                            '13px',
                                                                        fontWeight:
                                                                            '500',
                                                                        border: '1px solid #e9e9e9ff',
                                                                    }}
                                                                >
                                                                    {
                                                                        subject.name
                                                                    }
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                style={{
                                                    border: '1px solid #000',
                                                    padding: '40px 15px',
                                                    textAlign: 'center',
                                                    backgroundColor: '#2c2c2c',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: '18px',
                                                        color: '#ccc',
                                                        fontWeight: '500',
                                                    }}
                                                >
                                                    No classes assigned to this
                                                    teacher
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
