import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const Review: React.FC<Props> = (props: Props) => {
    return (
        <div className="admin_dashboard">
            {/* <h3>Create New Review</h3> */}
            <div className="content_body">
                <form className="form_600 mx-auto pt-3">
                    <div className="form-group form-horizontal">
                        <label>Name</label>
                        <div className="form_elements">
                            <input type="text" placeholder="Name" name="name" />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Class</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="class"
                                name="class"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Roll</label>
                        <div className="form_elements">
                            <input type="text" placeholder="roll" name="roll" />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Review</label>
                        <div className="form_elements">
                            <textarea
                                name="review"
                                id=""
                                placeholder="Write your review"
                            ></textarea>
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

export default Review;
