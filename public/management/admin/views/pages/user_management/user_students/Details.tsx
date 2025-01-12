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
    if (state) {
        console.log('state in', state);
    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.details_page_title}></Header>
                    <div className="content_body custom_scroll">
                        <div className="single-info-details">
                            <div className="item-img">
                                <img
                                    className="user_profile_img"
                                    src={state.item.image}
                                    alt="student"
                                />
                            </div>
                            <div className="item-content">
                                <div className="header-inline item-header details_header">
                                    <h3 className="text-dark-medium profile_name font-medium">
                                        Masud Rana
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
                                        <Link
                                            to={`/user-students/details/${params.id}/basic-information`}
                                        >
                                            Basic informations
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/user-students/details/${params.id}/academic-information`}
                                        >
                                            Informations
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/user-students/details/${params.id}/document`}
                                        >
                                            Documents
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/user-students/details/${params.id}/parent`}
                                        >
                                            Parents
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/user-students/details/${params.id}/skill`}
                                        >
                                            Skills
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/user-students/details/${params.id}/language`}
                                        >
                                            Languages
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/user-students/details/${params.id}/contact-number`}
                                        >
                                            Contact Numbers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/user-students/details/${params.id}/educational-background`}
                                        >
                                            Educational Backgrounds
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/user-students/details/${params.id}/payments`}
                                        >
                                            Payments
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link
                                            to={`/user-students/details/${params.id}/dues`}
                                        >
                                            Dues
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/user-students/details/${params.id}/result-part`}
                                        >
                                            Result Part
                                        </Link>
                                    </li> */}
                                </ul>
                                <div></div>
                                <div className="info-table table-responsive">
                                    <Outlet></Outlet>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <Footer></Footer> */}
                </div>
            </div>
        </>
    );
};

export default Details;
