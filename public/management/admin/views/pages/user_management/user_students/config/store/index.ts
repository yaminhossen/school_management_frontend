import { createSlice } from '@reduxjs/toolkit';
import setup from '../setup';
import { initialState } from './inital_state';

import { all } from './async_actions/all';
import { details } from './async_actions/details';
import { class_details1 } from './async_actions/class_details1';
import { store } from './async_actions/store';
import { update } from './async_actions/update';
import { soft_delete } from './async_actions/soft_delete';
import { restore } from './async_actions/restore';
import { destroy } from './async_actions/destroy';
import { import_data } from './async_actions/import_data';
import { store_reducers } from './reducers';
import { document } from './async_actions/document';
import { payment_history } from './async_actions/payments_history';

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
                class_details1.fulfilled,
                (state, { type, payload, meta }) => {
                    // console.log(type, payload, meta);
                },
            )
            .addCase(
                payment_history.fulfilled,
                (state, { type, payload, meta }) => {
                    // console.log(type, payload, meta);
                },
            )
            .addCase(document.fulfilled, (state, { type, payload, meta }) => {
                // console.log(type, payload, meta);
            })
            .addCase(store.fulfilled, (state, { type, payload, meta }) => {
                // console.log(type, payload, meta);
            })
            .addCase(update.fulfilled, (state, { type, payload, meta }) => {
                // console.log(type, payload, meta);
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
