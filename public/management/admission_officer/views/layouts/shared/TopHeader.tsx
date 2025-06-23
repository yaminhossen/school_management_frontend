import React, { useState, useEffect } from 'react';
import NavbarSwitch from './NavbarSwitch';
import axios from 'axios';
import { anyObject } from '../../../common_types/object';
import { initialState } from '../../pages/tasks/config/store/inital_state';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store';
import setup from '../../pages/tasks/config/setup';
import storeSlice from '../../pages/tasks/config/store';
import { unseen_tasks } from '../../pages/tasks/config/store/async_actions/unseen_tasks';

export interface Props {}

const TopHeader: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(storeSlice.actions.set_select_fields('id, status'));
        dispatch(unseen_tasks({}) as any);
    }, []);

    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            let confirm = await (window as anyObject).s_confirm('Logout');
            if (confirm) {
                await axios.post('/api/v1/auth/logout');
            }
            // const response = await axios.post('/api/v1/auth/teacher/logout');
            // console.log('response123', response);
            // if(response.status)
        } catch (error) {
            setError(error);
        }
    };
    const [error2, setError2] = useState(null);
    const [data, setData] = useState([]);

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('/api/v1/tasks/unseen-tasks');
    //         setData(response.data.data);
    //         // setData(response.data);
    //     } catch (error) {
    //         setError2(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);
    console.log('unseen tasks', state.item);

    return (
        <>
            <div className="page-main-header">
                <div
                    className="main-header-left"
                    semilight-bg-color="bg-default-light-colo"
                >
                    <div className="logo-wrapper">
                        <a href="#/">Nurul Hikma Model Madrasah</a>
                    </div>
                </div>
                <div
                    className="main-header-right row"
                    header-bg-color="bg-default-light-colo"
                >
                    <NavbarSwitch />
                    <div className="nav-right col">
                        <ul className="nav-menus">
                            <li className="notification-bell">
                                <a
                                    href="/admission-officer#/tasks/pending"
                                    className="text-dark"
                                >
                                    <i className="icon-bell" />
                                    <span className="notification-badge">
                                        {state.item.length > 0 ? state.item.length : '0'}
                                    </span>
                                </a>
                            </li>
                            <li className="onhover-dropdown">
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h6 className="m-0 txt-dark f-16">
                                            My Account
                                            <i className="fa fa-angle-down pull-right ms-2" />
                                        </h6>
                                    </div>
                                </div>
                                <ul className="profile-dropdown onhover-show-div p-20">
                                    <li>
                                        <a href="/admission-officer#/settings">
                                            <i className="icon-user" />
                                            Edit Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={handleSubmit} href="#">
                                            <i className="icon-power-off" />
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div className="d-lg-none mobile-toggle">
                            <i className="icon-more" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopHeader;
