import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import {
    Link,
    NavLink,
    Outlet,
    useNavigate,
    useParams,
} from 'react-router-dom';
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
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Go back one step in browser history
    };

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <div className="action_bar">
                        <div className="navigation">
                            <ul>
                                <li className="search_li">
                                    {/* <HeadSearch></HeadSearch> */}
                                </li>
                            </ul>
                        </div>
                        <div className="title no_move" id="users_drag">
                            <h2>
                                Student Details
                                {/* {state.is_loading && <span> loading..</span>} */}
                            </h2>
                        </div>
                        <div className="control">
                            <ul>
                                <li>
                                    <Link to="#" onClick={handleBack}>
                                        <span className="material-symbols-outlined fill">
                                            arrow_back
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="content_body custom_scroll">
                        <div className="single-info-details">
                            <div className="item-img">
                                <img
                                    className="user_profile_img"
                                    src={
                                        state.item?.image ||
                                        '/assets/dashboard/images/avatar.png'
                                    }
                                    alt="Student Profile"
                                />
                            </div>
                            <div className="item-content">
                                <div className="header-inline item-header details_header">
                                    <h3 className="text-dark-medium profile_name font-medium">
                                        {state.item?.name}
                                    </h3>
                                    <div className="header-elements"></div>
                                </div>
                                <ul className="section_naviagation">
                                    <li className="active_Li">
                                        <NavLink
                                            to={`/user-students/details/${params.id}/basic-information`}
                                            // className="active_nav_link"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active_nav_link'
                                                    : 'normal_nav_link'
                                            }
                                        >
                                            Basic informations
                                        </NavLink>
                                    </li>
                                    <li className="active_Li">
                                        <NavLink
                                            to={`/user-students/details/${params.id}/academic-information`}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active_nav_link'
                                                    : 'normal_nav_link'
                                            }
                                        >
                                            Informations
                                        </NavLink>
                                    </li>
                                    <li className="active_Li">
                                        <NavLink
                                            to={`/user-students/details/${params.id}/document`}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active_nav_link'
                                                    : 'normal_nav_link'
                                            }
                                        >
                                            Documents
                                        </NavLink>
                                    </li>
                                    <li className="active_Li">
                                        <NavLink
                                            to={`/user-students/details/${params.id}/parent`}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active_nav_link'
                                                    : 'normal_nav_link'
                                            }
                                        >
                                            Parents
                                        </NavLink>
                                    </li>
                                    <li className="active_Li">
                                        <NavLink
                                            to={`/user-students/details/${params.id}/skill`}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active_nav_link'
                                                    : 'normal_nav_link'
                                            }
                                        >
                                            Skills
                                        </NavLink>
                                    </li>
                                    <li className="active_Li">
                                        <NavLink
                                            to={`/user-students/details/${params.id}/language`}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active_nav_link'
                                                    : 'normal_nav_link'
                                            }
                                        >
                                            Languages
                                        </NavLink>
                                    </li>
                                    <li className="active_Li">
                                        <NavLink
                                            to={`/user-students/details/${params.id}/contact-number`}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active_nav_link'
                                                    : 'normal_nav_link'
                                            }
                                        >
                                            Contact Numbers
                                        </NavLink>
                                    </li>
                                    <li className="active_Li">
                                        <NavLink
                                            to={`/user-students/details/${params.id}/educational-background`}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active_nav_link'
                                                    : 'normal_nav_link'
                                            }
                                        >
                                            Educational Backgrounds
                                        </NavLink>
                                    </li>
                                    <li className="active_Li">
                                        <NavLink
                                            to={`/user-students/details/${params.id}/payments`}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'active_nav_link'
                                                    : 'normal_nav_link'
                                            }
                                        >
                                            Payments
                                        </NavLink>
                                    </li>
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
