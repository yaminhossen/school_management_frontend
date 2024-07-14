import React from 'react';
import { Link } from 'react-router-dom';
import { app_config } from '../../../../../../src/configs/app.config';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            title: 'Principle',
            number: '01897878761',
        },
        {
            id: 2,
            title: 'Vice principle',
            number: '01897878762',
        },
        {
            id: 3,
            title: 'Office assistant',
            number: '01897878763',
        },
        {
            id: 3,
            title: 'Teacher',
            number: '01897878764',
        },
    ];
    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serial</th>
                                    <th>Title</th>
                                    <th>Number</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.title}</td>
                                            <td>{i.number}</td>
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

export default Index;
