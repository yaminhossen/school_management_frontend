import React, { useEffect, useRef } from 'react';
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
import { drivers } from './config/store/async_actions/drivers';
export interface Props {}

const Edit: React.FC<Props> = (props: Props) => {
    const driverId = useRef<HTMLSelectElement>(null);
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    async function handle_submit(e) {
        e.preventDefault();
        let response = await dispatch(update(new FormData(e.target)) as any);
    }

    async function initdependancy() {
        await dispatch(storeSlice.actions.set_item({}));
        await dispatch(details({ id: params.id }) as any);
        await dispatch(drivers({}) as any);
    }

    useEffect(() => {
        initdependancy();
    }, []);
    useEffect(() => {
        if (driverId.current) {
            driverId.current.value =
                state.item?.branch_transport_driver_id || ''; // Safely set the value
        }
        // console.log('Updated driverId:', driverId.current?.value);
    }, [state.drivers]);
    function get_value(key) {
        try {
            if (state.item[key]) return state.item[key];
            if (state.item?.staff_infos[key])
                return state.item?.staff_infos[key];
        } catch (error) {
            return '';
        }
        return '';
    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.edit_page_title}></Header>

                    {Object.keys(state.item).length && (
                        <div className="content_body">
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
                                    <label>
                                        Branch transport driver{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <select
                                            name="branch_transport_driver_id"
                                            id=""
                                            ref={driverId}
                                        >
                                            {state?.drivers?.length &&
                                                state.drivers?.map(
                                                    (i: {
                                                        [key: string]: any;
                                                    }) => {
                                                        return (
                                                            <option
                                                                value={i.id}
                                                            >
                                                                {i.name}
                                                            </option>
                                                        );
                                                    },
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Vehicle Title{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="vehicle title"
                                            name="title"
                                            defaultValue={state.item.title}
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Vehicle type{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <select
                                            name="vehicle_type"
                                            defaultValue={state.item.type}
                                            id=""
                                        >
                                            <option value="van">Van</option>
                                            <option value="bus">Bus</option>
                                            <option value="microbus">
                                                Microbus
                                            </option>
                                            <option value="private">
                                                Private
                                            </option>
                                            <option value="riksaw">
                                                Riksaw
                                            </option>
                                        </select>

                                        {/* <input
                                            type="text"
                                            placeholder="vehicle type"
                                            name="vehicle_type"
                                            defaultValue={state.item.type}
                                        /> */}
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Vehicle no{' '}
                                        <span className="valid_star">*</span>
                                    </label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="vehicle no"
                                            name="vehicle_no"
                                            defaultValue={state.item.vehicle_no}
                                        />
                                    </div>
                                </div>
                                <div className="form-group student_submit form-horizontal">
                                    {/* <label></label> */}
                                    <div className="form_elementss">
                                        <button className="btn btn_1">
                                            Update
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
