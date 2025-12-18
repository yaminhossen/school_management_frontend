import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../store';
import { all } from '.././config/store/async_actions/all';
import setup from '.././config/setup';
import { initialState } from '.././config/store/inital_state';
import Paginate from '../../../components/Paginate';
import Filter from '.././components/canvas/Filter';
import QuickView from '.././components/canvas/QuickView';
import storeSlice from '.././config/store';
import TableHeading from '.././components/all_data_page/TableHeading';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import HeadSearch from '../components/all_data_page/HeadSearch';
import HeadRightButtons from '../components/all_data_page/HeadRightButtons';

export interface Props {}

const Pending: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    async function initdependancy() {
        await new Promise((resolve) => setTimeout(resolve, 300));
        await dispatch(all({}) as any);
    }

    useEffect(() => {
        initdependancy();
    }, []);
    return (
        <div className="page_content">
            <div className="explore_window pending_explore_window fixed_size">
                <div className="action_bar">
                    <div className="title no_move" id="users_drag">
                        <h6>All Pending Task</h6>
                    </div>
                    <div className="navigation">
                        <ul>
                            <li className="search_li">
                                <HeadSearch></HeadSearch>
                            </li>
                        </ul>
                    </div>
                    <div className="control">
                        <HeadRightButtons></HeadRightButtons>
                    </div>
                </div>

                <div className="content_body">
                    <div className="data_list">
                        <div className="table_responsive custom_scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Serial</th>
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
                                                index,
                                            ) => {
                                                return (
                                                    <tr
                                                        key={i.id}
                                                        className={`table_rows table_row_${i.id}`}
                                                    >
                                                        <td>
                                                            <span
                                                                className="quick_view_trigger"
                                                                // onClick={() =>
                                                                //     quick_view(i)
                                                                // }
                                                            >
                                                                {index + 1}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {i.tasks?.title}
                                                        </td>
                                                        <td>
                                                            {i.tasks
                                                                    ?.description?.length >
                                                            25
                                                                ? i.tasks
                                                                    ?.description?.slice(
                                                                      0,
                                                                    35,
                                                                ) + ' ...'
                                                                : i.tasks
                                                                    ?.description}
                                                        </td>
                                                        <td>
                                                            {moment(
                                                                i.date,
                                                            ).format(
                                                                'YYYY-MM-DD',
                                                            )}
                                                        </td>
                                                        <td>
                                                            {i.is_seen ===
                                                            'no' ? (
                                                                <Link
                                                                    // to="/students/single/student/"
                                                                    to={`/${setup.route_prefix}/details/${i.id}?tuser=${i.id}`}
                                                                    className="btn btn-sm unseen_bg  btn-outline-info ml-2"
                                                                    type="submit"
                                                                >
                                                                    Show
                                                                </Link>
                                                            ) : (
                                                                <Link
                                                                    // to="/students/single/student/"
                                                                    to={`/${setup.route_prefix}/details/${i.id}?tuser=${i.id}`}
                                                                    className="btn btn-sm  btn-outline-info ml-2"
                                                                    type="submit"
                                                                >
                                                                    Show
                                                                </Link>
                                                            )}
                                                            <Link
                                                                                                                            // to="/students/single/student/"
                                                                                                                            to={`/${setup.route_prefix}/create/${i.id}`}
                                                                                                                            className="btn btn-sm  btn-outline-info ml-2"
                                                                                                                            type="submit"
                                                                                                                        >
                                                                                                                            Send
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
            </div>

            <Filter></Filter>
            <QuickView></QuickView>
        </div>
    );
};

export default Pending;
