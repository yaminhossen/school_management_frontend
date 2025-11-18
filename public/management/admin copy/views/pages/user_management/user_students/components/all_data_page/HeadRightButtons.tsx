import React from 'react';
import { RootState, useAppDispatch } from '../../../../../../store';
import { useSelector } from 'react-redux';
import { initialState } from '../../config/store/inital_state';
import setup from '../../config/setup';
import storeSlice from '../../config/store';
import { Link, useNavigate } from 'react-router-dom';
export interface Props {}

const HeadRightButtons: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const dispatch = useAppDispatch();

    function show_filter(action: boolean = true) {
        event?.preventDefault();
        dispatch(storeSlice.actions.set_show_filter_canvas(action));
    }
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Go back one step in browser history
    };

    return (
        <ul>
            {/* <li>
                <a href="#">
                    <span className="material-symbols-outlined fill">
                        zoom_out_map
                    </span>
                </a>
            </li>
            <li>
                <a href="#">
                    <span className="material-symbols-outlined fill">
                        remove
                    </span>
                </a>
            </li>
            <li>
                <a href="#">
                    <span className="material-symbols-outlined fill">
                        close
                    </span>
                </a>
            </li> */}
            <li>
                <Link to="#" onClick={handleBack}>
                    <span className="material-symbols-outlined fill">
                        arrow_back
                    </span>
                </Link>
            </li>
            <li>
                <a href="#" onClick={() => show_filter(true)}>
                    <span className="material-symbols-outlined fill">
                        event_list
                    </span>
                </a>
            </li>
        </ul>
    );
};

export default HeadRightButtons;
