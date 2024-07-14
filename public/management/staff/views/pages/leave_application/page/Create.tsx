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
            last_date: '10 Feb, 2024',
            amount: '3000',
            purpose: 'hostel bill',
        },
        {
            id: 2,
            last_date: '14 March, 2024',
            amount: '10000',
            purpose: 'admission bill',
        },
        {
            id: 3,
            last_date: '15 Feb, 2024',
            amount: '5000',
            purpose: 'transport bill',
        },
    ];

    return (
        <div className="admin_dashboard">
            <div className="content_body">
                <form className="form_600 mx-auto pt-3">
                    <div className="form-group form-horizontal">
                        <label>Title</label>
                        <div className="form_elements">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Start date</label>
                        <div className="form_elements">
                            <input type="date" name="start_date" />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>End date</label>
                        <div className="form_elements">
                            <input type="date" name="end_date" />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Days</label>
                        <div className="form_elements">
                            <input
                                type="number"
                                name="days"
                                placeholder="Number of days"
                            />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Description</label>
                        <div className="form_elements">
                            <textarea
                                name="description"
                                id=""
                                placeholder="Write your details"
                            ></textarea>
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label>Attchment</label>
                        <div className="form_elements">
                            <input type="file" name="attachment" />
                        </div>
                    </div>
                    <div className="form-group form-horizontal">
                        <label></label>
                        <div className="form_elements">
                            <button className="btn btn-sm btn-outline-info">
                                submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Index;
