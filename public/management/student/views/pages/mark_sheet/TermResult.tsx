import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../common_types/object';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const TermResult: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [data, setData] = useState<any>([]);
    const { termid, classid } = useParams();
    console.log('query params', termid, classid);

    useEffect(() => {
        // Function to fetch data
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/v1/exam-student-marks/exam-wise/${termid}/${classid}`,
            );
            let newdata = Object.values(response.data.data)[0];
            setData(newdata);
            setTitle(Object.keys(response.data.data)[0]);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    function getGrade(score) {
        if (score >= 30 && score <= 39) {
            return 'D';
        } else if (score >= 40 && score <= 49) {
            return 'C';
        } else if (score >= 50 && score <= 59) {
            return 'B';
        } else if (score >= 60 && score <= 69) {
            return 'A-';
        } else if (score >= 70 && score <= 79) {
            return 'A';
        } else if (score >= 80 && score <= 100) {
            return 'A+';
        } else if (score < 30) {
            return 'F';
        } else {
            return 'Invalid score'; // Handle scores outside the valid range
        }
    }
    function convertUnderscoreToSpace(str: string): string {
        return str.replace(/_/g, ' ');
    }
    // Handle the print functionality
    function printPage() {
        window.print();
    }

    return (
        <div className="admin_dashboard">
            <h3 className="table_heading">{convertUnderscoreToSpace(title)}</h3>
            {/* <h3 className="table_heading student_semister">Result History</h3> */}
            <button id="printButton" onClick={printPage}>
                Print
            </button>

            <div className="content_body ">
                <div className="data_list mb-4">
                    <div className="table_responsive mark_sheet">
                        <table className="outer-table">
                            <tr>
                                <td className="top-cell">
                                    <h1>NURUL HIQMAH MODEL MADRASA</h1>
                                </td>
                            </tr>
                            <tr className="middle_table">
                                <td style={{ padding: 0 }}>
                                    <table className="inner-table">
                                        <tr>
                                            <td className="side-cell">
                                                <div className="student_image">
                                                    <img
                                                        src="/assets/dashboard_uni/1.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                            </td>
                                            <td className="middle-cell">
                                                <div>
                                                    <p>Sayadpur, Rangpur</p>
                                                    <div className="logo_image">
                                                        <img
                                                            src="/assets/dashboard_uni/logo1.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <h3>
                                                        {/* <u> */}
                                                        ACADEMIC TRANSCRIPT
                                                        {/* </u> */}
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="side-cell">
                                                <table className="grade_sheet">
                                                    <thead>
                                                        <tr>
                                                            <th>Range</th>
                                                            <th>Grade</th>
                                                            <th>GPA</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>80-100</td>
                                                            <td>A+</td>
                                                            <td>5.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>70-79</td>
                                                            <td>A</td>
                                                            <td>4.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>60-69</td>
                                                            <td>A-</td>
                                                            <td>3.5</td>
                                                        </tr>
                                                        <tr>
                                                            <td>50-59</td>
                                                            <td>B</td>
                                                            <td>3.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>40-49</td>
                                                            <td>C</td>
                                                            <td>2.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>33-39</td>
                                                            <td>D</td>
                                                            <td>1.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>00-32</td>
                                                            <td>F</td>
                                                            <td>0.0</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: 0 }}>
                                    <table className="inner-table">
                                        <tr>
                                            <td className="bottom-left">
                                                <table className="result_table">
                                                    <tbody>
                                                        <tr>
                                                            <td>Branch</td>
                                                            <td>:</td>
                                                            <td className="font-medium text-dark-medium">
                                                                Uttora
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Admission no
                                                            </td>
                                                            <td>:</td>
                                                            <td className="font-medium text-dark-medium">
                                                                13lsjdf
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Roll no</td>
                                                            <td>:</td>
                                                            <td className="font-medium text-dark-medium">
                                                                sdf2323234
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Date</td>
                                                            <td>:</td>
                                                            <td className="font-medium text-dark-medium">
                                                                {moment(
                                                                    data
                                                                        ?.student_info
                                                                        ?.admission_date,
                                                                ).format(
                                                                    'YYYY-MM-DD',
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td className="bottom-right">
                                                <table className="result_table2">
                                                    <tbody>
                                                        <tr>
                                                            <td>Branch</td>
                                                            <td>:</td>
                                                            <td className="font-medium text-dark-medium">
                                                                Uttora
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Admission no
                                                            </td>
                                                            <td>:</td>
                                                            <td className="font-medium text-dark-medium">
                                                                13lsjdf
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Admission no
                                                            </td>
                                                            <td>:</td>
                                                            <td className="font-medium text-dark-medium">
                                                                13lsjdf
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <table className="second_table">
                            <thead>
                                <tr>
                                    <th></th>
                                    {/* <th>id</th> */}
                                    <th>Subject</th>
                                    <th>Marks</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {data?.map(
                                    (i: { [key: string]: any }, index) => {
                                        return (
                                            <tr className="grade_table">
                                                <td></td>
                                                {/* <td>{index + 1}</td> */}
                                                <td>{i?.subject?.name}</td>
                                                <td>{i?.obtained_mark}</td>
                                                <td>
                                                    {getGrade(i.obtained_mark)}
                                                </td>
                                            </tr>
                                        );
                                    },
                                )}
                                <tr className="grade_table2">
                                    <td></td>
                                    <td>RESULT :</td>
                                    <td>400</td>
                                    <td>A</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermResult;
