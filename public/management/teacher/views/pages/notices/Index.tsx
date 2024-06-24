import React from 'react';
import { Link } from 'react-router-dom';
import { app_config } from '../../../../../../src/configs/app.config';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    return (
        <div className="admin_dashboard">
            <div className="row my-4">
                <div className="col-md-6">
                    <div className="notice_area_content">
                        <ul>
                            <li>
                                <div className="notice">
                                    {/* <!--notice date_area start --> */}
                                    <div className="date_area">
                                        <div className="day_and_month_area">
                                            <p className="text_day">20</p>
                                            <p className="text_month">January</p>
                                        </div>
                                        <div className="year_area">
                                            <p className="text_year">2023</p>
                                        </div>
                                    </div>
                                    {/* <!--notice date_area end--> */}

                                    {/* <!-- notice_title_and_description_area start --> */}
                                    <div className="notice_title_and_description_area">
                                        <div className="notice_title">
                                            <a
                                                href="notice_details.html"
                                                className="title_text"
                                            >
                                                9, 10, 11 তারিখ মাদরাসা 9, 10, 11 তারিখ
                                                মাদরাসা বন্ধ থাকবে
                                            </a>
                                        </div>
                                        <div className="notice_description">
                                            <span className="description_text">
                                                প্রথম সেমিস্টার পরীক্ষা শেষ হওয়ার কারণে
                                                আগামী 9 10 11 তারিখ মাদরাসা বন্ধ থাকবে{' '}
                                                <a
                                                    href="notice_details.html"
                                                    className="read_more_area"
                                                >
                                                    Read more ...
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    {/* <!-- notice_title_and_description_area end--> */}
                                </div>
                            </li>
                            <li>
                                <div className="notice">
                                    {/* <!--notice date_area start --> */}
                                    <div className="date_area">
                                        <div className="day_and_month_area">
                                            <p className="text_day">20</p>
                                            <p className="text_month">January</p>
                                        </div>
                                        <div className="year_area">
                                            <p className="text_year">2023</p>
                                        </div>
                                    </div>
                                    {/* <!--notice date_area end--> */}

                                    {/* <!-- notice_title_and_description_area start --> */}
                                    <div className="notice_title_and_description_area">
                                        <div className="notice_title">
                                            <a
                                                href="notice_details.html"
                                                className="title_text"
                                            >
                                                9, 10, 11 তারিখ মাদরাসা 9, 10, 11 তারিখ
                                                মাদরাসা বন্ধ থাকবে
                                            </a>
                                        </div>
                                        <div className="notice_description">
                                            <span className="description_text">
                                                প্রথম সেমিস্টার পরীক্ষা শেষ হওয়ার কারণে
                                                আগামী 9 10 11 তারিখ মাদরাসা বন্ধ থাকবে{' '}
                                                <a
                                                    href="notice_details.html"
                                                    className="read_more_area"
                                                >
                                                    Read more ...
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    {/* <!-- notice_title_and_description_area end--> */}
                                </div>
                            </li>
                            <li>
                                <div className="notice">
                                    {/* <!--notice date_area start --> */}
                                    <div className="date_area">
                                        <div className="day_and_month_area">
                                            <p className="text_day">20</p>
                                            <p className="text_month">January</p>
                                        </div>
                                        <div className="year_area">
                                            <p className="text_year">2023</p>
                                        </div>
                                    </div>
                                    {/* <!--notice date_area end--> */}

                                    {/* <!-- notice_title_and_description_area start --> */}
                                    <div className="notice_title_and_description_area">
                                        <div className="notice_title">
                                            <a
                                                href="notice_details.html"
                                                className="title_text"
                                            >
                                                9, 10, 11 তারিখ মাদরাসা 9, 10, 11 তারিখ
                                                মাদরাসা বন্ধ থাকবে
                                            </a>
                                        </div>
                                        <div className="notice_description">
                                            <span className="description_text">
                                                প্রথম সেমিস্টার পরীক্ষা শেষ হওয়ার কারণে
                                                আগামী 9 10 11 তারিখ মাদরাসা বন্ধ থাকবে{' '}
                                                <a
                                                    href="notice_details.html"
                                                    className="read_more_area"
                                                >
                                                    Read more ...
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    {/* <!-- notice_title_and_description_area end--> */}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
