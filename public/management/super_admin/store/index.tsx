import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import commonStore from './slices/common_slice';
import user_admins_slice from '../views/pages/user_management/user_admins/config/store';
import user_staffs_slice from '../views/pages/user_management/user_staffs/config/store';
import user_teachers_slice from '../views/pages/user_management/user_teachers/config/store';
import branches_slice from '../views/pages/branch_management/branches/config/store';

const store = configureStore({
    reducer: {
        common_store: commonStore.reducer,
        user_admins: user_admins_slice.reducer,
        user_staffs: user_staffs_slice.reducer,
        user_teachers: user_teachers_slice.reducer,
        branches: branches_slice.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
