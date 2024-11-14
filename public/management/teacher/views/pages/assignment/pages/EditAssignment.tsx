import React, { useState, useEffect, useRef } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const EditAssignment: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>([]);
    const [classes, setClasses] = useState<any>([]);
    const [subjects, setSubjects] = useState<any>([]);
    const [categories, setCategories] = useState<any>([]);
    // const selectRef = useRef<HTMLSelectElement>(null);
    // const inputRef = useRef<HTMLInputElement>(null);
    const { id } = useParams();

    useEffect(() => {
        // Function to fetch data
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/v1/assignments/${id}`);
            setData(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };
    const fetchClasses = async () => {
        try {
            const response = await axios.get(
                `/api/v1/branch-classes/all-class`,
            );
            setClasses(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };
    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                `/api/v1/assignment-categories/all-categories`,
            );
            setCategories(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchCategories();
        fetchClasses();
    }, []);
    console.log(data);
    function lastDate(date: string) {
        console.log(moment(date).format('YYYY-MM-DD'));
    }
    // let date = moment().format('YYYY-MM-DD');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        let formData = new FormData(e.target);
        console.log('formData', formData);
        try {
            const response = await axios.post(
                '/api/v1/assignments/update',
                formData,
            );
            // here use toastar
            // setData(response.data.data.data);
            // setTotalIncome(response.data.data.data2);
        } catch (error) {
            setError(error);
        }
    };

    const handleChange = async (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        let id = event.target.value;
        try {
            const response = await axios.get(
                `/api/v1/branch-class-subjects/class-wise-subject/${id}`,
            );
            setSubjects(response.data.data);
            // setData(response.data);
        } catch (error) {
            setError(error);
        }
        console.log('Selected value:', event.target.value);
    };
    console.log('Selected dataaa:', subjects);
    return (
        <div className="admin_dashboard">
            <h3>Edit</h3>
            <div className="content_body">
                <form onSubmit={handleSubmit} className="form_600 mx-auto pt-3">
                    <div className="form-group form-horizontal">
                        <label>Class</label>
                        <div className="form_elements">
                            {/* <input
                                type="text"
                                placeholder="Class"
                                name="class"
                            /> */}
                            <select
                                name="class"
                                defaultValue={data.class_id}
                                id=""
                                // ref={inputRef}
                                onChange={handleChange}
                            >
                                <option value={data.class_id}></option>
                                {classes.map((i, index) => {
                                    return (
                                        <option value={i.id}>{i.name}</option>
                                    );
                                })}
                            </select>
                            <input
                                type="hidden"
                                defaultValue={data.id}
                                name="id"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Subject</label>
                        <div className="form_elements">
                            {/* <input
                                type="text"
                                placeholder="subject"
                                name="subject"
                            /> */}
                            <select
                                name="subject"
                                defaultValue={data.subject_id}
                                id=""
                                // ref={inputRef}
                                // onChange={handleChange}
                            >
                                {/* <option value={data.class_id}></option> */}
                                {subjects.map((i, index) => {
                                    return (
                                        <option value={i.id}>{i.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Category</label>
                        <div className="form_elements">
                            <select
                                name="assignment_categories_id"
                                defaultValue={data.assignment_categories_id}
                                id=""
                            >
                                <option
                                    value={data.assignment_categories_id}
                                ></option>
                                {categories.map((i, index) => {
                                    return (
                                        <option value={i.id}>{i.title}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Title</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="title"
                                name="title"
                                defaultValue={data.title}
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Description</label>
                        <div className="form_elements">
                            <textarea
                                placeholder="description"
                                name="description"
                                defaultValue={data.description}
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
                            <input
                                type="number"
                                name="mark"
                                defaultValue={data.mark}
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Deadline</label>
                        <div className="form_elements">
                            <input
                                type="date"
                                defaultValue={moment(data?.deadline).format(
                                    'YYYY-MM-DD',
                                )}
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
