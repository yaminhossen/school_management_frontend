import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const Account: React.FC<Props> = (props: Props) => {
    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <form className="form_600 mx-auto pt-3">
                    <div className="form-group form-horizontal">
                        <label>Account Name</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="Enter Account Name"
                                name="account_name"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Opening Balance</label>
                        <div className="form_elements">
                            <input
                                type="number"
                                placeholder="Your opening balance"
                                name="opening_balance"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Date</label>
                        <div className="form_elements">
                            <input type="date" name="date" />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label></label>
                        <div className="form_elements">
                            <button className="btn btn-sm btn-outline-info">
                                submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Account;
