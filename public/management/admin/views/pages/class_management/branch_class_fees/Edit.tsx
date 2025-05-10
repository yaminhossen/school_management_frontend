import React, { useEffect, useRef, useState } from 'react';
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
import { classes } from './config/store/async_actions/classes';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const Edit: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [feeTypes, setFeeTypes] = useState<any>([]);
    const search_input = useRef<HTMLSelectElement>(null);
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/v1/branch-class-fee-types/class-wise-fee-types/${state.item.branch_class_id}`,
            );
            setFeeTypes(response.data.data);
        } catch (error) {
            setError(error);
        }
    };

    async function initdependancy() {
        await dispatch(storeSlice.actions.set_item({}));
        await dispatch(classes({}) as any);
        dispatch(details({ id: params.id }) as any);
    }

    useEffect(() => {
        initdependancy();
    }, []);

    useEffect(() => {
        fetchData();
    }, [state.item.branch_class_id]);
    const handleChange = async (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        let id = event.target.value;
        try {
            const response = await axios.get(
                `/api/v1/branch-class-fee-types/class-wise-fee-types/${id}`,
            );
            setFeeTypes(response.data.data);
        } catch (error) {
            setError(error);
        }
        console.log('Selected value:', event.target.value);
    };
    console.log('Selected dataaa:', feeTypes);

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
                                        Branch class{' '}
                                                <span className="valid_star">
                                                    *
                                                </span></label>
                                    <div className="form_elements">
                                        {state.classes.length && (
                                            <select
                                                name="branch_class_id"
                                                id=""
                                                defaultValue={
                                                    state.item.branch_class_id
                                                }
                                                onChange={handleChange}
                                            >
                                                {state?.classes?.length &&
                                                    state.classes?.map(
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
                                        )}
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        fee type{' '}
                                                <span className="valid_star">
                                                    *
                                                </span></label>
                                    <div className="form_elements">
                                        {feeTypes.length && (
                                            <select
                                                name="fee_type_id"
                                                defaultValue={
                                                    state.item.fee_type_id
                                                }
                                                id=""
                                            >
                                                {/* <option value={data.class_id}></option> */}
                                                {feeTypes.map((i, index) => {
                                                    return (
                                                        <option value={i.id}>
                                                            {i.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>
                                        Name{' '}
                                                <span className="valid_star">
                                                    *
                                                </span></label>
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
                                    <label>
                                        Amount{' '}
                                                <span className="valid_star">
                                                    *
                                                </span></label>
                                    <div className="form_elements">
                                        <input
                                            type="number"
                                            placeholder="amount"
                                            name="amount"
                                            defaultValue={state.item.amount}
                                        />
                                    </div>
                                </div>

                                <div className="form-group form-horizontal">
                                    <label>
                                        Session{' '}
                                                <span className="valid_star">
                                                    *
                                                </span></label>
                                    <div className="form_elements">
                                        <input
                                            type="date"
                                            name="session"
                                            defaultValue={moment(
                                                `${state.item?.session}-01-01`,
                                            ).format('YYYY-MM-DD')}
                                        />
                                    </div>
                                </div>
                                {/* <div className="form-group form-horizontal">
                                    <label>Description</label>
                                    <div className="form_elements">
                                        <textarea
                                            name="description"
                                            id=""
                                            placeholder="description"
                                            defaultValue={
                                                state.item.description
                                            }
                                        ></textarea>
                                    </div>
                                </div> */}
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
