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
import moment from 'moment/moment';
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
                        <div className="content_body custom_scroll">
                            <table className="table quick_modal_table table-hover">
                                <tbody>
                                    <tr>
                                        <td>Title</td>
                                        <td>:</td>
                                        <td>{state.item.agenda?.title}</td>
                                    </tr>
                                    <tr className="details_descrtiption2">
                                        <td>Description</td>
                                        <td>:</td>
                                        <td className="details_descrtiption2">
                                            {state.item.agenda?.description}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Meeting</td>
                                        <td>:</td>
                                        <td>{state.item.agendas?.title}</td>
                                    </tr>
                                    <tr>
                                        <td>Meeting Type</td>
                                        <td>:</td>
                                        <td>
                                            {state.item.agenda?.meeting_type}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Meeting Link</td>
                                        <td>:</td>
                                        <td>
                                            {state.item.agenda?.meeting_link
                                                ? state.item.agenda
                                                    ?.meeting_link
                                                : 'This is offline meeting'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Date</td>
                                        <td>:</td>
                                        <td>
                                            {moment(
                                                state.item.agenda?.date,
                                            ).format('YYYY-MM-DD')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Time</td>
                                        <td>:</td>
                                        <td>
                                            {moment(
                                                state.item.agenda?.time,
                                                'HH:mm:ss',
                                            ).format('hh:mm A')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Is Complete</td>
                                        <td>:</td>
                                        <td>
                                            {state.item.agendas?.is_complete ===
                                            'completed'
                                                ? 'Complete'
                                                : 'Pending'}
                                        </td>
                                    </tr>
                                    <tr>
                                        {/* <td>Agenda summary</td> */}
                                        {/* <td>:</td>
                                        <td>
                                            {state.item.agendas?.is_complete ===
                                            'completed'
                                                ? 'Complete'
                                                : 'Pending'}
                                        </td> */}
                                    </tr>
                                    {/* <h1 className="my-4">Agenda summary</h1> */}
                                    {state.item.agenda?.meeting_summary ? (
                                        <tr>
                                            <td>Meeting summary</td>
                                            <td>:</td>
                                            <td className="details_descrtiption2">
                                                {
                                                    state.item.agenda
                                                        ?.meeting_summary
                                                }
                                            </td>
                                        </tr>
                                    ) : (
                                        <p className="my-4 text-gray-500">
                                            This meeting not completed.
                                        </p>
                                    )}
                                </tbody>
                            </table>
                            {/* <h1 className="my-4">Meeting Agendas Part</h1>
                            {state.item.agenda?.meeting_summary ? (
                                <tr>
                                    <td>Meeting summary</td>
                                    <td>:</td>
                                    <td className="details_descrtiption2">
                                        {state.item.agenda?.meeting_summary}
                                    </td>
                                </tr>
                            ) : (
                                <p className="my-4 text-gray-500">
                                    No agendas found till now.
                                </p>
                            )} */}
                        </div>
                    )}

                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Details;
