import moment from 'moment/moment';
import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const EditAssignment: React.FC<Props> = (props: Props) => {
    let date = moment().format('YYYY-MM-DD');
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
                        <label>Category</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="assignment category"
                                name="assignment_category"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Title</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="title"
                                name="title"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Description</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="description"
                                name="description"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Attachment</label>
                        <div className="form_elements">
                            <input type="file" name="attachment" />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Mark</label>
                        <div className="form_elements">
                            <input type="number" name="mark" />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Deadline</label>
                        <div className="form_elements">
                            <input
                                type="date"
                                defaultValue={date}
                                name="deadline"
                            />
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
