import moment from 'moment/moment';
import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const SingleStudent: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const state: data[] = [
        {
            id: 1,
            name: 'Shahin',
            class: 'Six',
            roll: '101',
            cgpa: '3.5',
            present: '90%',
            total_absance: '10',
        },
        {
            id: 2,
            name: 'Tamim',
            class: 'Six',
            roll: '101',
            cgpa: '3.5',
            present: '90%',
            total_absance: '10',
        },
        {
            id: 3,
            name: 'Ramim',
            class: 'Six',
            roll: '101',
            cgpa: '3.5',
            present: '90%',
            total_absance: '10',
        },
    ];

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <div className="single_student_details">
                    <div className="">
                        <h4>Basic information</h4>
                        <div className="basic_info mb-4">
                            <table className="table text-nowrap student_table">
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {state.item?.name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {state.item?.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Phone number</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {state.item?.phone_number}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="table text-nowrap student_table ml-2">
                                <tbody>
                                    <tr>
                                        <td>Whatsapp number</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {state.item?.whatsapp_number}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {state.item?.student_info?.gender}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Stutas</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {state.item?.status}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <h4>Admission information</h4>
                        <div className="basic_info mb-4 ">
                            <table className="table text-nowrap student_table">
                                <tbody>
                                    <tr>
                                        <td>Branch</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            Uttora
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Student Id</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.student_id
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Roll no</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {state.item?.student_info?.role_no}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Addmission date</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {moment(
                                                state.item?.student_info
                                                    ?.admission_date,
                                            ).format('YYYY-MM-DD')}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="table text-nowrap student_table ml-2">
                                <tbody>
                                    <tr>
                                        <td>Class</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info?.class
                                                    ?.name
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Shift</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.student_shift?.title
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Student Category</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.student_category
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Section</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.student_section?.title
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <h4>Information</h4>
                        <div className="basic_info mb-4 ">
                            <table className="table text-nowrap student_table">
                                <tbody>
                                    <tr>
                                        <td>Present Address</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.present_address
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Permanent Address</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.permanent_address
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Religion</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {state.item?.student_info?.religion}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>City</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {state.item?.student_info?.city}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Telegram Id</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.telegram_id
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Blood Group</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.blood_group
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Student Expire Date</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {moment(
                                                state.item?.student_info
                                                    ?.student_expire_date,
                                            ).format('YYYY-MM-DD')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Height</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {state.item?.student_info?.height}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Weight</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {state.item?.student_info?.weight}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>As on Date</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {moment(
                                                state.item?.student_info
                                                    ?.as_on_date,
                                            ).format('YYYY-MM-DD')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Familly Information</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.family_information
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Shibling Information</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.shibling_information
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Living House type</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.living_house_type
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="table text-nowrap student_table ml-2">
                                <tbody>
                                    <tr>
                                        <td>Nationality</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.nationality
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Division</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {state.item?.student_info?.division}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ID No</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.student_id
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.present_address
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Post code</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.post_code
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Country</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {state.item?.student_info?.country}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Medical Condition</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.medical_condition
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Current Medication</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.current_medications
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Telegram Name</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.telegram_name
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Student House type</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {
                                                state.item?.student_info
                                                    ?.student_house
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Birth Cirtificate</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {/* {
                                                    state.item?.student_info
                                                        ?.birth_certificate
                                                } */}
                                            <a
                                                href={
                                                    state.item?.student_info
                                                        ?.birth_certificate
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Show cirtificate
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>National ID</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {/* {
                                                    state.item?.student_info
                                                        ?.birth_certificate
                                                } */}
                                            <a
                                                href={
                                                    state.item?.student_info
                                                        ?.national_id
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Show NID
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Cast</td>
                                        <td>:</td>
                                        <td className="font-medium text-dark-medium">
                                            {state.item?.student_info?.cast}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Name</th>
                                    <th>Roll</th>
                                    <th>Class</th>
                                    <th>CGPA</th>
                                    <th>Present</th>
                                    <th>Total Absance</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.name}</td>
                                            <td>{i.roll}</td>
                                            <td>{i.class}</td>
                                            <td>{i.cgpa}</td>
                                            <td>{i.present}</td>
                                            <td>{i.total_absance}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default SingleStudent;
