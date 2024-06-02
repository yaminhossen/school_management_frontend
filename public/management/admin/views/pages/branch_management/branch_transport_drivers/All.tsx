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
                'id, name, email, phone_number, status',
            ),
        );
        dispatch(all({}) as any);
    }, []);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }

    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            branch_id: 1,
            name: 'Putin',
            phone_number_1: '01897675645',
            phone_number_2: '01897675646',
            phone_number_3: '01897675647',
            present_address: 'mirpur',
            driver_licence: 'licence.pdf',
            permanent_address: 'Bhola',
        },
        {
            id: 2,
            branch_id: 2,
            name: 'Kim jon',
            phone_number_1: '01897675635',
            phone_number_2: '01897675636',
            phone_number_3: '01897675637',
            present_address: 'Uttora',
            driver_licence: 'licence.pdf',
            permanent_address: 'Bhola',
        },
    ];

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
                                            label={`Name`}
                                            col_name={`name`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Present Address`}
                                            col_name={`present_address`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Permanent Address`}
                                            col_name={`permanent_address`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Phone Number 1`}
                                            col_name={`phone_number_1`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Phone Number 2`}
                                            col_name={`phone_number_2`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Phone Number 3`}
                                            col_name={`phone_number_3`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Driver licence`}
                                            col_name={`driver_licence`}
                                            sort={true}
                                        />
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    {/* {(state.all as any)?.data?.map( */}
                                    {datas?.map((i: { [key: string]: any }) => {
                                        return (
                                            <tr
                                                key={i.id}
                                                className={`table_rows table_row_${i.id}`}
                                            >
                                                <td>
                                                    <TableRowAction item={i} />
                                                </td>
                                                <td>
                                                    <SelectItem item={i} />
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
                                                <td>{i.name}</td>
                                                <td>{i.present_address}</td>
                                                <td>{i.permanent_address}</td>
                                                <td>{i.phone_number_1}</td>
                                                <td>{i.phone_number_2}</td>
                                                <td>{i.phone_number_3}</td>
                                                <td>{i.driver_licence}</td>
                                            </tr>
                                        );
                                    })}
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
                <TableFooter></TableFooter>
            </div>

            <Filter></Filter>
            <QuickView></QuickView>
        </div>
    );
};

export default All;
