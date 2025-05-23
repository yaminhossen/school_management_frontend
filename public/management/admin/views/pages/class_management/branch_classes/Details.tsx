import React, { useEffect } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { Link, Outlet, useParams } from 'react-router-dom';
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
                                        <td>Class</td>
                                        <td>:</td>
                                        <td>{state.item.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Code</td>
                                        <td>:</td>
                                        <td>{state.item.code}</td>
                                    </tr>
                                    <tr>
                                        <td>Capacity</td>
                                        <td>:</td>
                                        <td>{state.item.capacity}</td>
                                    </tr>
                                    {/* <tr>
                                        <td>Fee</td>
                                        <td>:</td>
                                        <td>{state.item.fee}</td>
                                    </tr> */}
                                    {/* <tr>
                                        <td>Prerequisities</td>
                                        <td>:</td>
                                        <td>{state.item.prerequisities}</td>
                                    </tr> */}
                                    <tr className="">
                                        <td>Prerequisities</td>
                                        <td>:</td>
                                        <td className="details_descrtiption2">
                                            {state.item?.prerequisities}
                                        </td>
                                    </tr>
                                    
                                    {/* <tr className="">
                                        <td>Prerequisities</td>
                                        <td>:</td>
                                        <td className="details_descrtiption2">
                                            {state.item?.prerequisities}
                                        </td>
                                    </tr> */}
                                    {/* <tr>
                                        <td>Student Instructions</td>
                                        <td>:</td>
                                        <td>
                                            {state.item.student_instructions}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Parent Instruction</td>
                                        <td>:</td>
                                        <td>
                                            {state.item.parent_instructions}
                                        </td>
                                    </tr> */}
                                    {/* <tr>
                                        <td>Policies</td>
                                        <td>:</td>
                                        <td>{state.item.policies}</td>
                                    </tr> */}
                                    {/* <tr>
                                        <td>Rules</td>
                                        <td>:</td>
                                        <td>{state.item.rules}</td>
                                    </tr> */}
                                    <tr className="">
                                        <td>Rules</td>
                                        <td>:</td>
                                        <td className="details_descrtiption2">
                                            {state.item?.rules}
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td>Waiver rules</td>
                                        <td>:</td>
                                        <td>{state.item.waiver_rules}</td>
                                    </tr>
                                    <tr>
                                        <td>Discount rules</td>
                                        <td>:</td>
                                        <td>{state.item.discount_rules}</td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {/* <div className="content_body custom_scroll">
                        <div className="single-info-details">
                            <div className="item-content">
                                <div className="header-inline item-header details_header">
                                    <h3 className="text-dark-medium profile_name font-medium">
                                        Class Fee Details
                                    </h3>
                                    <div className="header-elements">
                                        <ul>
                                            <li>
                                                <a href="">
                                                    <span className="material-symbols-outlined fill">
                                                        edit_square
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="material-symbols-outlined fill">
                                                        print
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="material-symbols-outlined fill">
                                                        system_update_alt
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <ul className="section_naviagation">
                                    <li>
                                        <Link to="/branch-classes/details/3/fees">
                                            Fees
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/branch-classes/details/3/fee-types">
                                            Fee Types
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/branch-classes/details/3/fee-discounts">
                                            Fee Discounts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/branch-classes/details/3/fee-waivers">
                                            Fee Waivers
                                        </Link>
                                    </li>
                                </ul>
                                <div></div>
                                <div className="info-table table-responsive">
                                    <Outlet></Outlet>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Details;
