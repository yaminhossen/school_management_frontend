import React from 'react';
import { Link, Outlet } from 'react-router-dom';
export interface Props {}

const SingleStudent: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            name: 'Shahin',
            class: 'Six',
            roll: '101',
            cgpa: '3.5',
            present: '90%',
            total_absance: '10',
        },
    ];

    return (
        <div className="admin_dashboard">
            <div className="admin_dashboard">
                <div className="single-info-details">
                    <div className="item-img">
                        <img
                            className="user_profile_img"
                            src="/assets/dashboard/images/avatar.png"
                            alt="teacher"
                        />
                    </div>
                    <div className="item-content">
                        <div className="header-inline item-header details_header">
                            <h3 className="text-dark-medium profile_name font-medium">
                                Shafiqur Rahman
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
                                <Link to="/childrens/details">
                                    Basic informations
                                </Link>
                            </li>
                            <li>
                                <Link to="/childrens/details/academic-information">
                                    Academic informations
                                </Link>
                            </li>
                            <li>
                                <Link to="/childrens/details/document">
                                    Documents
                                </Link>
                            </li>
                            <li>
                                <Link to="/childrens/details/parent">
                                    Parents
                                </Link>
                            </li>
                            <li>
                                <Link to="/childrens/details/skill">
                                    Skills
                                </Link>
                            </li>
                            <li>
                                <Link to="/childrens/details/language">
                                    Languages
                                </Link>
                            </li>
                            <li>
                                <Link to="/childrens/details/contact-number">
                                    Contact Numbers
                                </Link>
                            </li>
                            <li>
                                <Link to="/childrens/details/educational-background">
                                    Educational Backgrounds
                                </Link>
                            </li>
                            <li>
                                <Link to="/childrens/details/payments">
                                    Payments
                                </Link>
                            </li>
                            <li>
                                <Link to="/childrens/details/dues">Dues</Link>
                            </li>
                            <li>
                                <Link to="/childrens/details/result-part">
                                    Result Part
                                </Link>
                            </li>
                        </ul>
                        <div></div>
                        <div className="info-table table-responsive">
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleStudent;
