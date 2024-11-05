import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const EditAssignment: React.FC<Props> = (props: Props) => {
    return (
        <div className="admin_dashboard">
            {/* <h3>Create New EditAssignment</h3> */}
            <div className="content_body">
                <form className="form_600 mx-auto pt-3">
                    <div className="form-group form-horizontal">
                        <label>Class</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="Class"
                                name="class"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Subject</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="subject"
                                name="subject"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Chapter</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="chapter"
                                name="chapter"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Topic</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="topic"
                                name="topic"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>EditAssignment</label>
                        <div className="form_elements">
                            <input type="file" name="materials" />
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

export default EditAssignment;
