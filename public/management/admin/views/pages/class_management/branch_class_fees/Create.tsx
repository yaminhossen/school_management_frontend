import React, { useEffect, useRef, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { store } from './config/store/async_actions/store';
import { initialState } from './config/store/inital_state';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import storeSlice from './config/store';
import { classes } from './config/store/async_actions/classes';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const Create: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [feeTypes, setFeeTypes] = useState<any>([]);
    const search_input = useRef<HTMLSelectElement>(null);
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    async function handle_submit(e) {
        e.preventDefault();
        let response = await dispatch(store(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
        }
    }
    const fetchData = async () => {
        try {
            // const response = await axios.get(
            //     `/api/v1/branch-class-fee-types/class-wise-fee-types/1`,
            // );
            // setFeeTypes(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    async function initdependancy() {
        await dispatch(storeSlice.actions.set_item({}));
        await dispatch(classes({}) as any);
        await fetchData();
    }

    useEffect(() => {
        initdependancy();
    }, []);
    console.log('state', state);

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
    
        let date = moment().format('YYYY-MM-DD');
    
        const startYear = '2025';
        const years = Array.from({ length: 31 }, (_, i) => Number(startYear) + i);
    
        // State for selected year
        const [selectedYear, setSelectedYear] = useState(
            sessionStorage.getItem('selectedYear') || startYear,
        );
    
        // Update session storage when year changes
        useEffect(() => {
            sessionStorage.setItem('selectedYear', selectedYear);
        }, [selectedYear]);
    
        // Handle year selection
        const handleYearChange = (event) => {
            setSelectedYear(event.target.value);
        };
    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.create_page_title}></Header>
                    <div className="content_body custom_scroll">
                        <form
                            onSubmit={(e) => handle_submit(e)}
                            className="form_600 mx-auto pt-3"
                        >
                            <div className="">
                                <div className="form-group form-horizontal">
                                    <label>
                                        Branch class{' '}
                                                <span className="valid_star">
                                                    *
                                                </span></label>
                                    <div className="form_elements">
                                        <select
                                            name="branch_class_id"
                                            id=""
                                            onChange={handleChange}
                                        >
                                            <option value="">At first select class</option>
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
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>fee type{' '}
                                                <span className="valid_star">
                                                    *
                                                </span></label>
                                    <div className="form_elements">
                                        {feeTypes.length > 0 ? (
                                            <select name="fee_type_id" id="">
                                                {feeTypes.map((i, index) => (
                                                    <option
                                                        key={i.id}
                                                        value={i.id}
                                                    >
                                                        {i.name}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <p
                                                name="fee_type_id"
                                                style={{ color: 'gray' }}
                                            >
                                                No fee type available for this
                                                class.
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Name{' '}
                                                <span className="valid_star">
                                                    *
                                                </span></label>
                                    <div className="form_elements">
                                        <input
                                            type="text"
                                            placeholder="name"
                                            name="name"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal">
                                    <label>Amount{' '}
                                                <span className="valid_star">
                                                    *
                                                </span></label>
                                    <div className="form_elements">
                                        <input
                                            type="number"
                                            placeholder="amount"
                                            name="amount"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-horizontal custom_scroll">
                                    <label htmlFor="session">Session</label>
                                    <div className="form_elements custom_scroll">
                                        <select
                                            id="session"
                                            name="session"
                                            value={selectedYear}
                                            onChange={handleYearChange}
                                            className="form-control custom_scroll"
                                            style={{ paddingRight: '30px' }} // Ensures space for the native arrow
                                        >
                                            <option value="" disabled>
                                                Select a year
                                            </option>{' '}
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group student_submit form-horizontal">
                                {/* <label></label> */}
                                <div className="form_elementss">
                                    <button className="btn btn_1">
                                        submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Create;
