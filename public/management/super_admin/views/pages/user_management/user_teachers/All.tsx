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
import axios from 'axios';
import { branch_teacher } from './config/store/async_actions/branch_teacher';
import { branches } from './config/store/async_actions/branches';
import Paginate2 from '../../../components/Paginate2';

export interface Props {}

const All: React.FC<Props> = (props: Props) => {
    const [branchId, setBranchId] = useState(1);
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(
                storeSlice.actions.set_select_fields(
                    'id, name, email, phone_number, role_2, status',
                ),
            );

            await new Promise((resolve) => setTimeout(resolve, 300));
            dispatch(branch_teacher({ id: branchId }) as any);
            dispatch(branches({}) as any);
        };
        fetchData();
    }, []);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }

    const handleSubmit = async (e, i) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            let confirm = await (window as anyObject).s_confirm(
                'Are you sure?',
            );
            if (confirm) {
                const response = await axios.post(
                    `/api/v1/admin-users/make-admin-teacher/${i.id}`,
                );
                dispatch(storeSlice.actions.set_only_latest_data(true));
                // dispatch(all({}) as any);

                dispatch(branch_teacher({ id: branchId }) as any);
                dispatch(storeSlice.actions.set_only_latest_data(false));
                (window as any).toaster('Admin make successfully');
            }

            console.log('this enent and i', e.target, i.id);

            // setData(response.data.data.data);
        } catch (error) {
            setError(error);
        }
    };

    const handleSubmit2 = async (e, i) => {
        e.preventDefault(); // Prevent the default form submission behavior

        (window as any).toaster('This user allready admin');
    };

    console.log('state branch item', state.item);

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
                                            storeSlice.actions.set_id(
                                                Number(e.target.value),
                                            ),
                                        );
                                        dispatch(
                                            storeSlice.actions.set_page(1),
                                        );
                                        dispatch(
                                            branch_teacher({
                                                id: e.target.value,
                                            }) as any,
                                        );
                                    }}
                                >
                                    <option value="">Select Branch</option>
                                    {state?.item?.length &&
                                        state.item?.map(
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
                <Header></Header>

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
                                        <th>Image</th>
                                        <TableHeading
                                            label={`Name`}
                                            col_name={`name`}
                                            sort={false}
                                        />
                                        <th>Branch</th>
                                        <th>Is Admin</th>
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
                                            (i: { [key: string]: any }) => {
                                                return (
                                                    <tr
                                                        key={i.id}
                                                        className={`table_rows table_row_${i.id}`}
                                                    >
                                                        {/* <td>
                                                            <TableRowAction
                                                                item={i}
                                                            />
                                                        </td> */}
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
                                                        {/* <td>{i.branch}</td> */}
                                                        <td>{i.name}</td>
                                                        <td>
                                                            {
                                                                i.teachers
                                                                    ?.branch
                                                                    ?.name
                                                            }
                                                        </td>
                                                        <td>
                                                            {i.role_2
                                                                ? i.role_2
                                                                : 'No'}
                                                        </td>
                                                        {/* <td>
                                                        {i.role
                                                            ? i.role
                                                            : 'Te'}
                                                    </td> */}
                                                        <td>
                                                            {i.phone_number}
                                                        </td>
                                                        <td>{i.email}</td>
                                                        {/* <td>{i.address}</td> */}
                                                        <td>
                                                            {i.role_2 ===
                                                            'admin' ? (
                                                                <button
                                                                 style={{color: 'white'}}
                                                                        className="btn btn_submit"
                                                                    onClick={(
                                                                        e,
                                                                    ) =>
                                                                            handleSubmit2(
                                                                            e,
                                                                                i,
                                                                            )
                                                                    }
                                                                    >
                                                                    Make Admin
                                                                </button>
                                                                ) : (
                                                                    <button
                                                                     style={{color: 'white'}}
                                                                        className="btn btn_submit"
                                                                    onClick={(
                                                                        e,
                                                                    ) =>
                                                                            handleSubmit(
                                                                            e,
                                                                                i,
                                                                            )
                                                                    }
                                                                    >
                                                                    Make Admin
                                                                </button>
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

                        {/* <Paginate
                            set_url={storeSlice.actions.set_url}
                            set_paginate={storeSlice.actions.set_paginate}
                            set_page={storeSlice.actions.set_page}
                            all={all}
                            data={state.all as any}
                            selected_paginate={state.paginate}
                        ></Paginate> */}
                        <Paginate2
                            set_url={storeSlice.actions.set_url}
                            set_id={branchId}
                            set_paginate={storeSlice.actions.set_paginate}
                            set_page={storeSlice.actions.set_page}
                            // class_details1={class_details1({})}
                            all={branch_teacher}
                            data={state.all as any}
                            selected_paginate={state.paginate}
                        ></Paginate2>
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
