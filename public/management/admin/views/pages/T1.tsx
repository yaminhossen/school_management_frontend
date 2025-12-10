import React, { useState, useEffect } from 'react';
import { anyObject } from '../../common_types/object';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    ArcElement,
    Legend,
);

export interface Props {}

const T1: React.FC<Props> = (props: Props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState();
    const [accdemicCalander, setAccademicCalander] = useState<any[]>([]);
    const [totalClassWiseStudents, setTotalClassWiseStudents] = useState<any[]>(
        [],
    );
    const [studentGender, setStudentGender] = useState<any[]>([]);
    const [totalStudents, setTotalStudents] = useState(0);
    const [bloodGroup, setBloodGroup] = useState<any[]>([]);
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [totalStaffs, setTotalStaffs] = useState(0);
    const [todayIncome, setTodayIncome] = useState(0);
    const [bankTotal, setBankTotal] = useState(0);
    const [handCash, setHandCash] = useState(0);
    const [runningMonthIncome, setRunningMonthIncome] = useState(0);
    const [runningMonthExpense, setRunningMonthExpense] = useState(0);
    const [currentBalance, setCurrentBalance] = useState(0);
    const [todayExpense, setTodayExpense] = useState(0);
    // console.log(accdemicCalander);

    const [selectedDate, setSelectedDate] = useState(
        moment().format('YYYY-MM-DD'),
    ); // Default to today's date

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value); // Update the selected date
    };

    // Dynamically format month and year based on the selected date
    const selectedMoment = moment(selectedDate);
    const month = selectedMoment.format('MMM').toLowerCase(); // e.g., "jan"
    const year = selectedMoment.format('YYYY'); // e.g., "2025"
    const formattedDate = `${month}-${year}`;

    // Fetch notice count
    const fetchClassWiseStudents = async () => {
        try {
            const response = await axios.get(
                '/api/v1/user-students/all-class-admin',
            );
            setTotalClassWiseStudents(response.data?.data);
        } catch (error) {
            console.error('Error fetching notice count:', error);
            setError(error as any);
        }
    };

    // Fetch notice count
    const fetchTotalStudents = async () => {
        try {
            const response = await axios.get(
                '/api/v1/user-students/total-students',
            );
            setTotalStudents(response.data?.data?.total_students);
            setBloodGroup(response.data?.data?.blood_group);
            setStudentGender(response.data?.data?.gender);
        } catch (error) {
            console.error('Error fetching notice count:', error);
            setError(error as any);
        }
    };

    // Fetch notice count
    const fetchTotalTeachers = async () => {
        try {
            const response = await axios.get(
                '/api/v1/user-teachers/total-teachers',
            );
            setTotalTeachers(response.data?.data?.total_teachers);
        } catch (error) {
            console.error('Error fetching notice count:', error);
            setError(error as any);
        }
    };

    // Fetch notice count
    const fetchTotalStaffs = async () => {
        try {
            const response = await axios.get(
                '/api/v1/user-staffs/total-staffs',
            );
            setTotalStaffs(response.data?.data?.total_staffs);
        } catch (error) {
            console.error('Error fetching notice count:', error);
            setError(error as any);
        }
    };
    // Fetch TODAY INCOME
    const fetchTodayIncome = async () => {
        try {
            const response = await axios.get(
                '/api/v1/account-logs/today-income',
            );
            setTodayIncome(response.data?.data?.amount);
        } catch (error) {
            console.error('Error fetching notice count:', error);
            setError(error as any);
        }
    };
    // Fetch Bank total INCOME
    const fetchBankTotal = async () => {
        try {
            const response = await axios.get('/api/v1/account-logs/bank-total');
            setBankTotal(response.data?.data?.balance);
        } catch (error) {
            console.error('Error fetching notice count:', error);
            setError(error as any);
        }
    };
    // Fetch TODAY INCOME
    const fetchHandCash = async () => {
        try {
            const response = await axios.get('/api/v1/account-logs/hand-cash');
            setHandCash(response.data?.data?.balance);
        } catch (error) {
            console.error('Error fetching notice count:', error);
            setError(error as any);
        }
    };
    // Fetch TODAY INCOME
    const fetchCurrentBalance = async () => {
        try {
            const response = await axios.get(
                '/api/v1/account-logs/current-balance',
            );
            setCurrentBalance(response.data?.data?.balance);
        } catch (error) {
            console.error('Error fetching notice count:', error);
            setError(error as any);
        }
    };
    // Fetch running month income
    const fetchRunningMonthIncome = async () => {
        try {
            const response = await axios.get(
                '/api/v1/account-logs/running-month-income',
            );
            setRunningMonthIncome(response.data?.data?.amount);
        } catch (error) {
            console.error('Error fetching notice count:', error);
            setError(error as any);
        }
    };
    // Fetch running month income
    const fetchRunningMonthExpense = async () => {
        try {
            const response = await axios.get(
                '/api/v1/account-logs/running-month-expense',
            );
            setRunningMonthExpense(response.data?.data?.amount);
        } catch (error) {
            console.error('Error fetching notice count:', error);
            setError(error as any);
        }
    };
    // Fetch Today Expense
    const fetchTodayExpense = async () => {
        try {
            const response = await axios.get(
                '/api/v1/account-logs/expense-today',
            );
            setTodayExpense(response.data?.data?.eamount);
        } catch (error) {
            console.error('Error fetching notice count:', error);
            setError(error as any);
        }
    };
    async function initdependancy() {
        await (fetchTotalStudents() as any);
        await (fetchClassWiseStudents() as any);
        await (fetchTotalTeachers() as any);
        await (fetchTotalStaffs() as any);
        await (fetchTodayIncome() as any);
        await (fetchRunningMonthIncome() as any);
        await (fetchRunningMonthExpense() as any);
        await (fetchCurrentBalance() as any);
        await (fetchBankTotal() as any);
        await (fetchHandCash() as any);
        await (fetchTodayExpense() as any);
    }

    useEffect(() => {
        initdependancy();
    }, []);

    // useEffect(() => {
    //     fetchNoticeCount();
    //     fetchTodayIncome();
    //     fetchTodayExpense();
    // }, []);
    console.log('class wise data', totalClassWiseStudents);
    let days = [
        'saturday',
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
    ];

    function dateFormate(date: string) {
        return moment(date).format('dddd').toLowerCase();
    }
    // console.log('date', dateFormate('2024-09-07T00:00:00.000Z'));

    function get_day_data(i, day) {
        if (dateFormate(i.date) === day) {
            return (
                <li className="absent">
                    <time dateTime="2022-02-02">{i.id}</time>
                    <div className="text-warning">
                        <i className="icon-close"></i>
                        <span className="event_title">Class Present</span>
                    </div>
                </li>
            );
        } else {
            return (
                <li className="absent">
                    <time dateTime="2022-02-02">{i.id}</time>
                </li>
            );
        }
    }

    const fetchAccedemicCalenderData = async () => {
        try {
            const response = await axios.post(
                '/api/v1/academic-calendars/get-academic-event-by-month',
                {
                    month: formattedDate,
                    // branch_id: 1,
                },
            );

            // Assuming setAccademicCalander is a state setter function
            setAccademicCalander(response.data.data);

            // Clear any previous errors
            setError(null);
        } catch (error) {
            console.error('Error fetching academic calendar data:', error);
            setError(error); // Assuming setError is a state setter for errors
        }
    };
    useEffect(() => {
        fetchAccedemicCalenderData();
    }, [selectedDate]);

    let array: any[][] = [];
    let count = 0;

    // Initialize the 2D array
    for (let i = 0; i < 5; i++) {
        array[i] = []; // Initialize each row

        for (let j = 0; j < 7; j++) {
            if (count < accdemicCalander.length) {
                array[i][j] = accdemicCalander[count] || { date: '', day: '' };
                count++;
            } else {
                continue;
            }
        }
    }
    return (
        <div className="custom_scroll">
            <div className="name my-3">
                <h2>Welcome to the Admin Panel</h2>
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
                        title: 'কারেন্ট ব্যালেন্স',
                        value: currentBalance,
                        icon: 'icon-wallet',
                        color: 'info',
                    },
                    {
                        title: 'আজকের ইনকাম',
                        value: todayIncome,
                        icon: 'icon-wallet',
                        color: 'success',
                    },
                    {
                        title: 'আজকের খরচ',
                        value: todayExpense,
                        icon: 'icon-bag',
                        color: 'danger',
                    },
                    {
                        title: 'এই মাসের ইনকাম',
                        value: runningMonthIncome,
                        icon: 'icon-briefcase',
                        color: 'success',
                    },
                    {
                        title: 'এই মাসের খরচ',
                        value: runningMonthExpense,
                        icon: 'icon-bag',
                        color: 'warning',
                    },
                    {
                        title: 'ব্যাঙ্ক ব্যালেন্স',
                        value: bankTotal,
                        icon: 'icon-credit-card',
                        color: 'primary',
                    },
                    {
                        title: 'হ্যান্ড ক্যাশ',
                        value: handCash,
                        icon: 'icon-wallet',
                        color: 'info',
                    },
                    {
                        title: 'মোট ছাত্রছাত্রী',
                        value: totalStudents,
                        icon: 'icon-user',
                        color: 'primary',
                    },
                    {
                        title: 'মোট শিক্ষক',
                        value: totalTeachers,
                        icon: 'icon-book',
                        color: 'success',
                    },
                    {
                        title: 'অন্যান্য স্টাফ',
                        value: totalStaffs,
                        icon: 'icon-user',
                        color: 'warning',
                    },
                    // {
                    //     title: 'টাস্ক',
                    //     // value: taskCount,
                    // },
                ].map((i) => {
                    return (
                        <div className="card w-100" data-intro="This is card">
                            <div className="business-top-widget card-body">
                                <h5 className="mb-2">{i.title}</h5>
                                <div className="media d-inline-flex">
                                    <div className="media-body">
                                        <h2 className="total-value m-0 counter">
                                            {/* {Math.round(Math.random() * 1000)} */}
                                            {i.value}
                                        </h2>
                                    </div>
                                    <i
                                        style={{ opacity: '.4' }}
                                        className={`${i.icon} font-${i.color} align-self-center`}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/*  */}
            {/* <div className="d-flex" style={{ gap: '20px', flexWrap: 'wrap' }}>
                <div className="card" style={{ flex: '1 1 48%', minWidth: '320px' }}>
                    <div className="card-header"></div> */}
            {/* Chart area start */}
            <div className="d-flex" style={{ gap: '20px', flexWrap: 'wrap' }}>
                <div
                    className="card"
                    style={{ flex: '1 1 30%', minWidth: '220px' }}
                >
                    <div className="card-body bar_chart">
                        <Bar
                            data={{
                                labels: totalClassWiseStudents.map(
                                    (item) => item.name,
                                ),
                                datasets: [
                                    {
                                        label: 'Number of Students',
                                        data: totalClassWiseStudents.map(
                                            (item) => item.count,
                                        ),
                                        backgroundColor:
                                            'rgba(75, 192, 192, 0.6)',
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: true,
                                plugins: {
                                    legend: {
                                        position: 'top' as const,
                                    },
                                    title: {
                                        display: true,
                                        text: 'Total Students per Class',
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            stepSize: 1,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
                {/* </div> */}
                {/* <div className="card mt-4"> */}
                <div
                    className="card"
                    style={{ flex: '1 1 30%', minWidth: '220px' }}
                >
                    <div className="card-body bar_chart">
                        <Pie
                            data={{
                                labels:
                                    studentGender && studentGender.length
                                        ? studentGender.map((g) => g.gender)
                                        : ['male', 'female', 'others'],
                                datasets: [
                                    {
                                        label: 'Students by Gender',
                                        data:
                                            studentGender &&
                                            studentGender.length
                                                ? studentGender.map(
                                                    (g) => g.count,
                                                )
                                                : [12, 9, 10],
                                        backgroundColor: [
                                            'rgba(241, 152, 180, 1)',
                                            'rgba(236, 236, 179, 1)',
                                            'rgba(44, 195, 203, 1)',
                                        ],
                                        borderColor: [
                                            'rgba(123, 235, 54, 1)',
                                            'rgba(182, 216, 185, 1)',
                                            'rgba(157, 255, 137, 1)',
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                            // height={150}
                        />
                    </div>
                </div>
                <div
                    className="card"
                    style={{ flex: '1 1 30%', minWidth: '220px' }}
                >
                    <div className="card-body bar_chart">
                        <Bar
                            data={{
                                labels: bloodGroup.map((item) => item.group),
                                datasets: [
                                    {
                                        label: 'Number of Students',
                                        data: bloodGroup.map(
                                            (item) => item.count,
                                        ),
                                        backgroundColor:
                                            'rgba(77, 75, 192, 0.6)',
                                        borderColor: 'rgba(63, 74, 169, 1)',
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: true,
                                plugins: {
                                    legend: {
                                        position: 'top' as const,
                                    },
                                    title: {
                                        display: true,
                                        text: 'Blood Group Distribution',
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            stepSize: 1,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
            {/* Chart area end */}
            {/* attendance calendar */}
            <div className="calendar_dashboard mt-4">
                <div className="card mx-auto">
                    <div className="card-header d-flex justify-content-between flex-wrap">
                        <h5>
                            <i className="icon-calendar me-2"></i>
                            Academic Calendar
                        </h5>
                        <h5>
                            {formattedDate}
                            <span className="ml-2">
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </span>
                        </h5>
                    </div>
                    <div className="card-body">
                        <ul>
                            {array.map((value, vIndex) =>
                                value.map((element, eIndex) => (
                                    <>
                                        {
                                            <li
                                                key={`${vIndex}- ${eIndex}`}
                                                className={`${element.day === 5 ? 'absent' : ''} || ${moment(element.date).isSame(moment(), 'day') ? 'today' : ''}`}
                                            >
                                                <time dateTime={element.date}>
                                                    {moment(
                                                        element.date,
                                                    ).format('D')}{' '}
                                                </time>
                                                {/* {element.day} */}
                                                {moment(element.date).format(
                                                    'dddd',
                                                )}
                                                <div
                                                    className={`text-${element.events?.length ? 'warning' : 'info'}`}
                                                >
                                                    {element.events?.map(
                                                        (ev, i) => (
                                                            <div
                                                                key={i}
                                                                className="event"
                                                            >
                                                                <i className="icon-check-box"></i>
                                                                <span className="event_title">
                                                                    {
                                                                        ev.event_name
                                                                    }
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </li>
                                        }
                                    </>
                                )),
                            )}
                        </ul>
                        {/* <ul>
                            {days.map((index, day) => get_day_data(index, day))}
                        </ul> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default T1;
