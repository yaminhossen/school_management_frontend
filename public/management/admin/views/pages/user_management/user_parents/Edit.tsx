import React, { useEffect } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { useParams } from 'react-router-dom';
import storeSlice from './config/store';
import { update } from './config/store/async_actions/update';
import InputImage from './components/management_data_page/InputImage';
export interface Props {}

const Edit: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, []);
    function get_value(key) {
        try {
            if (state.item[key]) return state.item[key];
            if (state.item?.parent_infos[key])
                return state.item?.parent_infos[key];
        } catch (error) {
            return '';
        }
        return '';
    }

    async function handle_submit(e) {
        e.preventDefault();
        let response = await dispatch(update(new FormData(e.target)) as any);
    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.edit_page_title}></Header>

                    {Object.keys(state.item).length && (
                        <div className="content_body custom_scroll">
                            <form
                                onSubmit={(e) => handle_submit(e)}
                                className="form_600 mx-auto pt-3"
                            >
                                <input
                                    type="hidden"
                                    name="id"
                                    defaultValue={state.item.id}
                                />
                                <div className="form-group form-horizontal">
                                    <label>Name</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="name"
                                            name="name"
                                            defaultValue={state.item.name}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Email</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            name="email"
                                            defaultValue={state.item.email}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Phone Number</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="phone number"
                                            name="phone_number"
                                            defaultValue={
                                                state.item.phone_number
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Parmenent Address</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="parmenent address"
                                            name="parmenent_address"
                                            defaultValue={
                                                state.item.parent_infos
                                                    ?.parmenent_address
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Present Address</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="present address"
                                            name="present_address"
                                            defaultValue={
                                                state.item.parent_infos
                                                    ?.present_address
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Occupation</label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="name"
                                            name="occupation"
                                            defaultValue={
                                                state.item.parent_infos
                                                    ?.occupation
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <InputImage
                                        label={'image'}
                                        name={'image'}
                                        defalut_preview={get_value('image')}
                                    />
                                </div>
                                <div className="form-group student_submit form-horizontal">
                                    {/* <label></label> */}
                                    <div className="form_elementss">
                                        <button className="btn btn_1">
                                            update
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Edit;
