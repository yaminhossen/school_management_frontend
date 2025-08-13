import React, { useState, useEffect, useRef } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import BackButton from './BackButton';
import InputImage, { InputImageRef } from './InputImage';
export interface Props {}

const CreateMaterials: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    // const [data, setData] = useState<any>([]);
    const [classes, setClasses] = useState<any>([]);
    const [subjects, setSubjects] = useState<any>([]);
    const classIdRef = useRef<HTMLSelectElement>(null);
    const inputImageRef = useRef<InputImageRef>(null);
    const [classID, setClassID] = useState('');
    const [sections, setSections] = useState<any>([]);
    const { id } = useParams();
    const fetchClasses = async () => {
        try {
            const response = await axios.get(
                `/api/v1/branch-class-subjects/class-wise-teacher`,
            );
            setClasses(response.data.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        let formData = new FormData(e.target);
        console.log('formData', formData);
        try {
            const response = await axios.post(
                '/api/v1/branch-class-resources/store',
                formData,
            );
            e.target.reset();
            (window as any).toaster('Materials Created');
        } catch (error) {
            setError(error);
        }
    };
    const handleChange2 = async (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        let id = event.target.value;
        setClassID(id);
        try {
            const response = await axios.get(
                `/api/v1/branch-class-sections/class-wise/${id}`,
            );
            setSections(response.data.data);
        } catch (error) {
            setError(error);
        }
        console.log('Selected value:', event.target.value);
    };
    const handleChange = async (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        let id = event.target.value;
        try {
            const response = await axios.get(
                `/api/v1/branch-classes/class-wise-subject/${classID}?section_id=${id}`,
            );
            setSubjects(response.data.data);
        } catch (error) {
            setError(error);
        }
        console.log('Selected value:', event.target.value);
    };
    console.log('Selected dataaa:', classIdRef.current?.value);
    return (
        <div className="admin_dashboard">
            <BackButton></BackButton>
            <h3>Create</h3>
            <div className="content_body">
                <form onSubmit={handleSubmit} className="form_600 mx-auto pt-3">
                    <div className="form-group form-horizontal">
                        <label>
                            Class <span className="valid_star">*</span>
                        </label>
                        <div className="form_elements">
                            <select
                                name="class"
                                // defaultValue={data.branch_class_id}
                                id=""
                                // ref={classIdRef}
                                onChange={handleChange2}
                            >
                                <option value="">Select class</option>
                                {classes.map((i, index) => {
                                    return (
                                        <option value={i.id}>{i.name}</option>
                                    );
                                })}
                            </select>
                            {/* <input
                                type="hidden"
                                defaultValue={data.id}
                                name="id"
                            /> */}
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>
                            Section <span className="valid_star">*</span>
                        </label>
                        <div className="form_elements">
                            <select
                                name="section"
                                onChange={handleChange}
                                id=""
                            >
                                <option value="">Select Section</option>
                                {sections.map((i, index) => {
                                    return (
                                        <option value={i.id}>{i.title}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>
                            Subject <span className="valid_star">*</span>
                        </label>
                        <div className="form_elements">
                            <select name="subject" id="">
                                <option value="">Select subject</option>
                                {subjects.map((i, index) => {
                                    return (
                                        <option value={i.id}>{i.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>
                            Title <span className="valid_star">*</span>
                        </label>
                        <div className="form_elements">
                            <input
                                type="text"
                                placeholder="title"
                                name="title"
                                // defaultValue={data.title}
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Description</label>
                        <div className="form_elements">
                            <textarea
                                placeholder="description"
                                name="description"
                                // defaultValue={data.description}
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>
                            Attachment <span className="valid_star">*</span>
                        </label>
                        <div className="form_elements">
                            {/* <input type="file" name="attachment" /> */}
                            <InputImage
                                ref={inputImageRef}
                                label=""
                                name="attachment"
                                defalut_preview=""
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

export default CreateMaterials;
