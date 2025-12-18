import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props {}

const T1: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalBranch, setTotalBranch] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    // console.log(accdemicCalander);

    const [selectedDate, setSelectedDate] = useState(
        moment().format('YYYY-MM-DD'),
    ); // Default to today's date

    // Dynamically format month and year based on the selected date
    const selectedMoment = moment(selectedDate);
    const month = selectedMoment.format('MMM').toLowerCase(); // e.g., "jan"
    const year = selectedMoment.format('YYYY'); // e.g., "2025"

    // Fetch notice count
    const fetchTotalStudents = async () => {
        try {
            const response = await axios.get(
                '/api/v1/user-students/all-branch-students',
            );
            setTotalStudents(response.data?.data?.all_branch_students);
        } catch (error) {
            console.error('Error fetching notice count:', error);
            setError(error);
        }
    };

    // Fetch notice count
    const fetchTotalBranch = async () => {
        try {
            const response = await axios.get('/api/v1/branches/branch-all');
            setTotalBranch(response.data?.data?.length);
        } catch (error) {
            console.error('Error fetching notice count:', error);
            setError(error);
        }
    };

    // Fetch notice count
    const fetchTotalAdmins = async () => {
        try {
            const response = await axios.get(
                '/api/v1/admin-users/all-branch-admins',
            );
            setTotalAdmins(response.data?.data?.all_branch_admins);
        } catch (error) {
            console.error('Error fetching notice count:', error);
            setError(error);
        }
    };
    async function initdependancy() {
        await (fetchTotalStudents() as any);
        await (fetchTotalAdmins() as any);
        await (fetchTotalBranch() as any);
    }

    useEffect(() => {
        initdependancy();
    }, []);

    return (
        <div className="custom_scroll">
            <div className="name my-3">
                <h2>Welcome to the Super Admin Panel</h2>
            </div>
            {/* analytics */}
            <div
                className="mt-4"
                style={{
                    display: 'grid',
                    gap: '30px',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr)',
                }}
            >
                {[
                    {
                        title: 'টোটাল ব্রাঞ্চ',
                        value: totalBranch,
                    },
                    {
                        title: 'মোট ছাত্রছাত্রী',
                        value: totalStudents,
                    },
                    {
                        title: 'টোটাল এডমিন',
                        value: totalAdmins,
                    },
                ].map((i) => {
                    return (
                        <div className="card w-100" data-intro="This is card">
                            <div className="business-top-widget card-body">
                                <h5 className="mb-2">{i.title}</h5>
                                <div className="media d-inline-flex">
                                    <div className="media-body">
                                        <h2 className="total-value m-0 counter">
                                            {i.value}
                                        </h2>
                                    </div>
                                    <i
                                        style={{ opacity: '.4' }}
                                        className="icon-bar-chart font-info align-self-center"
                                    ></i>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* attendance calendar */}
        </div>
    );
};

export default T1;
