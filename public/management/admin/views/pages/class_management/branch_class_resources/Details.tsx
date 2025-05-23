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
                                        <td>{state.item.title}</td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>:</td>
                                        <td>{state.item.description}</td>
                                    </tr>
                                    <tr>
                                        <td>Attachment</td>
                                        <td>:</td>
                                        {/* <td>
                                            <a
                                                href={
                                                    state.item.attachment ||
                                                    undefined
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src={
                                                        state.item.attachment ||
                                                        '/assets/dashboard/images/avatar.png'
                                                    }
                                                    alt=""
                                                    width={40}
                                                />
                                            </a>
                                        </td> */}
                                        <td>
                                            {state.item.attachment?.endsWith(
                                                '.pdf',
                                            ) ? (
                                                <a
                                                    href={state.item.attachment}
                                                    download // this triggers download
                                                >
                                                    <img
                                                        src="/assets/icons/pdf-icon.png" // Replace with your actual PDF icon
                                                        alt="PDF Download"
                                                        width={40}
                                                    />
                                                </a>
                                            ) : (
                                                <a
                                                    href={
                                                        state.item.attachment ||
                                                        undefined
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src={
                                                            state.item
                                                                .attachment ||
                                                            '/assets/dashboard/images/avatar.png'
                                                        }
                                                        alt="Attachment"
                                                        width={40}
                                                    />
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Class</td>
                                        <td>:</td>
                                        <td>{state.item.class?.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Subject</td>
                                        <td>:</td>
                                        <td>{state.item.subject?.name}</td>
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
