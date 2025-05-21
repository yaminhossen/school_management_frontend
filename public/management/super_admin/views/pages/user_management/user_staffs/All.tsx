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

export interface Props {}

const All: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            storeSlice.actions.set_select_fields(
                'id, name, email, image, phone_number, role, status',
            ),
        );
        dispatch(all({}) as any);
    }, []);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }
    console.log('state date', (state.all as any)?.data?.length);

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
                                        <th>No.</th>
                                        <TableHeading
                                            label={`ID`}
                                            col_name={`id`}
                                            sort={true}
                                        />
                                        <th>Image</th>
                                        <TableHeading
                                            label={`Name`}
                                            col_name={`name`}
                                            sort={false}
                                        />
                                        <th>Designation</th>
                                        <th>Branch</th>
                                        {/* <TableHeading
                                            label={`Designation`}
                                            col_name={`designation`}
                                            sort={false}
                                        /> */}
                                        <TableHeading
                                            label={`Phone number`}
                                            col_name={`phone_number`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Email`}
                                            col_name={`email`}
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
                                            (
                                                i: { [key: string]: any },
                                                index: number,
                                            ) => (
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
                                                        <span>{index + 1}</span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className="quick_view_trigger"
                                                            onClick={() =>
                                                                quick_view(i)
                                                            }
                                                        >
                                                            {i.id}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={
                                                                i.image
                                                                    ? i.image
                                                                    : '/assets/dashboard/images/avatar.png'
                                                            }
                                                            alt=""
                                                            style={{
                                                                height: 30,
                                                            }}
                                                        />
                                                    </td>
                                                    <td>{i.name}</td>
                                                    <td>
                                                        {i.role
                                                            ? i.role
                                                            : 'staff'}
                                                    </td>
                                                    <td>
                                                        {i.staffs?.branch?.name}
                                                    </td>
                                                    <td>{i.phone_number}</td>
                                                    <td>{i.email}</td>
                                                    <td> Make Admin</td>
                                                </tr>
                                            ),
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

export default All;
