import axios from 'axios';
import React, { useEffect, useState } from 'react';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    interface Attendance {
        student_id: number;
        year: number;
        months: {
            month: string;
            days: {
                status: boolean;
                day: number;
                date: string;
                attendance_status: string;
            }[];
        }[];
    }

    const [attendence, setAttendence] = useState<Attendance[]>([]);

    const fetchAttendenceData = async () => {
        try {
            const response = await axios.get(
                '/api/v1/student-attendances/get-full-year-attendence',
            );
            setAttendence(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAttendenceData();
    }, []);
    if (!attendence || attendence.length === 0) {
        return (
            <div className="admin_dashboard">
                <h3 className="table_heading">
                    You Have No Attendance Data Till Now
                </h3>
            </div>
        );
    }

    return (
        <div className="admin_dashboard">
            <h3 className="table_heading"></h3>
            <div className="content_body">
                <div className="data_list">
                    <table className="table">
                        {attendence.map((item, index) => (
                            <React.Fragment key={index}>
                                <thead>
                                    <h2>{item.student_id}</h2>
                                    <h4>{item.year}</h4>
                                </thead>
                                <thead>
                                    <tr>
                                        <th className="check_yes">Month</th>
                                        {[...Array(31).keys()].map((day) => (
                                            <th
                                                key={day + 1}
                                                className="check_yes"
                                            >
                                                {day + 1}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.months.map((m, mIndex) => (
                                        <tr key={mIndex}>
                                            <td className="check_yes">
                                                {m.month}
                                            </td>

                                            {m.days.map((d, dIndex) => (
                                                <td key={dIndex}>
                                                    {d.status ? (
                                                        <span className="">
                                                            <i className="fa fa-check check_yes"></i>
                                                        </span>
                                                    ) : (
                                                        <span className="">
                                                            <i className="fa fa-times check_cross"></i>
                                                        </span>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </React.Fragment>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Index;
