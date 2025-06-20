import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import setup from '../config/setup.ts';
import { RootState, useAppDispatch } from '../../../../store';
import { class_details } from '../config/store/async_actions/class_details.ts';
import { initialState } from '../config/store/inital_state';
import { Link, useParams } from 'react-router-dom';
import storeSlice from '../config/store';
import Paginate from '../../../components/Paginate';
import { all } from '../config/store/async_actions/all';
export interface Props {}

const Details: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(class_details({ id: params.id }) as any);
    }, []);

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <Link
                    to="/add-new"
                    className="btn btn-sm btn-outline-info mb-2"
                    type="submit"
                >
                    Add New
                </Link>
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Name</th>
                                    <th>Student Id</th>
                                    <th>Roll</th>
                                    <th>Class</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {state.item?.data?.length &&
                                    state?.item?.data?.map(
                                        (i: { [key: string]: any }) => {
                                            return (
                                                <tr>
                                                    <td></td>
                                                    <td>{i.id}</td>
                                                    <td>
                                                        {i.branchstudent?.name}
                                                    </td>
                                                    <td>
                                                        {
                                                            i.infostudent
                                                                ?.student_id
                                                        }
                                                    </td>
                                                    <td>
                                                        {i.infostudent?.role_no}
                                                    </td>
                                                    <td>
                                                        {
                                                            i.infostudent?.class
                                                                ?.name
                                                        }
                                                    </td>
                                                    <td>
                                                        <Link
                                                            // to="/students/single/student/"
                                                            to={`/students/single/student/${i.branch_student_id}`}
                                                            className="btn btn-sm  btn-outline-info"
                                                            type="submit"
                                                        >
                                                            Details
                                                        </Link>
                                                        <Link
                                                            // to="/students/update"
                                                            to={`/students/edit/${i.branch_student_id}`}
                                                            className="btn btn-sm ml-2  btn-outline-info"
                                                            type="submit"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                            </tbody>
                        </table>
                    </div>
                    <Paginate
                        set_url={storeSlice.actions.set_url}
                        set_paginate={storeSlice.actions.set_paginate}
                        set_page={storeSlice.actions.set_page}
                        all={all}
                        data={state.all as any}
                        selected_paginate={state.paginate}
                    ></Paginate>
                </div>
            </div>
        </div>
    );
};

export default Details;
