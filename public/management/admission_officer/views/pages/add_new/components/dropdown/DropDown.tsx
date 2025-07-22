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
import DropDownCheckbox from './DropDownCheckbox';
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
        // dispatch(storeSlice.actions.set_item({}));
        // dispatch(parent_details({ id: parent_id }) as any);
    }, []);
    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(parent_details({ id: parent_id }) as any);
    }, [parent_id]);

    /** local states */
    const [showDropDownList, setShowDropDownList] = useState(false);
    const [selectedList, setSelectedList] = useState<anyObject[]>([]);
    const selected_items_input = useRef<HTMLInputElement>(null);

    /** update selected items */
    useEffect(() => {
        // console.log(selectedList);
        let ids = selectedList.map((i) => i.id).join(',');
        if (selected_items_input && selected_items_input.current) {
            selected_items_input.current.value = `[${ids}]`;
        }

        if (typeof get_selected_data === 'function') {
            get_selected_data({ selectedList, ids });
        }
    }, [selectedList]);
    console.log('parent_id', parent_id);

    return (
        <>
            <div className="custom_drop_down">
                <input type="hidden" ref={selected_items_input} name={name} />
                <div
                    className="selected_list"
                    onClick={() => setShowDropDownList(true)}
                >
                    <DropDownSelectedItem
                        selectedList={selectedList}
                        setSelectedList={setSelectedList}
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
                                    <li className="option_item" key={i.id}>
                                        <label htmlFor={`drop_item_${i.id}`}>
                                            <div className="check_box">
                                                <DropDownCheckbox
                                                    item={i}
                                                    selectedList={selectedList}
                                                    setSelectedList={
                                                        setSelectedList
                                                    }
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setParentId(i.id)
                                                }
                                                className="label"
                                            >
                                                {i.name}
                                            </div>
                                        </label>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="drop_down_footer data_list">
                            {/* <Paginate
                                set_url={storeSlice.actions.set_url}
                                set_paginate={storeSlice.actions.set_paginate}
                                set_page={storeSlice.actions.set_page}
                                all={all}
                                data={state.all as any}
                                selected_paginate={state.paginate}
                            ></Paginate> */}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DropDown;
