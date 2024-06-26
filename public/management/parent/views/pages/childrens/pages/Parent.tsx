import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const Parent: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            name: 'Abdullah al Mamun',
            relation: 'father',
            contact: '01646589574',
        },
        {
            id: 1,
            name: 'Sayma khatun',
            relation: 'mother',
            contact: '016465892374',
        },
        {
            id: 1,
            name: 'Abdullah al sabit',
            relation: 'brother',
            contact: '0145896327',
        },
    ];

    return (
        <div className="admin_dashboard">
            <h3 className="table_heading">Parent</h3>
            <div className="content_body">
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>SI</th>
                                    <th>Name</th>
                                    <th>Relation</th>
                                    <th>Contact</th>
                                </tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i: { [key: string]: any }) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td>{i.id}</td>
                                            <td>{i.name}</td>
                                            <td>{i.relation}</td>
                                            <td>{i.contact}</td>
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

export default Parent;
