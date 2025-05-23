import React, { useEffect } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { useParams } from 'react-router-dom';
import storeSlice from './config/store';
export interface Props {}

const Details: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, []);

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.details_page_title}></Header>

                    {Object.keys(state.item).length && (
                        <div className="content_body">
                            <table className="table quick_modal_table table-hover">
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>:</td>
                                        <td>{state.item.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Present Address</td>
                                        <td>:</td>
                                        <td>{state.item.present_address}</td>
                                    </tr>
                                    <tr>
                                        <td>Permanent Address</td>
                                        <td>:</td>
                                        <td>{state.item.permanent_address}</td>
                                    </tr>
                                    <tr>
                                        <td>Number</td>
                                        <td>:</td>
                                        <td>{state.item.driver_number}</td>
                                    </tr>
                                    <tr>
                                        <td>Assistant Number 1.</td>
                                        <td>:</td>
                                        <td>{state.item.assistant_number_1}</td>
                                    </tr>
                                    <tr>
                                        <td>Assistant Number 2.</td>
                                        <td>:</td>
                                        <td>{state.item.assistant_number_2}</td>
                                    </tr>
                                    <tr>
                                        <td>License Number</td>
                                        <td>:</td>
                                        <td>{state.item.licence_number}</td>
                                    </tr>
                                    <tr>
                                        <td>Driver License</td>
                                        <td>:</td>
                                        <td>
                                            {state.item.driver_licence ? (
                                                <a
                                                    href={
                                                        state.item
                                                            .driver_licence
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src={
                                                            state.item
                                                                .driver_licence
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
                                </tbody>
                            </table>
                        </div>
                    )}

                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Details;
