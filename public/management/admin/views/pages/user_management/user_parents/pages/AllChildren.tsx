import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { initialState } from '../config/store/inital_state';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../../store';
import setup from '../config/setup';
import { children_details } from '../config/store/async_actions/children_details';
import storeSlice from '../config/store';
import { details } from '../config/store/async_actions/details';
export interface Props {}

const Children: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(storeSlice.actions.set_children({}));
        dispatch(children_details({ id: params.id }) as any);
        // dispatch(details({ id: params.id }) as any);
    }, []);
    console.log('childfdlf', state);

    return (
        <div className="admin_dashboard">
            <h3 className="table_heading mt-4">Childrens</h3>
            <div className="content_body">
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Whatsapp </th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {state.children?.data?.map(
                                    (i: { [key: string]: any }, index) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {i.children_basic?.name}
                                                </td>
                                                <td>
                                                    <a
                                                        href={
                                                            i.children_basic
                                                                ?.image
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img
                                                            src={
                                                                i.children_basic
                                                                    ?.image
                                                            }
                                                            alt="Photo"
                                                            width={40}
                                                        />
                                                    </a>
                                                </td>
                                                <td>
                                                    {i.children_basic.email}
                                                </td>
                                                <td>
                                                    {
                                                        i.children_basic
                                                            .phone_number
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        i.children_basic
                                                            .whatsapp_number
                                                    }
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

export default Children;
