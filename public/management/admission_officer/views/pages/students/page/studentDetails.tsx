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
            <div className="content_body">
                <Link
                    to="/add-new"
                    className="btn btn-sm btn-outline-info mb-2"
                    type="submit"
                >
                    Add New
                </Link>
            </div>
            <table className="table text-nowrap">
                <tbody>
                    <tr>
                        <td>Name:</td>
                        <td className="font-medium text-dark-medium">
                            Masud Rana
                        </td>
                    </tr>
                    <tr>
                        <td>Gender:</td>
                        <td className="font-medium text-dark-medium">Male</td>
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
                            masud1@gmail.com
                        </td>
                    </tr>
                    <tr>
                        <td>Phone number:</td>
                        <td className="font-medium text-dark-medium">
                            01897867563
                        </td>
                    </tr>
                    <tr>
                        <td>Stutas:</td>
                        <td className="font-medium text-dark-medium">Active</td>
                    </tr>
                    <tr>
                        <td>Branch:</td>
                        <td className="font-medium text-dark-medium">Uttora</td>
                    </tr>
                    <tr>
                        <td>Admission no:</td>
                        <td className="font-medium text-dark-medium">
                            A202411303
                        </td>
                    </tr>
                    <tr>
                        <td>Roll no:</td>
                        <td className="font-medium text-dark-medium">323</td>
                    </tr>
                    <tr>
                        <td>Addmission date:</td>
                        <td className="font-medium text-dark-medium">
                            06-09-2024
                        </td>
                    </tr>
                    <tr>
                        <td>Class:</td>
                        <td className="font-medium text-dark-medium">Seven</td>
                    </tr>
                    <tr>
                        <td>Shift:</td>
                        <td className="font-medium text-dark-medium">
                            Boy morning
                        </td>
                    </tr>
                    <tr>
                        <td>Section:</td>
                        <td className="font-medium text-dark-medium">A</td>
                    </tr>
                    <tr>
                        <td>Present Address:</td>
                        <td className="font-medium text-dark-medium">
                            Mirpur, dhaka
                        </td>
                    </tr>
                    <tr>
                        <td>Permanent Address:</td>
                        <td className="font-medium text-dark-medium">
                            Barishal
                        </td>
                    </tr>
                    <tr>
                        <td>Date of birth:</td>
                        <td className="font-medium text-dark-medium">
                            15, Jamuary 2012
                        </td>
                    </tr>
                    <tr>
                        <td>Religion:</td>
                        <td className="font-medium text-dark-medium">Islam</td>
                    </tr>
                    <tr>
                        <td>Nationality:</td>
                        <td className="font-medium text-dark-medium">
                            Bangladeshi
                        </td>
                    </tr>
                    <tr>
                        <td>Division:</td>
                        <td className="font-medium text-dark-medium">
                            Noakhali
                        </td>
                    </tr>
                    <tr>
                        <td>Subject:</td>
                        <td className="font-medium text-dark-medium">
                            English
                        </td>
                    </tr>
                    <tr>
                        <td>Class:</td>
                        <td className="font-medium text-dark-medium">2</td>
                    </tr>
                    <tr>
                        <td>Section:</td>
                        <td className="font-medium text-dark-medium">Pink</td>
                    </tr>
                    <tr>
                        <td>ID No:</td>
                        <td className="font-medium text-dark-medium">10005</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td className="font-medium text-dark-medium">
                            House #10, Road #6, Australia
                        </td>
                    </tr>
                    <tr>
                        <td>Phone:</td>
                        <td className="font-medium text-dark-medium">
                            + 88 98568888418
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Details;
