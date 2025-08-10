import React, { useState, useEffect, useRef } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import BackButton from './BackButton';
import InputImage, { InputImageRef } from './InputImage';
export interface Props {}

const MaterialEdit: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>({});
    const [sections, setSections] = useState<any>([]);
    const [classes, setClasses] = useState<any>([]);
    const [subjects, setSubjects] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [classID, setClassID] = useState('');
    const [sectionID, setSectionID] = useState('');
    const [subjectID, setSubjectID] = useState('');
    const selectRef = useRef<HTMLSelectElement>(null);
    const selectRef2 = useRef<HTMLSelectElement>(null);
    const inputImageRef = useRef<InputImageRef>(null);
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/v1/branch-class-resources/${id}`,
            );
            const materialData = response.data.data;
            console.log('Material Data:', materialData); // Debug log
            setData(materialData);

            // Try different possible field names for class, section, subject IDs
            const classId =
                materialData.branch_class_id ||
                materialData.class_id ||
                materialData.branch_class?.id;
            const sectionId =
                materialData.branch_class_section_id ||
                materialData.section_id ||
                materialData.branch_class_section?.id;
            const subjectId =
                materialData.branch_class_subject_id ||
                materialData.subject_id ||
                materialData.branch_class_subject?.id;

            console.log('IDs found:', { classId, sectionId, subjectId }); // Debug log

            // Set class ID first
            if (classId) {
                setClassID(classId.toString());

                // Fetch sections for the class and wait for completion
                await fetchSectionsForClass(classId.toString());

                // Set section ID after sections are loaded
                if (sectionId) {
                    // Small delay to ensure sections state is updated
                    setTimeout(() => {
                        setSectionID(sectionId.toString());
                        console.log('Section ID set to:', sectionId); // Debug log
                    }, 100);

                    // Fetch subjects for the section and wait for completion
                    await fetchSubjectsForSection(
                        sectionId.toString(),
                        classId.toString(),
                    );

                    // Set subject ID after subjects are loaded
                    if (subjectId) {
                        // Small delay to ensure subjects state is updated
                        setTimeout(() => {
                            setSubjectID(subjectId.toString());
                            console.log('Subject ID set to:', subjectId); // Debug log
                        }, 200);
                    }
                }
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching material:', error);
            setError(error);
            setLoading(false);
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

    const fetchSectionsForClass = async (classId: string) => {
        try {
            const response = await axios.get(
                `/api/v1/branch-class-sections/class-wise/${classId}`,
            );
            console.log('Sections data:', response.data.data); // Debug log
            setSections(response.data.data);
        } catch (error) {
            console.error('Error fetching sections:', error);
            setError(error);
        }
    };

    const fetchSubjectsForSection = async (
        sectionId: string,
        classId: string,
    ) => {
        try {
            const response = await axios.get(
                `/api/v1/branch-classes/class-wise-subject/${classId}?section_id=${sectionId}`,
            );
            console.log('Subjects data:', response.data.data); // Debug log
            setSubjects(response.data.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
            setError(error);
        }
    };

    async function init_data() {
        await fetchClasses();
        await fetchData();
    }

    useEffect(() => {
        init_data();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        let formData = new FormData(e.target);
        console.log('formData', formData);
        try {
            const response = await axios.post(
                '/api/v1/branch-class-resources/update',
                formData,
            );
            (window as any).toaster('Materials Updated');
            // here use toastar
            // setData(response.data.data.data);
            // setTotalIncome(response.data.data.data2);
        } catch (error) {
            setError(error);
        }
    };

    const handleChange2 = async (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        let classId = event.target.value;
        setClassID(classId);

        // Clear sections and subjects when class changes
        setSections([]);
        setSubjects([]);
        setSectionID(''); // Clear section selection
        setSubjectID(''); // Clear subject selection

        if (classId) {
            await fetchSectionsForClass(classId);
        }
    };

    const handleChange = async (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        let sectionId = event.target.value;
        setSectionID(sectionId); // Update section ID state

        // Clear subjects when section changes
        setSubjects([]);
        setSubjectID(''); // Clear subject selection

        if (sectionId && classID) {
            await fetchSubjectsForSection(sectionId, classID);
        }
    };

    const handleSubjectChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setSubjectID(event.target.value); // Update subject ID state
    };

    if (loading) {
        return (
            <div className="admin_dashboard">
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    Loading material data...
                </div>
            </div>
        );
    }
    return (
        <div className="admin_dashboard">
            <BackButton></BackButton>
            <h3>Edit</h3>
            <div className="content_body">
                <form onSubmit={handleSubmit} className="form_600 mx-auto pt-3">
                    <div className="form-group form-horizontal">
                        <label>
                            Class <span className="valid_star">*</span>
                        </label>
                        <div className="form_elements">
                            <select
                                name="class"
                                id=""
                                value={classID} // This will show the selected class
                                onChange={handleChange2}
                            >
                                <option value="">Select class</option>
                                {classes.map((i, index) => {
                                    return (
                                        <option key={index} value={i.id}>
                                            {i.name}
                                        </option>
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
                        <label>
                            Section <span className="valid_star">*</span>
                        </label>
                        <div className="form_elements">
                            <select
                                name="section"
                                onChange={handleChange}
                                value={sectionID} // Use sectionID state instead of data
                            >
                                <option value="">Select Section</option>
                                {sections.map((i, index) => {
                                    return (
                                        <option key={index} value={i.id}>
                                            {i.title}
                                        </option>
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
                            <select
                                name="subject"
                                value={subjectID} // Use subjectID state instead of data
                                onChange={handleSubjectChange} // Use new handler
                            >
                                <option value="">Select subject</option>
                                {subjects.map((i, index) => {
                                    return (
                                        <option key={index} value={i.id}>
                                            {i.name}
                                        </option>
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
                        <label>
                            Attachment <span className="valid_star">*</span>
                        </label>
                        <div className="form_elements">
                            {/* <input type="file" name="attachment" /> */}
                            {data?.attachment && (
                                <InputImage
                                    ref={inputImageRef}
                                    label=""
                                    name="attachment"
                                    defalut_preview={data.attachment}
                                />
                            )}
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
