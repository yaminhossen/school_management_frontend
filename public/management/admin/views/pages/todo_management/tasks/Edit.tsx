import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { store } from './config/store/async_actions/store';
import DropDown from './components/dropdown/DropDown';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { useParams } from 'react-router-dom';
import storeSlice from './config/store';
import moment from 'moment/moment';
import { all_staff } from './config/store/async_actions/all_staff';
import { all_teacher } from './config/store/async_actions/all_teacher';
import { assign_task } from './config/store/async_actions/assign_task';
import { all_staff_task } from './config/store/async_actions/all_staff_task';
import { all_teacher_task } from './config/store/async_actions/all_teacher_task';
export interface Props {}

const Edit: React.FC<Props> = (props: Props) => {
    const [staffs, setStaffs] = useState<number[]>([]);
    const [teachers, setTeachers] = useState<number[]>([]);
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const dispatch = useAppDispatch();
    const params = useParams();
    let id = params.id;
    console.log('assing page id', id);

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, []);

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(all_staff_task({ id: id }) as any);
        dispatch(all_teacher_task({ id: id }) as any);
    }, []);

    // Initialize pre-assigned staffs
    useEffect(() => {
        if (state?.staffs?.length) {
            const preAssignedStaffIds = state.staffs
                .filter((staff: any) => staff.taskstaffs !== null)
                .map((staff: any) => staff.id);
            setStaffs(preAssignedStaffIds);
        }
    }, [state.staffs]);

    // // Initialize pre-assigned staffs
    // useEffect(() => {
    //     if (state?.staffs?.length) {
    //         const preAssignedStaffIds = state.staffs
    //             .filter((staff: any) => staff.taskstaffs !== null)
    //             .map((staff: any) => staff.id);
    //         setStaffs(preAssignedStaffIds);
    //     }
    // }, [state.staffs]);

    function toggleStaff(id: number, user: string) {
        if (user === 'staff') {
            setStaffs((prevStaffs) => {
                if (prevStaffs.includes(id)) {
                    // Remove the ID if it's already in the array
                    return prevStaffs.filter((staffId) => staffId !== id);
                } else {
                    // Add the ID if it's not in the array
                    return [...prevStaffs, id];
                }
            });
        } else if (user === 'teacher') {
            setTeachers((prevStaffs) => {
                if (prevStaffs.includes(id)) {
                    // Remove the ID if it's already in the array
                    return prevStaffs.filter((staffId) => staffId !== id);
                } else {
                    // Add the ID if it's not in the array
                    return [...prevStaffs, id];
                }
            });
        }
    }

    async function handle_submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            let formdata = new FormData(e.target as HTMLFormElement) as any;

            formdata.append('staffs', JSON.stringify(staffs));
            formdata.append('teachers', JSON.stringify(teachers));
            formdata.append('id', id);

            let response = await dispatch(assign_task(formdata) as any);
            console.log('response', response);
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    }

    let formateddata = moment().format('YYYY-MM-DD');

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.edit_page_title}></Header>
                    <div className="content_body custom_scroll">
                        <form
                            onSubmit={(e) => handle_submit(e)}
                            className="form_600f mx-auto pt-3"
                        >
                            <div className="form_600">
                                <div className="form-group form-horizontal">
                                    <label>Title</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="title"
                                            name="title"
                                            defaultValue={state.item.title}
                                        />
                                        {/* <div className="form_error">
                                            The title field is required
                                        </div> */}
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Description</label>
                                    <div className="form_elements">
                                        <textarea
                                            name="description"
                                            id=""
                                            placeholder="description"
                                            defaultValue={
                                                state.item.description
                                            }
                                        ></textarea>
                                    </div>
                                </div>
                                {/* <div className="form-group form-horizontal">
                                    <label>Admin</label>
                                    <div className="form_elements">
                                        <select name="admin" id="">
                                            <option value="admin1">
                                                Admin1
                                            </option>
                                            <option value="running">
                                                Admin2
                                            </option>
                                            <option value="completed">
                                                Admin3
                                            </option>
                                            <option value="nexttime">
                                                Admin4
                                            </option>
                                        </select>
                                    </div>
                                </div> */}
                                <div className="form-group form-horizontal">
                                    <label>Date</label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            defaultValue={moment(
                                                state.item.date,
                                            ).format('YYYY-MM-DD')}
                                            name="date"
                                            id=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1 className="my-2">Staffs :</h1>
                                    <div>
                                        <ul className="assign_tasks">
                                            {state?.staffs?.length &&
                                                state?.staffs?.map(
                                                    (
                                                        i: {
                                                            [key: string]: any;
                                                        },
                                                        index,
                                                    ) => {
                                                        return (
                                                            <li
                                                                className="assign_task_list"
                                                                onClick={() =>
                                                                    toggleStaff(
                                                                        i.id,
                                                                        'staff',
                                                                    )
                                                                }
                                                                style={{
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                <div>
                                                                    <input
                                                                        type="checkbox"
                                                                        id={
                                                                            i.id
                                                                        }
                                                                        checked={staffs.includes(
                                                                            i.id,
                                                                        )}
                                                                        // readOnly
                                                                    />
                                                                </div>
                                                                <div>:</div>
                                                                <div>
                                                                    {i.name}
                                                                </div>
                                                            </li>
                                                        );
                                                    },
                                                )}
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="my-4">Teachers :</h1>
                                    <div>
                                        <ul className="assign_tasks">
                                            {state?.teachers?.length &&
                                                state?.teachers?.map(
                                                    (
                                                        i: {
                                                            [key: string]: any;
                                                        },
                                                        index,
                                                    ) => {
                                                        return (
                                                            <li
                                                                className="assign_task_list"
                                                                onClick={() =>
                                                                    toggleStaff(
                                                                        i.id,
                                                                        'teacher',
                                                                    )
                                                                }
                                                                style={{
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                <div>
                                                                    <input
                                                                        type="checkbox"
                                                                        id={
                                                                            i.id
                                                                        }
                                                                        checked={teachers.includes(
                                                                            i.id,
                                                                        )}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                                <div>:</div>
                                                                <div>
                                                                    {i.name}
                                                                </div>
                                                            </li>
                                                        );
                                                    },
                                                )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-horizonta">
                                <div className="task_assign_submit_btn">
                                    <button
                                        // onClick={handle_submit}
                                        className="btn btn_1"
                                    >
                                        submit
                                    </button>
                                </div>
                            </div>
                            {/* <div className="form-group form-horizontal">
                                <label></label>
                                <div className="form_elements">
                                    <button className="btn btn_1">
                                        submit
                                    </button>
                                </div>
                            </div> */}
                        </form>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Edit;
