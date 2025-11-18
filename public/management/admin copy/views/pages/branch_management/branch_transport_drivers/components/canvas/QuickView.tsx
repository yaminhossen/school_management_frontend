import React from 'react';
import { createPortal } from 'react-dom';
import { RootState, useAppDispatch } from '../../../../../../store';
import storeSlice from '../../config/store';
import { initialState } from '../../config/store/inital_state';
import { useSelector } from 'react-redux';
import setup from '../../config/setup';
export interface Props {}

const modalRoot = document.getElementById('filter-root');

const QuickView: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    function close_canvas(action: boolean = true) {
        dispatch(storeSlice.actions.set_show_quick_view_canvas(action));
    }

    if (modalRoot && state.show_quick_view_canvas) {
        return createPortal(
            <div className="off_canvas quick_view">
                <div className="off_canvas_body">
                    <div className="header">
                        <h3 className="heading_text">Quick View</h3>
                        <button
                            className="close_button"
                            onClick={() => close_canvas(false)}
                        >
                            <span className="material-symbols-outlined fill">
                                close
                            </span>
                        </button>
                    </div>

                    <div className="data_content">
                        <table className="table quick_modal_table">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>:</th>
                                    <th>{state.item.name}</th>
                                </tr>
                                <tr>
                                    <th>Present Address</th>
                                    <th>:</th>
                                    <th>{state.item.present_address}</th>
                                </tr>
                                <tr>
                                    <th>Parmenent Address</th>
                                    <th>:</th>
                                    <th>{state.item.permanent_address}</th>
                                </tr>
                                <tr>
                                    <th>Number</th>
                                    <th>:</th>
                                    <th>{state.item.driver_number}</th>
                                </tr>
                                <tr>
                                    <th>Assistant number 1</th>
                                    <th>:</th>
                                    <th>{state.item.assistant_number_1}</th>
                                </tr>
                                <tr>
                                    <th>Assistant number 2</th>
                                    <th>:</th>
                                    <th>{state.item.assistant_number_2}</th>
                                </tr>
                                <tr>
                                    <th>Licence number</th>
                                    <th>:</th>
                                    <th>{state.item.licence_number}</th>
                                </tr>
                                <tr>
                                    <td>Licence</td>
                                    <td>:</td>
                                    <td>
                                        <a
                                            href={
                                                state.item.driver_licence ||
                                                undefined
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={
                                                    state.item.driver_licence ||
                                                    '/assets/dashboard/images/avatar.png'
                                                }
                                                alt="licence"
                                                style={{
                                                    height: 50,
                                                }}
                                            />
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="off_canvas_overlay"></div>
            </div>,
            modalRoot,
        );
    } else {
        return <></>;
    }
};

export default QuickView;
