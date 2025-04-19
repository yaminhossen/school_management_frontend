import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import setup from './config/setup';
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
import { all_class } from './config/store/async_actions/all_class';
import { Link, useParams } from 'react-router-dom';
import { class_details } from './config/store/async_actions/class_details';

export interface Props {}

const ClassDetails: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();
    console.log('id', params.id);

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(class_details({ id: params.id }) as any);
    }, []);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }
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
                                        <TableHeading
                                            label={`ID`}
                                            col_name={`id`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={``}
                                            col_name={``}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Serial`}
                                            col_name={`serial`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Name`}
                                            col_name={`name`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Student Id`}
                                            col_name={`student id`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Roll`}
                                            col_name={`roll`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Class`}
                                            col_name={`class`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Action`}
                                            col_name={`action`}
                                            sort={false}
                                        />
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    {/* {(state.all as any)?.data?.map( */}
                                    {(state.item as any)?.data?.map(
                                        (i: { [key: string]: any }) => {
                                            return (
                                                <tr
                                                    key={i.id}
                                                    className={`table_rows table_row_${i.id}`}
                                                >
                                                    <td> </td>
                                                    <td>
                                                        <span
                                                            className="quick_view_trigger"
                                                            // onClick={() =>
                                                            //     quick_view(i)
                                                            // }
                                                        >
                                                            {i.id}
                                                        </span>
                                                    </td>
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
                                                            to={`/user-students/details/${i.branch_student_id}`}
                                                            className="btn btn-sm  btn-outline-info"
                                                            type="submit"
                                                        >
                                                            Details
                                                        </Link>
                                                        <Link
                                                            // to="/students/single/student/"
                                                            to={`/user-students/student-dues/${i.branch_student_id}`}
                                                            className="btn btn-sm  btn-outline-info ml-2"
                                                            type="submit"
                                                        >
                                                            Dues
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
                            data={state.item as any}
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

export default ClassDetails;
