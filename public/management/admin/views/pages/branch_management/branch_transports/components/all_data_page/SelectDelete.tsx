import React from 'react';
import { initialState } from '../../config/store/inital_state';
import setup from '../../config/setup';
import { RootState } from '../../../../../../store';
import { useSelector } from 'react-redux';
import { CsvBuilder } from 'filefy';
import { anyObject } from '../../../../../../common_types/object';
import moment from 'moment/moment';

export interface Props {}

const SelectDelete: React.FC<Props> = () => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    function handle_export(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.preventDefault();

        console.log('this is work able');
    }

    if (!state.selected || state.selected.length === 0) {
        return null;
    }

    return (
        <a href="#" onClick={handle_export}>
            <span className="material-symbols-outlined fill">delete</span>
            <div className="text">Delete ({state.selected.length})</div>
        </a>
    );
};

export default SelectDelete;
