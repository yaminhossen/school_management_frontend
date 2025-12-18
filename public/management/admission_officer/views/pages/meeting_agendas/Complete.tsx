import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store';
import { all } from './config/store/async_actions/all';
import setup from './config/setup';
import { initialState } from './config/store/inital_state';
import TableFooter from './components/all_data_page/TableFooter';
import Paginate from '../../components/Paginate';
import QuickView from './components/canvas/QuickView';
import storeSlice from './config/store';
import { anyObject } from '../../../common_types/object';
import SelectItem from './components/all_data_page/SelectItem';
import SelectAll from './components/all_data_page/SelectIAll';
import TableHeading from './components/all_data_page/TableHeading';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { complete } from './config/store/async_actions/complete';
import HeaderComplete from './components/all_data_page/HeaderComplete';
import FilterComplete from './components/canvas/FilterComplete';

export interface Props {}

const Complete: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            storeSlice.actions.set_select_fields(
                'id, title, description, date, time, meeting_link, meeting_type, status',
            ),
        );
        dispatch(complete({}) as any);
    }, []);

    return (
        <div className="page_content">
            <div className="explore_window fixed_size">
                <HeaderComplete></HeaderComplete>

                <div className="content_body">
                    <div className="data_list">
                        <div className="table_responsive custom_scroll">
                            <table>
                                <thead>
                                    <tr>
                                        {/* <th /> */}
                                        <th>
                                            <SelectAll />
                                        </th>
                                        <TableHeading
                                            label={`ID`}
                                            col_name={`id`}
                                            sort={true}
                                        />
                                        {/* <th>Logo</th> */}
                                        <TableHeading
                                            label={`Title`}
                                            col_name={`title`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Description`}
                                            col_name={`description`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Date`}
                                            col_name={`date`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Time`}
                                            col_name={`time`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Meeting Type`}
                                            col_name={`meeting_type`}
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
                                        {/* {(state.all as any)?.data?.map( */}
                                        {(state.all as any)?.data?.map(
                                            (i: { [key: string]: any }) => {
                                                return (
                                                    <tr
                                                        key={i.id}
                                                        className={`table_rows table_row_${i.id}`}
                                                    >
                                                        <td>
                                                            <SelectItem
                                                                item={i}
                                                            />
                                                        </td>
                                                        <td>
                                                            <span>{i.id}</span>
                                                        </td>
                                                        <td>{i.title}</td>
                                                        <td>{i.description}</td>
                                                        <td>
                                                            {moment(
                                                                i.date,
                                                            ).format(
                                                                'YYYY-MM-DD',
                                                            )}
                                                        </td>
                                                        <td>
                                                            {moment(
                                                                i.time,
                                                                'HH:mm:ss',
                                                            ).format('hh:mm A')}
                                                        </td>
                                                        <td>
                                                            {i.meeting_type}
                                                        </td>
                                                        <td>
                                                            <Link
                                                                // to="/students/single/student/"
                                                                to={`/${setup.route_prefix}/details/${i.id}`}
                                                                className="btn btn-sm  btn-outline-info ml-2"
                                                                type="submit"
                                                            >
                                                                Show
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
                                            <td colSpan={10}>
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

            <FilterComplete></FilterComplete>
            <QuickView></QuickView>
        </div>
    );
};

export default Complete;
