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
                                    <td>Photo</td>
                                    <td>:</td>
                                    <td>
                                        {state.item?.image ? (
                                            <a
                                                href={state.item.image}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src={
                                                        state.item.image
                                                            ? state.item.image
                                                            : '/assets/dashboard/images/avatar.png'
                                                    }
                                                    alt="profile image"
                                                    style={{
                                                        height: 50,
                                                    }}
                                                />
                                            </a>
                                        ) : (
                                            <img
                                                src={
                                                    '/assets/dashboard/images/avatar.png'
                                                }
                                                alt="profile image"
                                                style={{
                                                    height: 50,
                                                }}
                                            />
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>:</td>
                                    <td>{state.item.name}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td>{state.item.email}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td>
                                    <td>:</td>
                                    <td>{state.item.phone_number}</td>
                                </tr>
                                <tr>
                                    <td>Role</td>
                                    <td>:</td>
                                    <td>{state.item.role}</td>
                                </tr>
                                {/* <tr>
                                    <td>Parmenent Address</td>
                                    <td>:</td>
                                    <td>
                                        {
                                            state.item.staff_infos
                                                ?.parmenent_address
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Present Address</td>
                                    <td>:</td>
                                    <td>
                                        {
                                            state.item.staff_infos
                                                ?.present_address
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Guardian Number</td>
                                    <td>:</td>
                                    <td>
                                        {
                                            state.item.staff_infos
                                                ?.guardian_contact_number
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>District</td>
                                    <td>:</td>
                                    <td>{state.item.staff_infos?.district}</td>
                                </tr>
                                <tr>
                                    <td>Post Code</td>
                                    <td>:</td>
                                    <td>{state.item.staff_infos?.post_code}</td>
                                </tr>
                                <tr>
                                    <td>Qualification</td>
                                    <td>:</td>
                                    <td>
                                        {state.item.staff_infos?.qualification}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>:</td>
                                    <td>{state.item.staff_infos?.gender}</td>
                                </tr> */}
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
