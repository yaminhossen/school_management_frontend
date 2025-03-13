import React, { useState, useEffect, useRef } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const MaterialEdit: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>([]);
    const [classes, setClasses] = useState<any>([]);
    const [subjects, setSubjects] = useState<any>([]);
    const selectRef = useRef<HTMLSelectElement>(null);
    const selectRef2 = useRef<HTMLSelectElement>(null);
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/v1/branch-class-resources/${id}`,
            );
            setData(response.data.data);
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
        } catch (error) {
            setError(error);
        }
    };

    async function init_data() {
        await fetchData();
        await fetchClasses();
    }

    useEffect(() => {
        init_data();
    }, []);
    // function lastDate(date: string) {
    //     console.log(moment(date).format('YYYY-MM-DD'));
    // }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        let formData = new FormData(e.target);
        console.log('formData', formData);
        try {
            const response = await axios.post(
                '/api/v1/branch-class-resources/update',
                formData,
            );
            // here use toastar
            // setData(response.data.data.data);
            // setTotalIncome(response.data.data.data2);
        } catch (error) {
            setError(error);
        }
    };

    const handleChange = async () => {
        // let id2 = event.target.value;
        // console.log('evetn id', id2);
        let value = selectRef?.current?.value;
        console.log('select ref value', Number(value));

        try {
            const response = await axios.get(
                `/api/v1/branch-class-subjects/class-wise-subject/${Number(value)}`,
            );
            setSubjects(response.data.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        if (selectRef.current && data) {
            selectRef.current.value = data.branch_class_id; // Set value after render
            handleChange();
        }
    }, [classes]);

    useEffect(() => {
        if (selectRef2.current && data) {
            selectRef2.current.value = data.branch_class_subject_id; // Set value after render
        }
    }, [subjects]);

    return (
        <div className="admin_dashboard">
            <h3>Edit</h3>
            <div className="content_body">
                <form onSubmit={handleSubmit} className="form_600 mx-auto pt-3">
                    <div className="form-group form-horizontal">
                        <label>Class</label>
                        <div className="form_elements">
                            <select
                                name="class"
                                // defaultValue={data.branch_class_id}
                                id=""
                                ref={selectRef}
                                onChange={handleChange}
                            >
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
                            <select
                                name="subject"
                                // defaultValue={data.branch_class_subject_id}
                                id=""
                                ref={selectRef2}
                                // onChange={handleChange}
                            >
                                {subjects.map((i, index) => {
                                    return (
                                        <option value={i.id}>{i.name}</option>
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

export default MaterialEdit;
