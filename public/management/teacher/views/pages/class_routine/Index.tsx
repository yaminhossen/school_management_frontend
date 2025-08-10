import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Add custom styles for hierarchical layout
const styles = `
    .class_container {
        margin-bottom: 3rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem;
        background: #110909ff !important;
    }
    
    .class_title {
        color: #e0e0e0ff !important;
        background: #1a1b1bff;
        padding: 0.8rem;
        margin: 0 0 1.5rem 0;
        border-radius: 5px;
        border-left: 4px solid #3498db;
        font-size: 1.4rem;
        font-weight: bold;
    }
    
    .section_container {
        margin-bottom: 2rem;
        background: black;
        border-radius: 5px;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(240, 240, 240, 0.1);
    }
    
    .section_title {
        color: #27ae60;
        background: #292c29ff;
        padding: 0.6rem;
        margin: 0 0 1rem 0;
        border-radius: 3px;
        border-left: 3px solid #27ae60;
        font-size: 1.2rem;
        font-weight: 600;
    }
    
    .class_schedule_content .table_area {
        margin-bottom: 0;
    }
    
`;

// Define interfaces for the hierarchical JSON data structure
interface RoutineSlot {
    time: string;
    room: string;
    day_name: string;
    day_no?: number;
}

interface Subject {
    subject_id: number;
    subject_name: string;
    subject_code: string;
    routine: RoutineSlot[]; // Array of 7 days
}

interface Section {
    section_id: number;
    section_title: string;
    subjects: Subject[];
}

interface ClassData {
    class_id: number;
    class_name: string;
    sections: Section[];
}

interface Props {}

const ClassRoutine: React.FC<Props> = () => {
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<ClassData[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get<{ data: ClassData[] }>(
                '/api/v1/branch-class-routine-day-times/teacher-wise-class-routine',
            );
            setData(response.data.data);
        } catch (error) {
            setError(error as Error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Function to format time from 24-hour to 12-hour format
    const formatTime = (timeString: string): string => {
        if (!timeString || timeString === ' - ') return '';

        const times = timeString.split(' - ');
        const formatSingleTime = (time: string) => {
            const [hours, minutes] = time.split(':');
            const hour = parseInt(hours, 10);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const formattedHour = hour % 12 || 12;
            return `${formattedHour}:${minutes} ${ampm}`;
        };

        return times.map(formatSingleTime).join(' - ');
    };

    // Days of the week for table headers
    const days: string[] = [
        'saturday',
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
    ];
    console.log('data', data);

    return (
        <div className="admin_dashboard">
            <style>{styles}</style>
            <div className="class_schedule_content">
                {data.map((classData) => (
                    <div key={classData.class_id} className="class_container">
                        <h2 className="class_title">
                            Class: {classData.class_name}
                        </h2>

                        {classData.sections.map((section) => (
                            <div
                                key={section.section_id}
                                className="section_container"
                            >
                                <h3 className="section_title">
                                    Section: {section.section_title}
                                </h3>

                                <table className="table_area">
                                    <thead>
                                        <tr className="table_head_area">
                                            <th className="head_subject_title">
                                                Subjects
                                            </th>
                                            {days.map((day) => (
                                                <th
                                                    className="head_day_time_room_title"
                                                    style={{ width: 'unset' }}
                                                    key={day}
                                                >
                                                    <span className="head_day_time_room head_day">
                                                        {day}
                                                    </span>
                                                    <span className="head_day_time_room head_time_and_room">
                                                        <span className="head_time">
                                                            time
                                                        </span>
                                                        <span className="head_silash">
                                                            /
                                                        </span>
                                                        <span className="head_room">
                                                            room
                                                        </span>
                                                    </span>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {section.subjects.map((subject) => (
                                            <tr
                                                className="table_body"
                                                key={subject.subject_id}
                                            >
                                                <td className="subject">
                                                    {subject.subject_name} (
                                                    {subject.subject_code})
                                                </td>
                                                {subject.routine.map(
                                                    (routineSlot, dayIndex) => (
                                                        <td
                                                            className="class_time_and_room_content"
                                                            key={dayIndex}
                                                        >
                                                            {routineSlot.time &&
                                                            routineSlot.time !==
                                                                ' - ' ? (
                                                                <span className="class_time_and_room">
                                                                    <span className="time_rooom class_time">
                                                                        {formatTime(
                                                                            routineSlot.time,
                                                                        )}
                                                                    </span>
                                                                    <span className="time_rooom class_room">
                                                                        <span className="room_title">
                                                                            room
                                                                        </span>
                                                                        <span className="dash_title">
                                                                            -
                                                                        </span>
                                                                        <span className="room_number">
                                                                            {
                                                                                routineSlot.room
                                                                            }
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            ) : null}
                                                        </td>
                                                    ),
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassRoutine;
