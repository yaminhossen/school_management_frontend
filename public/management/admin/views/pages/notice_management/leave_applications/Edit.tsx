import React, { useEffect, useState } from 'react';
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
import moment from 'moment/moment';
export interface Props {}

const Edit: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();
    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, []);

    const [apStartDate, setApStartDate] = useState('');
    const [apEndDate, setApEndDate] = useState('');
    const [aptotalDays, setApTotalDays] = useState(0);

    useEffect(() => {
        let ss_Date = moment(state.item?.start_date).format('YYYY-MM-DD');
        setApStartDate(ss_Date);
        let ee_Date = moment(state.item?.end_Date).format('YYYY-MM-DD');
        setApEndDate(ee_Date);
    }, [state.item?.start_date, state.item?.end_date]);

    const calculateDays = (start: string, end: string) => {
        const diff = moment(end).diff(moment(start), 'days');
        setApTotalDays(diff >= 0 ? diff + 1 : 0);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApStartDate(e.target.value);
        calculateDays(e.target.value, state.item?.end_date);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApEndDate(e.target.value);
        calculateDays(apStartDate, e.target.value);
    };

    async function handle_submit(e) {
        e.preventDefault();
        let response = await dispatch(update(new FormData(e.target)) as any);
    }

    console.log('end_date2', aptotalDays);
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
                                    defaultValue={state.item?.id}
                                />
                                <input
                                    type="hidden"
                                    name="leave_type_id"
                                    defaultValue={state.item?.leave_type_id}
                                />
                                {state.item.student && (
                                    <div className="form-group form-horizontal">
                                        <label>Student</label>
                                        <div className="form_elements">
                                            <input
                                                type="text"
                                                name="student"
                                                placeholder="notice title"
                                                defaultValue={
                                                    state.item?.student?.name
                                                }
                                            />
                                            <input
                                                type="hidden"
                                                name="student_id"
                                                placeholder="notice title"
                                                defaultValue={
                                                    state.item.branch_student_id
                                                }
                                            />
                                        </div>
                                    </div>
                                )}
                                {state.item.staff && (
                                    <div className="form-group form-horizontal">
                                        <label>Staff</label>
                                        <div className="form_elements">
                                            <input
                                                type="text"
                                                name="staff"
                                                placeholder="notice title"
                                                defaultValue={
                                                    state.item?.staff?.name
                                                }
                                            />
                                            <input
                                                type="hidden"
                                                name="staff_id"
                                                placeholder="notice title"
                                                defaultValue={
                                                    state.item.branch_staff_id
                                                }
                                            />
                                        </div>
                                    </div>
                                )}
                                {state.item.teacher && (
                                    <div className="form-group form-horizontal">
                                        <label>Teacher</label>
                                        <div className="form_elements">
                                            <input
                                                type="text"
                                                name="teacher"
                                                placeholder="notice title"
                                                defaultValue={
                                                    state.item?.teacher?.name
                                                }
                                            />
                                            <input
                                                type="hidden"
                                                name="teacher_id"
                                                placeholder="notice title"
                                                defaultValue={
                                                    state.item.branch_teacher_id
                                                }
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="form-group form-horizontal">
                                    <label>Leave Type</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            name="description"
                                            defaultValue={
                                                state.item.leave_type?.title
                                            }
                                        ></input>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Reason</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            name="reason"
                                            placeholder="reason"
                                            defaultValue={state.item.reason}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Attachment</label>
                                    <div className="form_elements">
                                        <a
                                            target="blank"
                                            href={state.item?.attachments}
                                        >
                                            <img
                                                src={state.item?.attachments}
                                                height={100}
                                                alt=""
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Start Date</label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            readOnly
                                            name="start_date"
                                            placeholder="Start date"
                                            defaultValue={moment(
                                                state.item.start_date,
                                            ).format('YYYY-MM-DD')}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>End Date</label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            name="end_date"
                                            readOnly
                                            placeholder="End Date"
                                            defaultValue={moment(
                                                state.item.end_date,
                                            ).format('YYYY-MM-DD')}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Total Days</label>
                                    <div className="form_elements">
                                        <input
                                            type="number"
                                            name="total_days"
                                            readOnly
                                            placeholder="Toatal days"
                                            defaultValue={state.item.total_days}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Permission</label>
                                    <div className="form_elements">
                                        <select name="leave_status" id="">
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="approved">
                                                Approved
                                            </option>
                                            <option value="rejected">
                                                Reject
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Approved Start Date</label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            name="approved_start_date"
                                            placeholder="Approved start date"
                                            defaultValue={moment(
                                                state.item.start_date,
                                            ).format('YYYY-MM-DD')}
                                            onChange={handleStartDateChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Approved End Date</label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            name="approved_end_date"
                                            placeholder="Approved end Date"
                                            defaultValue={moment(
                                                state.item.end_date,
                                            ).format('YYYY-MM-DD')}
                                            onChange={handleEndDateChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Approved Total Days</label>
                                    <div className="form_elements">
                                        <input
                                            type="number"
                                            name="approved_days"
                                            placeholder="Approved days"
                                            value={
                                                aptotalDays
                                                    ? aptotalDays
                                                    : state.item?.total_days
                                            }
                                        />
                                    </div>
                                </div>
                                {/* <div className="form-group form-horizontal">
                                    <label>Pre Approved Days</label>
                                    <div className="form_elements">
                                        <input
                                            type="number"
                                            name="approved_days"
                                            placeholder="Approved days"
                                            defaultValue={
                                                state.item.approved_days
                                            }
                                        />
                                    </div>
                                </div> */}
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
                    )}

                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Edit;
