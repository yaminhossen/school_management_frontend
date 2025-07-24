import React, { useEffect, useRef, useState } from 'react';
import Paginate from '../../../../components/Paginate';
import storeSlice from '../../config/store';
import { all } from '../../config/store/async_actions/all';
import { useSelector } from 'react-redux';
import { initialState } from '../../config/store/inital_state';
import { RootState, useAppDispatch } from '../../../../../store';
import setup from '../../config/setup';
import HeadSearch from '../all_data_page/HeadSearch';
import { anyObject } from '../../../../../common_types/object';
// import DropDownCheckbox from './DropDownCheckbox'; // Not needed for single select
import DropDownSelectedItem from './DropDownSelectedItem';
import { parent_details } from '../../config/store/async_actions/parent_details';

export interface Props {
    name: string;
    get_selected_data?: Function;
}

const DropDown: React.FC<Props> = ({ name, get_selected_data }) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const [parent_id, setParentId] = useState<number>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(storeSlice.actions.set_only_latest_data(true));
        dispatch(all({}) as any);
    }, []);
    useEffect(() => {
        dispatch(storeSlice.actions.set_item2({}));

        if (parent_id !== undefined && parent_id > 0) {
            dispatch(parent_details({ id: parent_id }) as any);
        }
    }, [parent_id]);

    /** local states */
    const [showDropDownList, setShowDropDownList] = useState(false);
    const [selectedItem, setSelectedItem] = useState<anyObject | null>(null);
    const selected_items_input = useRef<HTMLInputElement>(null);

    /** update selected item */
    useEffect(() => {
        let id = selectedItem ? selectedItem.id : '';
        if (selected_items_input && selected_items_input.current) {
            selected_items_input.current.value = id ? `[${id}]` : '';
        }

        if (typeof get_selected_data === 'function') {
            get_selected_data({ selectedItem, id });
        }
    }, [selectedItem]);

    return (
        <>
            <div className="custom_drop_down">
                <input type="hidden" ref={selected_items_input} name={name} />
                <div
                    className="selected_list"
                    onClick={() => setShowDropDownList(true)}
                >
                    {/* Show selected item name or placeholder */}
                    <DropDownSelectedItem
                        selectedList={selectedItem ? [selectedItem] : []}
                        setSelectedList={(list: any[]) =>
                            setSelectedItem(list[0] || null)
                        }
                    />
                </div>
                {showDropDownList && (
                    <div className="drop_down_items">
                        <div className="drop_down_data_search">
                            <HeadSearch />
                            <button
                                type="button"
                                onClick={() => setShowDropDownList(false)}
                                className="btn btn_1"
                            >
                                <span className="material-symbols-outlined fill">
                                    close
                                </span>
                            </button>
                        </div>

                        <ul className="option_list custom_scroll">
                            {(state.all as any)?.data?.map((i: anyObject) => {
                                return (
                                    <li
                                        className={`option_item${
                                            selectedItem &&
                                            selectedItem.id === i.id
                                                ? ' selected'
                                                : ''
                                        }`}
                                        key={i.id}
                                        onClick={() => {
                                            setSelectedItem(i);
                                            setParentId(i.id);
                                            setShowDropDownList(false);
                                        }}
                                    >
                                        <div
                                            style={{ paddingTop: 8 }}
                                            className="label"
                                        >
                                            {i.name}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="drop_down_footer data_list">
                            {/* Paginate if needed */}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DropDown;
