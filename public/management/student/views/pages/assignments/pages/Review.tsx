import React from 'react';
export interface Props {}

const Review: React.FC<Props> = (props: Props) => {
    return (
        <div className="admin_dashboard">
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <div className="teacher_result">
                    <div>
                        <div>Class</div>
                        <div>
                            <select name="class" id="">
                                <option value="six">Six</option>
                                <option value="seven">Seven</option>
                                <option value="eight">Eight</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>Subject</div>
                        <div>
                            <select name="subject" id="">
                                <option value="bangla">Six</option>
                                <option value="agriculture">Seven</option>
                                <option value="social science">
                                    Social Science
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>Assignment</div>
                        <div>
                            <select name="assignment" id="">
                                <option value="first">First</option>
                                <option value="second">Second</option>
                                <option value="third">Third</option>
                            </select>
                        </div>
                    </div>
                    <button
                        className="btn btn-sm btn-outline-info "
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div className="teacher_result">
                <div>
                    <div>Mark</div>
                    <div>
                        <input type="number" name="" id="" />
                    </div>
                </div>
                <button className="btn btn-sm btn-outline-info " type="submit">
                    Submit
                </button>
            </div>
            <div className="content_body">
                <div>
                    <h3>Assignment no 1</h3>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Officiis quisquam voluptatibus aliquam id quos
                        dignissimos adipisci aliquid quas harum itaque.
                        Cupiditate, dicta doloremque ex corrupti laborum culpa
                        illum voluptatum eius?
                    </p>
                    <div>
                        <img
                            className="assignment_image"
                            src="assets/dashboard/images/assignment1.jpg"
                            alt="assignment1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
