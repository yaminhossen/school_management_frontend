import React from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { useAppDispatch } from '../../../../store';
import { store } from './config/store/async_actions/store';
import DropDown from './components/dropdown/DropDown';
import moment from 'moment/moment';
export interface Props {}

const Create: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();

    async function handle_submit(e) {
        e.preventDefault();
        let response = await dispatch(store(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
        }
    }

    let date = moment().format('YYYY-MM-DD');
    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.create_page_title}></Header>
                    <div className="content_body custom_scroll">
                        <form
                            onSubmit={(e) => handle_submit(e)}
                            className="form_600 mx-auto pt-3"
                        >
                            <div className="form-group form-horizontal">
                                <label>
                                    Description{' '}
                                    <span className="valid_star">*</span>
                                </label>
                                <div className="form_elements">
                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        id=""
                                    ></textarea>
                                </div>
                            </div>
                            <div className="form-group form-horizontal">
                                <label>
                                    Date <span className="valid_star">*</span>
                                </label>
                                <div className="form_elements">
                                    <input
                                        type="date"
                                        defaultValue={date}
                                        name="year_month"
                                    />
                                </div>
                            </div>
                            <div className="form-group student_submit form-horizontal">
                                {/* <label></label> */}
                                <div className="form_elementss">
                                    <button className="btn btn-sm btn-outline-info">
                                        submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Create;
