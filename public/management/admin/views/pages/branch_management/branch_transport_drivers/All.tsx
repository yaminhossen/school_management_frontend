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
                'id, name, driver_number, assistant_number_1, assistant_number_2, present_address, driver_licence, licence_number, permanent_address, status',
            ),
        );
        dispatch(all({}) as any);
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
                                        <th>
                                            <SelectAll />
                                        </th>
                                        <TableHeading
                                            label={`ID`}
                                            col_name={`id`}
                                            sort={true}
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
                                            label={`Present Address`}
                                            col_name={`present_address`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Permanent Address`}
                                            col_name={`permanent_address`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Driver Number`}
                                            col_name={`driver_number`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Assistant Number 1`}
                                            col_name={`assistant_number_1`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Assistant Number 2`}
                                            col_name={`assistant_number_2`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`licence Number`}
                                            col_name={`licence_number`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Driver licence`}
                                            col_name={`driver_licence`}
                                            sort={false}
                                        />
                                    </tr>
                                </thead>
                                {(state.all as any)?.data?.length ? (
                                    <tbody id="all_list">
                                        {/* {(state.all as any)?.data?.map( */}
                                        {(state.all as any)?.data?.map(
                                            (i: { [key: string]: any }, index) => {
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
                                                            <SelectItem
                                                                item={i}
                                                            />
                                                        </td>
                                                        <td>
                                                            <span
                                                                className="quick_view_trigger"
                                                                onClick={() =>
                                                                    quick_view(
                                                                        i,
                                                                    )
                                                                }
                                                            >
                                                                {i.id}
                                                            </span>
                                                        </td>
                                                        <td>{index + 1}</td>
                                                        <td>{i.name}</td>
                                                        <td>
                                                            {i.present_address}
                                                        </td>
                                                        <td>
                                                            {
                                                                i.permanent_address
                                                            }
                                                        </td>
                                                        <td>
                                                            {i.driver_number}
                                                        </td>
                                                        <td>
                                                            {
                                                                i.assistant_number_1
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                i.assistant_number_2
                                                            }
                                                        </td>
                                                        <td>
                                                            {i.licence_number}
                                                        </td>
                                                        <td>
                                                            {i.driver_licence ? (
                                                                <a
                                                                    href={
                                                                        i.driver_licence
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <img
                                                                        src={
                                                                            i.driver_licence
                                                                        }
                                                                        alt="profile image"
                                                                        style={{
                                                                            height: 50,
                                                                        }}
                                                                    />
                                                                </a>
                                                            ) : (
                                                                <img
                                                                    // src={
                                                                    //     '/assets/dashboard/images/avatar.png'
                                                                    // }
                                                                    alt="driver license"
                                                                    style={{
                                                                        height: 50,
                                                                    }}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            },
                                        )}
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan={11}>
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
