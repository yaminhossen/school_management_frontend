import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import commonStore from './slices/common_slice';
import tasks_slice from '../views/pages/tasks/config/store';
import meeting_agendas_slice from '../views/pages/meeting_agendas/config/store';
import notices_slice from '../views/pages/notices/config/store';
import leave_applications_slice from '../views/pages/leave_applications/config/store';

const store = configureStore({
    reducer: {
        common_store: commonStore.reducer,
        tasks: tasks_slice.reducer,
        meeting_agendas: meeting_agendas_slice.reducer,
        notices: notices_slice.reducer,
        leave_applications: leave_applications_slice.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
