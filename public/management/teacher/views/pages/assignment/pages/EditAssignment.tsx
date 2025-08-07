import React, { useState, useEffect, useRef } from 'react';
import { anyObject } from '../../../../common_types/object';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import BackButton from './BackButton';
import InputImage, { InputImageRef } from './InputImage';

export interface Props {}

const EditAssignment: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>({});
    const [sections, setSections] = useState<any>([]);
    const [classes, setClasses] = useState<any>([]);
    const [subjects, setSubjects] = useState<any>([]);
    const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
    const inputImageRef = useRef<InputImageRef>(null);
    const [loading, setLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState('');
    const [classID, setClassID] = useState('');
    const [sectionID, setSectionID] = useState(''); // Add this state
    const [subjectID, setSubjectID] = useState(''); // Add this state
    const { id } = useParams();

    // Fetch assignment data for editing
    const fetchAssignmentData = async () => {
        try {
            const response = await axios.get(`/api/v1/assignments/${id}`);
            const assignmentData = response.data.data;
            console.log('Assignment Data:', assignmentData); // Debug log
            setData(assignmentData);
            setStartDate(moment(assignmentData.deadline).format('YYYY-MM-DD'));

            // Try different possible field names
            const classId =
                assignmentData.branch_class_id ||
                assignmentData.class_id ||
                assignmentData.branch_class?.id;
            const sectionId =
                assignmentData.branch_class_section_id ||
                assignmentData.section_id ||
                assignmentData.branch_class_section?.id;
            const subjectId =
                assignmentData.branch_class_subject_id ||
                assignmentData.subject_id ||
                assignmentData.branch_class_subject?.id;

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
            console.error('Error fetching assignment:', error);
            setError(error);
            setLoading(false);
        }
    };

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

    useEffect(() => {
        fetchClasses();
        fetchAssignmentData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        formData.append('_method', 'PUT'); // For Laravel PUT method

        try {
            const response = await axios.post(
                `/api/v1/assignments/update/${id}`,
                formData,
            );
            (window as any).toaster('Assignment Updated Successfully');
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

    useEffect(() => {
        const start = moment(startDate);
        const today = moment().startOf('day');

        if (start.isBefore(today)) {
            setErrorMessage('Date cannot be before today.');
            return;
        }

        setErrorMessage('');
    }, [startDate]);

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    if (loading) {
        return (
            <div className="admin_dashboard">
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    Loading assignment data...
                </div>
            </div>
        );
    }

    return (
        <div className="admin_dashboard">
            <h3>Edit Assignment</h3>
            <BackButton></BackButton>
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
                            {/* Debug info */}
                            {/* <small style={{color: 'blue'}}>
                                Current sectionID: {sectionID}, Sections loaded: {sections.length}
                            </small> */}
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
                            {/* Debug info */}
                            {/* <small style={{ color: 'green' }}>
                                Current subjectID: {subjectID}, Subjects loaded: {subjects.length}
                            </small> */}
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
                            <InputImage
                                ref={inputImageRef}
                                label=""
                                name="attachment"
                                defalut_preview={data.attachment || ''}
                            />
                        </div>
                    </div>

                    <div className="form-group form-horizontal">
                        <label>
                            Mark <span className="valid_star">*</span>
                        </label>
                        <div className="form_elements">
                            <input
                                type="number"
                                name="mark"
                                defaultValue={data.mark}
                            />
                        </div>
                    </div>

                    <div className="form-group form-horizontal">
                        <label>
                            Deadline <span className="valid_star">*</span>
                        </label>
                        <div className="form_elements">
                            <input
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                name="deadline"
                            />
                            {errorMessage && (
                                <div
                                    style={{
                                        color: 'red',
                                        marginTop: '5px',
                                    }}
                                >
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-group student_submit form-horizontal">
                        <label></label>
                        <div className="form_elements">
                            <button
                                type="submit"
                                className={`btn btn-outline-info btn_1 ${errorMessage ? 'btn_error' : ''}`}
                                disabled={!!errorMessage}
                            >
                                Update Assignment
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAssignment;
