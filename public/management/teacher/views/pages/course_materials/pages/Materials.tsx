import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const Materials: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            chapter: 'Lecture1',
            topic: 'Lecture1',
            subject: 'Bangla',
            class: 'Six',
            roll: '101',
        },
        {
            id: 2,
            chapter: 'Lecture2',
            topic: 'Lecture2',
            subject: 'Bangla',
            class: 'Six',
            roll: '102',
        },
        {
            id: 3,
            chapter: 'Lecture3',
            topic: 'Lecture3',
            subject: 'Bangla',
            class: 'Six',
            roll: '103',
        },
    ];

    return (
        <div className="admin_dashboard">
            <div>
                <Link
                    className="btn btn-sm btn-outline-info mb-1"
                    to="/course-materials/create-materials"
                >
                    Add New
                </Link>
            </div>
            <div className="content_body">
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Class</th>
                                    <th>Subject</th>
                                    <th>Chapter</th>
                                    <th>Topic</th>
                                    <th>Course Materials</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.class}</td>
                                            <td>{i.subject}</td>
                                            <td>{i.chapter}</td>
                                            <td>{i.topic}</td>
                                            <td>
                                                <Link
                                                    className="btn btn-sm btn-outline-info mr-1"
                                                    to="/course-materials/details"
                                                >
                                                    <div className="download_btn">
                                                        <span className="download_title material-symbols-outlined">
                                                            download
                                                        </span>
                                                        <span className="">
                                                            Download
                                                        </span>
                                                    </div>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Materials;
