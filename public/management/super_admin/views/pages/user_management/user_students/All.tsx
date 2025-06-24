import React, { useEffect, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { branches } from './config/store/async_actions/branches';

export interface Props {}

const All: React.FC<Props> = (props: Props) => {
    const [branchId, setBranchId] = useState(1);
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(storeSlice.actions.set_select_fields('id'));
        dispatch(all_class({ id: branchId }) as any);
        dispatch(branches({}) as any);
    }, []);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }
    console.log('state branch item', state.bitem);
    return (
        <div className="page_content">
            <form>
                <div className="account_results">
                    <div>
                        <div className="form-group form-vertical">
                            <label>Branches</label>
                            <div className="form_elements">
                                <select
                                    name="branch_id"
                                    id=""
                                    onChange={(e) => {
                                        setBranchId(Number(e.target.value));
                                        dispatch(
                                            storeSlice.actions.set_brid(
                                                Number(e.target.value),
                                            ),
                                        );
                                        dispatch(
                                            all_class({
                                                id: e.target.value,
                                            }) as any,
                                        );
                                    }}
                                >
                                    <option value="">Select Branch</option>
                                    {state?.bitem?.length &&
                                        state.bitem?.map(
                                            (i: { [key: string]: any }) => {
                                                return (
                                                    <option value={i.id}>
                                                        {i.name}
                                                    </option>
                                                );
                                            },
                                        )}
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* <button
                        className="btn account_filter_btn btn-sm btn-outline-info"
                        type="submit"
                    >
                        Submit
                    </button> */}
                </div>
            </form>
            <div className="explore_window fixed_size">
                <div className="action_bar">
                    <div className="navigation">
                        <ul>
                            <li className="search_li"></li>
                        </ul>
                    </div>
                    <div className="title no_move" id="users_drag">
                        <h2>All Students</h2>
                    </div>
                    <div className="control"></div>
                </div>

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
                                            label={`Class`}
                                            col_name={`class`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Total Student`}
                                            col_name={`total student`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Action`}
                                            col_name={`action`}
                                            sort={false}
                                        />
                                    </tr>
                                </thead>
                                {(state.item as any)?.data?.length ? (
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
                                                        <td>{i.name}</td>
                                                        <td>{i.count}</td>
                                                        <td>
                                                            <Link
                                                                to={`/user-students/class-details/${i.id}`}
                                                                className="btn btn-sm  btn-outline-info"
                                                                type="submit"
                                                            >
                                                                Details
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
                                            <td colSpan={5}>
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

                        {/* <Paginate
                            set_url={storeSlice.actions.set_url}
                            set_paginate={storeSlice.actions.set_paginate}
                            set_page={storeSlice.actions.set_page}
                            all={all}
                            data={state.all as any}
                            selected_paginate={state.paginate}
                        ></Paginate> */}
                    </div>
                </div>
                {/* <TableFooter></TableFooter> */}
            </div>

            {/* <Filter></Filter>
            <QuickView></QuickView> */}
        </div>
    );
};

export default All;
