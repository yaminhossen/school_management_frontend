import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../store';
import { all } from './config/store/async_actions/all';
import setup from './config/setup';
import { initialState } from './config/store/inital_state';
import Header from './components/all_data_page/Header';
import TableFooter from './components/all_data_page/TableFooter';
import Paginate from '../../../components/Paginate';
import Filter from './components/canvas/Filter';
import QuickView from './components/canvas/QuickView';
import storeSlice from './config/store';
import { anyObject } from '../../../../common_types/object';
import TableRowAction from './components/all_data_page/TableRowAction';
import SelectItem from './components/all_data_page/SelectItem';
import SelectAll from './components/all_data_page/SelectIAll';
import TableHeading from './components/all_data_page/TableHeading';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

export interface Props {}

const Pending: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            storeSlice.actions.set_select_fields(
                'id, branch_teacher_id, branch_staff_id, start_date, end_date, branch_student_id, leave_type_id, reason, status',
            ),
        );
        dispatch(storeSlice.actions.set_page(1) as any);
        dispatch(all({}) as any);
    }, []);

    return (
        <div className="page_content">
            <div className="explore_window fixed_size">
                <Header></Header>

                <div className="content_body">
                    <div className="data_list">
                        <div className="table_responsive custom_scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th />
                                        <th>
                                            <SelectAll />
                                        </th>
                                        <TableHeading
                                            label={`ID`}
                                            col_name={`id`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Staff/Student`}
                                            col_name={`staff/student`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Name`}
                                            col_name={`name`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Leave Type`}
                                            col_name={`leave type`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Start Date`}
                                            col_name={`start date`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`End Date`}
                                            col_name={`end date`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Action`}
                                            col_name={`action`}
                                            sort={false}
                                        />
                                    </tr>
                                </thead>
                                {(state.all as any)?.data?.length ? (
                                <tbody id="all_list">
                                    {(state.all as any)?.data?.map(
                                        (i: { [key: string]: any }) => {
                                            return (
                                                <tr
                                                    key={i.id}
                                                    className={`table_rows table_row_${i.id}`}
                                                >
                                                    <td>
                                                        <TableRowAction
                                                            item={i}
                                                        />
                                                    </td>
                                                    <td>
                                                        <SelectItem item={i} />
                                                    </td>
                                                    <td>
                                                        <span
                                                        >
                                                            {i.id}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {i.branch_teacher_id
                                                            ? 'Teacher'
                                                            : i.branch_staff_id
                                                                ? 'Staff'
                                                                : i.branch_student_id
                                                                    ? 'Student'
                                                                    : 0}
                                                    </td>
                                                    <td>
                                                        {i.teacher
                                                            ? i.teacher?.name
                                                            : i.staff
                                                                ? i.staff?.name
                                                                : i.student
                                                                    ? i.student?.name
                                                                    : 0}
                                                    </td>
                                                    <td>
                                                        {i.leave_type?.title}
                                                    </td>
                                                    <td>
                                                        {moment(i.start_date).format(
                                                            'YYYY-MM-DD')}
                                                    </td>
                                                    <td>
                                                        {moment(i.end_date).format(
                                                            'YYYY-MM-DD')}
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/leave-applications/edit/${i.id}`}
                                                            className="btn btn-sm  btn-outline-info"
                                                            type="submit"
                                                        >
                                                            Take Action
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan={9}>
                                                <div
                                                    style={{
                                                        fontSize: '24px',
                                                    }}
                                                    className="not_found f-size-4 m-4"
                                                >
                                                    No data found
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
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
                <TableFooter></TableFooter>
            </div>

            <Filter></Filter>
            <QuickView></QuickView>
        </div>
    );
};

export default Pending;
