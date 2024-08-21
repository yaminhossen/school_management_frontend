import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { all } from './config/store/async_actions/all.ts';
import setup from './config/setup.ts';
import { initialState } from './config/store/inital_state';
import Header from './components/all_data_page/Header';
import TableFooter from './components/all_data_page/TableFooter';
import Paginate from '../../components/Paginate';
import Filter from './components/canvas/Filter';
import QuickView from './components/canvas/QuickView';
import storeSlice from './config/store';
import { anyObject } from '../../../common_types/object';
import TableRowAction from './components/all_data_page/TableRowAction';
import SelectItem from './components/all_data_page/SelectItem';
import SelectAll from './components/all_data_page/SelectIAll';
import TableHeading from './components/all_data_page/TableHeading';
import { all_class } from './config/store/async_actions/all_class.ts';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(
    //         storeSlice.actions.set_select_fields(
    //             'id, name, email, image, status',
    //         ),
    //     );
    //     dispatch(all({}));
    // }, []);

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(all_class({}) as any);
    }, []);
    if (state.item) {
        console.log('state', state.item.length);
    }
    console.log('storeSlice', storeSlice);

    const datas: data[] = [
        {
            id: 1,
            class: 'Six',
            total_student: '280',
        },
        {
            id: 2,
            class: 'Seven',
            total_student: '300',
        },
        {
            id: 3,
            class: 'Eight',
            total_student: '320',
        },
        {
            id: 4,
            class: 'Nine',
            total_student: '260',
        },
        {
            id: 5,
            class: 'Ten',
            total_student: '250',
        },
    ];

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
                                    <th>Class</th>
                                    <th>Total Student</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {state.item?.length &&
                                    state.item?.map(
                                        (i: { [key: string]: any }) => {
                                            return (
                                                <tr>
                                                    <td></td>
                                                    <td>{i.id}</td>
                                                    <td>{i?.name}</td>
                                                    <td>{i?.count}</td>
                                                    <td>
                                                        <Link
                                                            to={`/students/details/${i.id}`}
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
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
