import React, { useState, useEffect, useRef } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import BackButton from './BackButton';
export interface Props {}

const EditAssignment: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>([]);
    const [classes, setClasses] = useState<any>([]);
    const [subjects, setSubjects] = useState<any>([]);
    const selectRef = useRef<HTMLSelectElement>(null);
    const selectRef2 = useRef<HTMLSelectElement>(null);
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/v1/assignments/${id}`);
            setData(response.data.data);
        } catch (error) {
            setError(error);
        }
    };
    const fetchClasses = async () => {
        try {
            const response = await axios.get(
                `/api/v1/branch-class-subjects/class-wise-teacher`,
                // `/api/v1/branch-classes/all-class`,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        try {
            const response = await axios.post(
                '/api/v1/assignments/update',
                formData,
            );
            (window as any).toaster('Assignment Updated');
        } catch (error) {
            setError(error);
        }
    };

    const fetchSubjects = async (e) => {
        try {
            const response = await axios.get(
                `/api/v1/branch-class-subjects/class-wise-subject/${Number(e)}`,
            );
            setSubjects(response.data.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchSubjects(data?.class_id);
    }, [classes]);

    const handleChange = async (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        let id = event.target.value;
        try {
            const response = await axios.get(
                `/api/v1/branch-class-subjects/class-wise-subject/${id}`,
            );
            setSubjects(response.data.data);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="admin_dashboard">
            <h3>Edit</h3>
            <BackButton></BackButton>
            <div className="content_body">
                <form onSubmit={handleSubmit} className="form_600 mx-auto pt-3">
                    <div className="form-group form-horizontal">
                        <label>Class</label>
                        <div className="form_elements">
                            {classes.length && (
                                <select
                                    name="class"
                                    // defaultValue={data.class_id}
                                    id=""
                                    defaultValue={data?.class_id}
                                    onChange={handleChange}
                                >
                                    {/* <option value={data.class_id}></option> */}
                                    {classes.map((i, index) => {
                                        return (
                                            <option value={i.id}>
                                                {i.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            )}
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
                            {subjects.length && (
                                <select
                                    name="subject"
                                    defaultValue={data?.subject_id}
                                    id=""
                                >
                                    {/* <option value={data.class_id}></option> */}
                                    {subjects.map((i, index) => {
                                        return (
                                            <option value={i.id}>
                                                {i.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            )}
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
