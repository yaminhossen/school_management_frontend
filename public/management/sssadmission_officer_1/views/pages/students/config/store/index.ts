import { createSlice } from '@reduxjs/toolkit';
import setup from '../setup.ts';
import { initialState } from './inital_state.ts';

import { all } from './async_actions/all.ts';
import { details } from './async_actions/details.ts';
import { full_details } from './async_actions/full_details.ts';
import { class_details } from './async_actions/class_details.ts';
import { all_class } from './async_actions/all_class.ts';
import { store } from './async_actions/store.ts';
import { update } from './async_actions/update.ts';
import { soft_delete } from './async_actions/soft_delete.ts';
import { restore } from './async_actions/restore.ts';
import { destroy } from './async_actions/destroy.ts';
import { import_data } from './async_actions/import_data.ts';
import { store_reducers } from './reducers.ts';

const storeSlice = createSlice({
    name: setup.store_prefix,
    initialState,
    reducers: store_reducers,
    extraReducers: (builder) => {
        builder
            .addCase(all.fulfilled, (state, { type, payload, meta }) => {
                // console.log(type, payload, meta);
            })
            .addCase(details.fulfilled, (state, { type, payload, meta }) => {
                // console.log(type, payload, meta);
            })
            .addCase(
                full_details.fulfilled,
                (state, { type, payload, meta }) => {
                    // console.log(type, payload, meta);
                },
            )
            .addCase(all_class.fulfilled, (state, { type, payload, meta }) => {
                // console.log(type, payload, meta);
            })
            .addCase(
                class_details.fulfilled,
                (state, { type, payload, meta }) => {
                    // console.log(type, payload, meta);
                },
            )
            .addCase(store.fulfilled, (state, { type, payload, meta }) => {
                // console.log(type, payload, meta);
            })
            .addCase(update.fulfilled, (state, { type, payload, meta }) => {
                console.log(type, payload, meta);
            })
            .addCase(restore.fulfilled, (state, { type, payload, meta }) => {
                // console.log(type, payload, meta);
            })
            .addCase(destroy.fulfilled, (state, { type, payload, meta }) => {
                // console.log(type, payload, meta);
            })
            .addCase(
                soft_delete.fulfilled,
                (state, { type, payload, meta }) => {
                    // console.log(type, payload, meta);
                },
            )
            .addCase(
                import_data.fulfilled,
                (state, { type, payload, meta }) => {
                    // console.log(type, payload, meta);
                },
            );
    },
});

export default storeSlice;
