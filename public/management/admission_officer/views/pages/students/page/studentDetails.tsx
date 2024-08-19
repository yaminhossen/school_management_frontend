import React, { useEffect } from 'react';
// import Header from './components/management_data_page/Header';
// import Footer from './components/management_data_page/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import setup from '../config/setup.ts';
import { RootState, useAppDispatch } from '../../../../store';
import { details } from '../config/store/async_actions/details';
import { class_details } from '../config/store/async_actions/class_details.ts';
import { initialState } from '../config/store/inital_state';
import { Link, useParams } from 'react-router-dom';
import storeSlice from '../config/store';
import moment from 'moment/moment';
export interface Props {}

const Details: React.FC<Props> = (props: Props) => {
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
        dispatch(details({ id: params.id }) as any);
        // dispatch(class_details({ id: params.id }) as any);
    }, []);

    if (state.item) {
        console.log('state item result', state.item);
    }

    const datas: data[] = [
        {
            id: 1,
            class: 'Six',
            student_id: '2024SIX101',
            name: 'Shahin',
            roll: '001',
        },
    ];

    return (
        <div className="admin_dashboard">
            <h3 className="table_heading">Basic information</h3>
            <div className="content_body ">
                <Link
                    to="/add-new"
                    className="btn btn-sm btn-outline-info mb-2"
                    type="submit"
                >
                    Add New
                </Link>
                {Object.keys(state.item) && (
                    <table className="table text-nowrap student_table">
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.name}
                                </td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.gender}
                                </td>
                            </tr>
                            <tr>
                                <td>Father Name:</td>
                                <td className="font-medium text-dark-medium">
                                    Abdur rahman
                                </td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.email}
                                </td>
                            </tr>
                            <tr>
                                <td>Phone number:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.phone_number}
                                </td>
                            </tr>
                            <tr>
                                <td>Stutas:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.status}
                                </td>
                            </tr>
                            <tr>
                                <td>Branch:</td>
                                <td className="font-medium text-dark-medium">
                                    Uttora
                                </td>
                            </tr>
                            <tr>
                                <td>Admission no:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.addmission_no}
                                </td>
                            </tr>
                            <tr>
                                <td>Roll no:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.role_no}
                                </td>
                            </tr>
                            <tr>
                                <td>Addmission date:</td>
                                <td className="font-medium text-dark-medium">
                                    {moment(
                                        state.item?.student_info
                                            ?.admission_date,
                                    ).format('YYYY-MM-DD')}
                                </td>
                            </tr>
                            <tr>
                                <td>Class:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.s_class}
                                </td>
                            </tr>
                            <tr>
                                <td>Shift:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.shift}
                                </td>
                            </tr>
                            <tr>
                                <td>Student Category:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.student_category}
                                </td>
                            </tr>
                            <tr>
                                <td>Section:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.section}
                                </td>
                            </tr>
                            <tr>
                                <td>Present Address:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.present_address}
                                </td>
                            </tr>
                            <tr>
                                <td>Permanent Address:</td>
                                <td className="font-medium text-dark-medium">
                                    {
                                        state.item?.student_info
                                            ?.permanent_address
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Date of birth:</td>
                                <td className="font-medium text-dark-medium">
                                    {moment(
                                        state.item?.student_info?.date_of_birth,
                                    ).format('YYYY-MM-DD')}
                                </td>
                            </tr>
                            <tr>
                                <td>Religion:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.religion}
                                </td>
                            </tr>
                            <tr>
                                <td>Nationality:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.nationality}
                                </td>
                            </tr>
                            <tr>
                                <td>Division:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.division}
                                </td>
                            </tr>
                            <tr>
                                <td>Class:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.s_class}
                                </td>
                            </tr>
                            <tr>
                                <td>Section:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.section}
                                </td>
                            </tr>
                            <tr>
                                <td>ID No:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.student_id}
                                </td>
                            </tr>
                            <tr>
                                <td>Address:</td>
                                <td className="font-medium text-dark-medium">
                                    {state.item?.student_info?.present_address}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Details;
