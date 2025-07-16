import React, { useEffect } from 'react';
import Header from '.././components/management_data_page/Header';
import Footer from '.././components/management_data_page/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import setup from '.././config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { details } from '.././config/store/async_actions/details';
import { initialState } from '.././config/store/inital_state';
import { useParams } from 'react-router-dom';
import storeSlice from '.././config/store';
import moment from 'moment/moment';
import HeaderComplete from '../components/management_data_page/HeaderComplete';
import { unseen_tasks } from '../config/store/async_actions/unseen_tasks';
export interface Props {}

const DetailsComplete: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    async function initdependancy() {
        dispatch(storeSlice.actions.set_item({}));
        await dispatch(details({ id: params.id }) as any);
        // Wait for 0.5 second (500ms)
        await new Promise((resolve) => setTimeout(resolve, 300));
        await dispatch(unseen_tasks({}) as any);
    }

    useEffect(() => {
        initdependancy();
    }, []);

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <HeaderComplete
                        page_title={setup.details_page_title}
                    ></HeaderComplete>

                    {Object.keys(state.item2).length && (
                        <div className="content_body">
                            <table className="table quick_modal_table table-hover">
                                <tbody>
                                    <tr>
                                        <td>Title</td>
                                        <td>:</td>
                                        <td>{state.item2?.tasks.title}</td>
                                    </tr>
                                    <tr>
                                        <td>Date</td>
                                        <td>:</td>
                                        <td>
                                            {moment(
                                                state.item2?.tasks.date,
                                            ).format('YYYY-MM-DD')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Creator</td>
                                        <td>:</td>
                                        <td>
                                            {state.item2.admin?.name ||
                                                'Not found'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Self Description</td>
                                        <td>:</td>
                                        <td className="task_detailsd details_descrtiption2">
                                            {state.item2?.description}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Attachment</td>
                                        <td>:</td>
                                        <td className="task_detailsd details_descrtiption2">
                                            {state.item2?.attachment ? (
                                                <a
                                                    href={state.item2?.attachment || undefined}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View Attachment
                                                </a>
                                            ) : (
                                                'No Attachment'
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>:</td>
                                        <td className="task_detailsd details_descrtiption2">
                                            {state.item2?.tasks.description}
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

export default DetailsComplete;
