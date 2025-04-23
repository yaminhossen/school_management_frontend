import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import commonStore from './slices/common_slice';
import users from '../views/pages/users/config/store';
import tasks_slice from '../views/pages/tasks/config/store';

const store = configureStore({
    reducer: {
        users: users.reducer,
        tasks: tasks_slice.reducer,
        common_store: commonStore.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
