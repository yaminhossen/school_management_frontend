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
    const handlePrint = () => {
        const content = document.querySelector('.content_body'); // Get the content
        const printWindow = window.open('', '', 'width=900,height=700'); // Create a new print window
        // Check if printWindow is null
        if (printWindow) {
            printWindow.document.write(
                '<html><head><title>Print</title></head><body>',
            );
            printWindow.document.write(content?.innerHTML || ''); // Inject the content into the new window
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        } else {
            console.error('Failed to open print window.');
        }
    };
    return (
        <div className="admin_dashboard">
            <h3 className="table_heading">{convertUnderscoreToSpace(title)}</h3>
            {/* <h3 className="table_heading student_semister">Result History</h3> */}

            <button
                onClick={handlePrint}
                className="btn btn-sm btn-outline-info"
            >
                Print Page
            </button>
            <div className="content_body ">
                <div className="data_list mb-4">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>id</th>
                                    <th>Subject</th>
                                    <th>Marks</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {data?.map(
                                    (i: { [key: string]: any }, index) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{index + 1}</td>
                                                <td>{i?.subject?.name}</td>
                                                <td>{i?.obtained_mark}</td>
                                                <td>
                                                    {getGrade(i.obtained_mark)}
                                                </td>
                                            </tr>
                                        );
                                    },
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermResult;
