import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { useParams } from 'react-router-dom';
import storeSlice from './config/store';
import moment from 'moment/moment';
import { all_staff } from './config/store/async_actions/all_staff';
export interface Props {}

const TaskAssign: React.FC<Props> = (props: Props) => {
    const [staffs, setStaffs] = useState<number[]>([]);
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, []);

    function toggleStaff(id: number) {
        setStaffs((prevStaffs) => {
            if (prevStaffs.includes(id)) {
                // Remove the ID if it's already in the array
                return prevStaffs.filter((staffId) => staffId !== id);
            } else {
                // Add the ID if it's not in the array
                return [...prevStaffs, id];
            }
        });
    }
    useEffect(() => {
        console.log('staffs', staffs);
    }, [staffs]);
    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(all_staff({}) as any);
    }, []);
    if (state.staffs) {
        console.log('state staffs', state.staffs);
    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.details_page_title}></Header>

                    {Object.keys(state.item).length && (
                        <div className="content_body">
                            <table className="table quick_modal_table table-hover">
                                <tbody>
                                    <tr>
                                        <td>Title</td>
                                        <td>:</td>
                                        <td>{state.item.title}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <h1 className="my-2">Staffs :</h1>
                                <div>
                                    <ul className="assign_tasks">
                                        {state?.staffs?.length &&
                                            state?.staffs?.map(
                                                (
                                                    i: { [key: string]: any },
                                                    index,
                                                ) => {
                                                    return (
                                                        <li
                                                            className="assign_task_list"
                                                            onClick={() =>
                                                                toggleStaff(
                                                                    i.id,
                                                                )
                                                            }
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            <div>
                                                                <input
                                                                    type="checkbox"
                                                                    id={i.id}
                                                                    checked={staffs.includes(
                                                                        i.id,
                                                                    )}
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div>:</div>
                                                            <div>{i.name}</div>
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
                                        <li
                                            className="assign_task_list"
                                            onClick={() => toggleStaff(1)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id="2"
                                                    checked={staffs.includes(1)}
                                                    readOnly
                                                />
                                            </div>
                                            <div>:</div>
                                            <div>Yamin</div>
                                        </li>
                                        <li>
                                            <div className="assign_task_list">
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        name=""
                                                        id=""
                                                    />
                                                </div>
                                                <div>:</div>
                                                <div>Ymain</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="assign_task_list">
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        name=""
                                                        id=""
                                                    />
                                                </div>
                                                <div>:</div>
                                                <div>Ymain</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="assign_task_list">
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        name=""
                                                        id=""
                                                    />
                                                </div>
                                                <div>:</div>
                                                <div>Ymain</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="assign_task_list">
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        name=""
                                                        id=""
                                                    />
                                                </div>
                                                <div>:</div>
                                                <div>Ymain</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="assign_task_list">
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        name=""
                                                        id=""
                                                    />
                                                </div>
                                                <div>:</div>
                                                <div>Ymain</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="assign_task_list">
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        name=""
                                                        id=""
                                                    />
                                                </div>
                                                <div>:</div>
                                                <div>Ymain</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default TaskAssign;
