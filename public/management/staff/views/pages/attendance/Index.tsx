import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const Index: React.FC<Props> = (props: Props) => {
    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            month: 'Jan',
            day_1: 'yes',
            day_2: 'yes',
            day_3: 'yes',
            day_4: 'yes',
            day_5: 'yes',
            day_6: 'yes',
            day_7: 'yes',
            day_8: 'yes',
            day_9: 'yes',
            day_10: 'yes',
            day_11: 'yes',
            day_12: 'yes',
            day_13: 'yes',
            day_14: 'yes',
            day_15: 'yes',
            day_16: 'yes',
            day_17: 'yes',
            day_18: 'yes',
            day_19: 'yes',
            day_20: 'yes',
            day_21: 'yes',
            day_22: 'yes',
            day_23: 'yes',
            day_24: 'yes',
            day_25: 'yes',
            day_26: 'yes',
            day_27: 'yes',
            day_28: 'yes',
            day_29: 'yes',
            day_30: 'yes',
            day_31: 'yes',
        },
        {
            id: 2,
            month: 'Feb',
        },
    ];
    const generateTableHeaders = (times) => {
        return Array.from({ length: times }).map((_, index) => (
            <th key={index}>{index === 0 ? '' : index}</th>
        ));
    };

    return (
        <div className="admin_dashboard">
            <h3 className="table_heading"></h3>
            <div className="content_body">
                <div className="data_list">
                    <div className="table_responsive custom_scroll">
                        <table>
                            <thead>
                                <tr>{generateTableHeaders(31)}</tr>
                            </thead>
                            <tbody id="all_list">
                                {datas?.map((i) => {
                                    return (
                                        <tr>
                                            <td>{i.month}</td>
                                            <td>{i.title}</td>
                                            <td>07 march, 2024</td>
                                            <td>approved</td>
                                            <td>
                                                <a href="#">download</a>
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

export default Index;
